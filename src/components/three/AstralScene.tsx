import { Bloom, EffectComposer } from '@react-three/postprocessing'
import { Float, Points, PointMaterial } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { Suspense, useMemo, useRef } from 'react'
import type { Group, Points as ThreePoints } from 'three'
import { AdditiveBlending, Color } from 'three'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

type AstralSceneProps = {
  variant?: 'hero' | 'projects'
  className?: string
}

function ParticleField({ count = 900 }: { count?: number }) {
  const pointsRef = useRef<ThreePoints>(null)
  const positions = useMemo(() => {
    const coordinates = new Float32Array(count * 3)

    for (let index = 0; index < count; index += 1) {
      const radius = 3.5 + seededNoise(index, 11) * 7
      const angle = seededNoise(index, 29) * Math.PI * 2
      const height = (seededNoise(index, 47) - 0.5) * 5.5

      coordinates[index * 3] = Math.cos(angle) * radius
      coordinates[index * 3 + 1] = height
      coordinates[index * 3 + 2] = Math.sin(angle) * radius - 2
    }

    return coordinates
  }, [count])

  useFrame((_, delta) => {
    if (!pointsRef.current) return
    pointsRef.current.rotation.y += delta * 0.015
    pointsRef.current.rotation.x += delta * 0.002
  })

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled>
      <PointMaterial
        transparent
        color="#9ee7ff"
        size={0.026}
        sizeAttenuation
        depthWrite={false}
        blending={AdditiveBlending}
      />
    </Points>
  )
}

function seededNoise(index: number, salt: number) {
  const value = Math.sin(index * 127.1 + salt * 311.7) * 43758.5453123
  return value - Math.floor(value)
}

function FloatingNode({
  color,
  position,
  speed,
}: {
  color: string
  position: [number, number, number]
  speed: number
}) {
  const groupRef = useRef<Group>(null)
  const nodeColor = useMemo(() => new Color(color), [color])

  useFrame((state, delta) => {
    if (!groupRef.current) return
    groupRef.current.rotation.x += delta * speed * 0.25
    groupRef.current.rotation.y += delta * speed
    groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.12
  })

  return (
    <group ref={groupRef} position={position}>
      <mesh>
        <octahedronGeometry args={[0.32, 0]} />
        <meshStandardMaterial
          color={nodeColor}
          emissive={nodeColor}
          emissiveIntensity={0.65}
          metalness={0.3}
          roughness={0.38}
          transparent
          opacity={0.85}
        />
      </mesh>
      <mesh scale={1.9}>
        <torusGeometry args={[0.32, 0.008, 8, 56]} />
        <meshBasicMaterial color={color} transparent opacity={0.32} />
      </mesh>
    </group>
  )
}

function AstralObjects({ variant }: { variant: 'hero' | 'projects' }) {
  const nodes =
    variant === 'hero'
      ? [
          { color: '#67e8f9', position: [1.9, 0.6, -1.8] as [number, number, number], speed: 0.55 },
          { color: '#c4b5fd', position: [-1.2, -0.5, -1.2] as [number, number, number], speed: 0.4 },
          { color: '#86efac', position: [0.5, 1.25, -2.8] as [number, number, number], speed: 0.35 },
        ]
      : [
          { color: '#67e8f9', position: [-2, 0.7, -1.8] as [number, number, number], speed: 0.45 },
          { color: '#fde68a', position: [1.7, 0.2, -1.4] as [number, number, number], speed: 0.5 },
          { color: '#fda4af', position: [0.1, -0.9, -2.5] as [number, number, number], speed: 0.38 },
        ]

  return (
    <>
      <ambientLight intensity={0.45} />
      <pointLight color="#67e8f9" intensity={8} position={[3, 3, 3]} />
      <pointLight color="#c4b5fd" intensity={4} position={[-4, -2, 2]} />
      <ParticleField count={variant === 'hero' ? 1100 : 700} />
      {nodes.map((node) => (
        <Float floatIntensity={0.6} key={`${node.color}-${node.position.join('-')}`} speed={1.2}>
          <FloatingNode {...node} />
        </Float>
      ))}
    </>
  )
}

export function AstralScene({ variant = 'hero', className = '' }: AstralSceneProps) {
  const prefersReducedMotion = usePrefersReducedMotion()

  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden="true">
      <Canvas
        camera={{ fov: 48, position: [0, 0, 5.8] }}
        dpr={[1, 1.6]}
        gl={{ alpha: true, antialias: false, powerPreference: 'high-performance' }}
      >
        <Suspense fallback={null}>
          <AstralObjects variant={variant} />
          {!prefersReducedMotion && (
            <EffectComposer multisampling={0}>
              <Bloom intensity={0.52} luminanceThreshold={0.2} mipmapBlur />
            </EffectComposer>
          )}
        </Suspense>
      </Canvas>
    </div>
  )
}
