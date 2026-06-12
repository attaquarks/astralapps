import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)
gsap.defaults({
  duration: 0.8,
  ease: 'power3.out',
})

export { gsap, ScrollTrigger }
