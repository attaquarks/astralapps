import { useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { cueBus } from '../../lib/cueBus'

/*
 * The persistent constellation field — ported from the pinned ThreeUI sources
 * (MIT, MengTo/threeui @ 3265804). Preserved motion language: slowly drifting
 * star-nodes with pulsing cores and halos, proximity link-lines whose alpha
 * falls with distance, a gentle pointer gravity, links drawn to the pointer,
 * and thin rising signal beams. Ported into depth (z-spread + camera dolly +
 * pointer parallax) so the field is a 3D scene, and driven by the chart bus:
 * scroll progress raises link formation and node energy, so the sky itself
 * tells the before/after story.
 *
 * Palette: lavender-white #EDE6FF nodes (the logo highlight), ice #47BFFF
 * signals, violet #863BFF deep stars — the logo's own family.
 */

const REDUCED = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/* Deterministic field: the same chart draws on every visit. */
function mulberry32(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const LAVENDER = new THREE.Color('#ede6ff')
const ICE = new THREE.Color('#47bfff')
const VIOLET = new THREE.Color('#863bff')

type Node = {
  x: number
  y: number
  z: number
  vx: number
  vy: number
  size: number
  phase: number
  color: THREE.Color
}

const LINK_DIST = 4.6
const POINTER_DIST = 4.2
const MAX_SEGMENTS = 460

function makeNodes(count: number): Node[] {
  const rand = mulberry32(20261028)
  const nodes: Node[] = []
  for (let i = 0; i < count; i += 1) {
    const deep = rand() < 0.68
    const roll = rand()
    const color = roll < 0.64 ? LAVENDER : roll < 0.84 ? ICE : VIOLET
    nodes.push({
      x: (rand() - 0.5) * 58,
      y: (rand() - 0.5) * 34,
      z: deep ? -(8 + rand() * 22) : -(2 + rand() * 6),
      vx: (rand() - 0.5) * 0.14,
      vy: 0.1 + rand() * 0.38,
      size: 3.2 + rand() * 5.4 + (deep ? 0 : 1.6),
      phase: rand() * Math.PI * 2,
      color,
    })
  }
  return nodes
}

const nodeVertex = /* glsl */ `
  attribute float aSize;
  attribute float aPhase;
  attribute vec3 aColor;
  uniform float uTime;
  uniform float uPixelRatio;
  uniform float uEnergy;
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    float pulse = 0.78 + sin(uTime * 1.1 + aPhase) * 0.22;
    gl_PointSize = aSize * uPixelRatio * pulse * (18.0 / max(1.0, -mv.z));
    vColor = aColor;
    vAlpha = (0.5 + uEnergy * 0.5) * pulse;
    gl_Position = projectionMatrix * mv;
  }
`

const nodeFragment = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float halo = smoothstep(0.5, 0.16, d);
    float core = smoothstep(0.22, 0.05, d);
    float a = vAlpha * (halo * 0.32 + core * 0.9);
    if (a < 0.012) discard;
    gl_FragColor = vec4(vColor, a);
  }
`

let beamTexSingleton: THREE.Texture | null = null

function getBeamTexture(): THREE.Texture {
  if (!beamTexSingleton) {
    const canvas = document.createElement('canvas')
    canvas.width = 2
    canvas.height = 128
    const ctx = canvas.getContext('2d')!
    const gradient = ctx.createLinearGradient(0, 0, 0, 128)
    gradient.addColorStop(0, 'rgba(255,255,255,0)')
    gradient.addColorStop(0.25, 'rgba(255,255,255,0.55)')
    gradient.addColorStop(1, 'rgba(255,255,255,0.95)')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 2, 128)
    beamTexSingleton = new THREE.CanvasTexture(canvas)
    beamTexSingleton.colorSpace = THREE.SRGBColorSpace
  }
  return beamTexSingleton
}

type Beam = { x: number; speed: number; length: number; opacity: number }

function buildPointGeometry(count: number): THREE.BufferGeometry {
  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(count * 3), 3))
  geo.setAttribute('aSize', new THREE.BufferAttribute(new Float32Array(count), 1))
  geo.setAttribute('aPhase', new THREE.BufferAttribute(new Float32Array(count), 1))
  geo.setAttribute('aColor', new THREE.BufferAttribute(new Float32Array(count * 3), 3))
  return geo
}

function buildLineGeometry(): THREE.BufferGeometry {
  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(MAX_SEGMENTS * 6), 3))
  geo.setAttribute('color', new THREE.BufferAttribute(new Float32Array(MAX_SEGMENTS * 6), 3))
  geo.setDrawRange(0, 0)
  return geo
}

function FieldContents({ count, beamCount }: { count: number; beamCount: number }) {
  const rigRef = useRef<THREE.Group>(null)
  const beamGroupRef = useRef<THREE.Group>(null)
  const pointer = useRef({ x: 0, y: 0, active: false })
  const seededRef = useRef(false)

  // Mutable scene state lives in refs (useFrame mutates it every frame).
  // useRef args re-evaluate per render but only the first is kept — cheap
  // here, since this component never re-renders after mount.
  const nodesRef = useRef<Node[]>(makeNodes(count))
  const attractorRef = useRef(new THREE.Vector3(0, 0, -3))
  const scratchRef = useRef(new THREE.Vector3())

  // Render data (geometry, uniforms, material) is hook-created; the frame
  // loop mutates it through the R3F object refs, never through these.
  const pointGeo = useMemo(() => buildPointGeometry(count), [count])
  const lineGeo = useMemo(() => buildLineGeometry(), [])
  const uniforms = useMemo(
    () => ({ uTime: { value: 0 }, uEnergy: { value: REDUCED ? 0.85 : 0.35 }, uPixelRatio: { value: 1 } }),
    [],
  )
  const lineMaterial = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    [],
  )

  const pointsRef = useRef<THREE.Points>(null)
  const linesRef = useRef<THREE.LineSegments>(null)
  const materialRef = useRef<THREE.ShaderMaterial>(null)

  const beams = useMemo<Beam[]>(
    () =>
      Array.from({ length: beamCount }, (_, i) => ({
        x: ((i + 0.5) / beamCount - 0.5) * 46 + (i % 2 ? 3 : -3),
        speed: 0.9 + ((i * 7919) % 100) / 100 * 1.8,
        length: 5 + ((i * 6271) % 100) / 100 * 9,
        opacity: 0.05 + ((i * 4783) % 100) / 100 * 0.1,
      })),
    [beamCount],
  )

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1
      pointer.current.y = -((event.clientY / window.innerHeight) * 2 - 1)
      pointer.current.active = true
    }
    const onLeave = () => {
      pointer.current.active = false
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerleave', onLeave)
    return () => {
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05)
    const bus = cueBus.get()
    const energy = REDUCED ? 0.85 : 0.35 + bus.progress * 0.65

    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime
      materialRef.current.uniforms.uEnergy.value = energy
      materialRef.current.uniforms.uPixelRatio.value = state.gl.getPixelRatio()
    }

    const points = pointsRef.current
    const lines = linesRef.current
    const nodes = nodesRef.current
    const attractor = attractorRef.current
    const scratch = scratchRef.current
    if (!points || !lines) return
    const pointGeo = points.geometry as THREE.BufferGeometry
    const lineGeo = lines.geometry as THREE.BufferGeometry

    // Seed every point attribute from node state on the first rendered frame.
    if (!seededRef.current) {
      seededRef.current = true
      const pos = pointGeo.getAttribute('position') as THREE.BufferAttribute
      const sizes = pointGeo.getAttribute('aSize') as THREE.BufferAttribute
      const phases = pointGeo.getAttribute('aPhase') as THREE.BufferAttribute
      const colors = pointGeo.getAttribute('aColor') as THREE.BufferAttribute
      nodes.forEach((node, i) => {
        pos.setXYZ(i, node.x, node.y, node.z)
        sizes.setX(i, node.size)
        phases.setX(i, node.phase)
        colors.setXYZ(i, node.color.r, node.color.g, node.color.b)
      })
      pos.needsUpdate = true
      sizes.needsUpdate = true
      phases.needsUpdate = true
      colors.needsUpdate = true
    }

    // Camera dolly + rig parallax — the field recedes as the chart forms.
    const targetZ = 15 + bus.progress * 4
    state.camera.position.z += (targetZ - state.camera.position.z) * Math.min(1, dt * 2.4)
    if (rigRef.current) {
      const tiltX = pointer.current.active ? -pointer.current.y * 0.032 : 0
      const tiltY = pointer.current.active ? pointer.current.x * 0.05 : 0
      rigRef.current.rotation.x += (tiltX - rigRef.current.rotation.x) * Math.min(1, dt * 2.2)
      rigRef.current.rotation.y += (tiltY - rigRef.current.rotation.y) * Math.min(1, dt * 2.2)
    }

    // Pointer projected onto the attractor plane — drift's mouse language.
    if (pointer.current.active) {
      scratch.set(pointer.current.x, pointer.current.y, 0.5).unproject(state.camera)
      scratch.sub(state.camera.position).normalize()
      const t = (attractor.z - state.camera.position.z) / scratch.z
      attractor.copy(state.camera.position).addScaledVector(scratch, t)
      attractor.z = -3
    }

    const pos = pointGeo.getAttribute('position') as THREE.BufferAttribute
    const nodeCount = nodes.length

    // Drift + wrap + gentle pointer gravity (constellation-field language).
    for (let i = 0; i < nodeCount; i += 1) {
      const node = nodes[i]
      if (!REDUCED) {
        node.x += node.vx * dt * 6
        node.y += node.vy * dt * 6
        if (node.y > 18) {
          node.y = -18
          node.x = (Math.random() - 0.5) * 58
        }
        if (node.x > 30) node.x = -30
        if (node.x < -30) node.x = 30
        if (pointer.current.active) {
          const dx = attractor.x - node.x
          const dy = attractor.y - node.y
          const dz = attractor.z - node.z
          if (dx * dx + dy * dy + dz * dz < 30) {
            node.x += dx * 0.004
            node.y += dy * 0.004
          }
        }
      }
      pos.setXYZ(i, node.x, node.y, node.z)
    }
    pos.needsUpdate = true

    // Proximity links, alpha falling with distance (field language), plus
    // links to the pointer (drift language). Additive blending: the scaled
    // vertex color IS the per-segment alpha.
    {
      const lpos = lineGeo.getAttribute('position') as THREE.BufferAttribute
      const lcol = lineGeo.getAttribute('color') as THREE.BufferAttribute
      let segment = 0
      const linkStrength = (0.16 + energy * 0.62) * (REDUCED ? 1.4 : 1)
      for (let i = 0; i < nodeCount && segment < MAX_SEGMENTS; i += 1) {
        const a = nodes[i]
        for (let j = i + 1; j < nodeCount && segment < MAX_SEGMENTS; j += 1) {
          const b = nodes[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dz = a.z - b.z
          const d2 = dx * dx + dy * dy + dz * dz
          if (d2 < LINK_DIST * LINK_DIST) {
            const d = Math.sqrt(d2)
            const alpha = (1 - d / LINK_DIST) * linkStrength
            lpos.setXYZ(segment * 2, a.x, a.y, a.z)
            lpos.setXYZ(segment * 2 + 1, b.x, b.y, b.z)
            lcol.setXYZ(segment * 2, 0.82 * alpha, 0.78 * alpha, alpha)
            lcol.setXYZ(segment * 2 + 1, 0.82 * alpha, 0.78 * alpha, alpha)
            segment += 1
          }
        }
        if (pointer.current.active && segment < MAX_SEGMENTS) {
          const dx = attractor.x - a.x
          const dy = attractor.y - a.y
          const dz = attractor.z - a.z
          const d = Math.sqrt(dx * dx + dy * dy + dz * dz)
          if (d < POINTER_DIST) {
            const alpha = (1 - d / POINTER_DIST) * 0.5
            lpos.setXYZ(segment * 2, a.x, a.y, a.z)
            lpos.setXYZ(segment * 2 + 1, attractor.x, attractor.y, attractor.z)
            lcol.setXYZ(segment * 2, 0.28 * alpha, 0.75 * alpha, alpha)
            lcol.setXYZ(segment * 2 + 1, 0.28 * alpha, 0.75 * alpha, alpha)
            segment += 1
          }
        }
      }
      lineGeo.setDrawRange(0, segment * 2)
      lpos.needsUpdate = true
      lcol.needsUpdate = true
    }

    // Rising signal beams (drift language) — meshes live in their own group.
    const beamGroup = beamGroupRef.current
    if (beamGroup) {
      for (let i = 0; i < beamGroup.children.length && i < beams.length; i += 1) {
        const mesh = beamGroup.children[i] as THREE.Mesh
        const beam = beams[i]
        if (!REDUCED) {
          mesh.position.y += beam.speed * dt
          if (mesh.position.y - beam.length / 2 > 16) mesh.position.y = -16 - beam.length / 2
        }
        const mat = mesh.material as THREE.MeshBasicMaterial
        mat.opacity = beam.opacity * (0.35 + energy * 0.65)
      }
    }
  })

  return (
    <group ref={rigRef}>
      <points ref={pointsRef} geometry={pointGeo} frustumCulled={false}>
        <shaderMaterial
          ref={materialRef}
          vertexShader={nodeVertex}
          fragmentShader={nodeFragment}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
      <lineSegments ref={linesRef} geometry={lineGeo} material={lineMaterial} frustumCulled={false} />
      <group ref={beamGroupRef}>
        {beams.map((beam, i) => (
          <mesh key={i} position={[beam.x, -14 + i * 3, -6 - (i % 3) * 4]}>
            <planeGeometry args={[0.055, beam.length]} />
            <meshBasicMaterial
              map={getBeamTexture()}
              color={ICE}
              transparent
              opacity={0.08}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
              side={THREE.DoubleSide}
            />
          </mesh>
        ))}
      </group>
    </group>
  )
}

export default function FieldScene() {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  return (
    <Canvas
      style={{ position: 'absolute', inset: 0 }}
      dpr={[1, isMobile ? 1.5 : 1.75]}
      camera={{ position: [0, 0, 15], fov: 50, near: 0.1, far: 80 }}
      gl={{ antialias: false, alpha: false, powerPreference: 'high-performance' }}
      onCreated={({ gl }) => gl.setClearColor('#070510', 1)}
      frameloop={REDUCED ? 'demand' : 'always'}
    >
      <FieldContents count={isMobile ? 64 : 120} beamCount={isMobile ? 5 : 8} />
    </Canvas>
  )
}
