export type Blueprint = {
  title: string
  summary: string
  trigger: string
  steps: string[]
  tools: string[]
  hoursSavedPerWeek: number
  complexity: 'Simple' | 'Moderate' | 'Advanced'
  estimatedCostUsd: { min: number; max: number }
  /** true when the server has no API key configured (mock response) */
  demo: boolean
}

export type AuditOpportunity = {
  title: string
  description: string
  hoursPerWeek: number
  tools: string[]
}
export type Audit = {
  company: string
  summary: string
  opportunities: AuditOpportunity[]
  demo: boolean
}

export type Scope = {
  summary: string
  deliverables: string[]
  timelineWeeks: { min: number; max: number }
  priceRangeUsd: { min: number; max: number }
  firstStep: string
  demo: boolean
}

async function postJson<T>(path: string, body: unknown): Promise<T> {
  const response = await fetch(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  const data = await response.json().catch(() => ({}))
  if (!response.ok) {
    throw new Error(typeof data?.error === 'string' ? data.error : 'Something went wrong.')
  }
  return data as T
}

/** All three call the server proxy that runs the Anthropic API (server/lib/anthropic.js). */
export function buildAutomation(task: string, industry?: string) {
  return postJson<Blueprint>('/api/automation-builder', { task, industry })
}

export function auditBusiness(url: string) {
  return postJson<Audit>('/api/business-audit', { url })
}

export function generateScope(input: {
  industry?: string
  teamSize?: string
  timeDrain: string
  urgency?: string
}) {
  return postJson<Scope>('/api/blueprint-wizard', input)
}
