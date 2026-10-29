import { useEffect, useState } from 'react'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

type TypewriterProps = {
  phrases: string[]
  className?: string
  typingSpeed?: number
  deletingSpeed?: number
  pauseMs?: number
  caret?: boolean
}

/* Cycles through phrases, typing and deleting one character at a time. Under
   reduced-motion it just shows the first phrase. */
export function Typewriter({
  phrases,
  className = '',
  typingSpeed = 42,
  deletingSpeed = 22,
  pauseMs = 1600,
  caret = true,
}: TypewriterProps) {
  const reduced = usePrefersReducedMotion()
  const [text, setText] = useState('')
  const [index, setIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (reduced) return
    const current = phrases[index % phrases.length] ?? ''

    let delay: number
    let action: () => void

    if (!deleting && text === current) {
      delay = pauseMs
      action = () => setDeleting(true)
    } else if (deleting && text === '') {
      delay = 400
      action = () => {
        setDeleting(false)
        setIndex((prev) => (prev + 1) % phrases.length)
      }
    } else {
      delay = deleting ? deletingSpeed : typingSpeed
      const next = deleting ? current.slice(0, text.length - 1) : current.slice(0, text.length + 1)
      action = () => setText(next)
    }

    const timeout = window.setTimeout(action, delay)
    return () => window.clearTimeout(timeout)
  }, [text, deleting, index, phrases, reduced, typingSpeed, deletingSpeed, pauseMs])

  return (
    <span className={`${caret ? 'caret' : ''} ${className}`}>
      {reduced ? (phrases[0] ?? '') : text}
    </span>
  )
}
