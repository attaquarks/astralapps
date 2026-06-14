// Simple in-memory sliding-window rate limiter per IP. Good enough to keep a
// public AI endpoint from being abused; swap for Redis if you scale horizontally.

const WINDOW_MS = 10 * 60 * 1000 // 10 minutes
const MAX_REQUESTS = 10

/** @type {Map<string, number[]>} */
const hits = new Map()

export function checkRateLimit(ip) {
  const now = Date.now()
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS)

  if (recent.length >= MAX_REQUESTS) {
    hits.set(ip, recent)
    return { ok: false, retryAfter: Math.ceil((WINDOW_MS - (now - recent[0])) / 1000) }
  }

  recent.push(now)
  hits.set(ip, recent)

  // opportunistic cleanup so the map doesn't grow unbounded
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(key)
    }
  }

  return { ok: true, remaining: MAX_REQUESTS - recent.length }
}
