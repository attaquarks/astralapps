import Anthropic from '@anthropic-ai/sdk'

/*
 * AI engines behind the three live features:
 *   - generateBlueprint  → Live Automation Builder (#1)
 *   - generateAudit      → Instant Business Audit (#2)
 *   - generateScope      → Automation Blueprint wizard (#4)
 *
 * All use forced tool use so the model always returns valid JSON, and all fall
 * back to a believable mock when ANTHROPIC_API_KEY is unset (so the UI works in
 * dev / before launch). Model defaults to claude-haiku-4-5 (fast + cheap for a
 * live per-visitor demo); set ANTHROPIC_MODEL=claude-opus-4-8 for top quality.
 */

const MODEL = process.env.ANTHROPIC_MODEL || 'claude-haiku-4-5'

/** @type {Anthropic | null} */
let client = null
function getClient() {
  if (!process.env.ANTHROPIC_API_KEY) return null
  if (!client) client = new Anthropic({ timeout: 30000, maxRetries: 1 })
  return client
}

/** Run one forced-tool-use call and return the tool input object. */
async function runTool({ system, user, tool, maxTokens = 1200 }) {
  const anthropic = getClient()
  if (!anthropic) return null
  const message = await anthropic.messages.create({
    model: MODEL,
    max_tokens: maxTokens,
    system,
    tools: [tool],
    tool_choice: { type: 'tool', name: tool.name },
    messages: [{ role: 'user', content: user }],
  })
  const block = message.content.find((b) => b.type === 'tool_use')
  return block ? block.input : null
}

/* ───────────────────────── Automation Builder (#1) ───────────────────────── */

const blueprintTool = {
  name: 'emit_blueprint',
  description: 'Return a concrete, buildable automation blueprint for the described manual task.',
  input_schema: {
    type: 'object',
    properties: {
      title: { type: 'string', description: 'Short, specific name for the automation' },
      summary: { type: 'string', description: 'One or two plain-English sentences on what it does' },
      trigger: { type: 'string', description: 'The event that kicks the automation off' },
      steps: { type: 'array', items: { type: 'string' }, description: '3 to 6 ordered steps' },
      tools: { type: 'array', items: { type: 'string' }, description: 'Real tools / integrations involved' },
      hoursSavedPerWeek: { type: 'number', description: 'Grounded estimate of hours saved per week' },
      complexity: { type: 'string', enum: ['Simple', 'Moderate', 'Advanced'] },
      estimatedCostUsd: {
        type: 'object',
        properties: { min: { type: 'number' }, max: { type: 'number' } },
        required: ['min', 'max'],
        additionalProperties: false,
      },
    },
    required: ['title', 'summary', 'trigger', 'steps', 'tools', 'hoursSavedPerWeek', 'complexity', 'estimatedCostUsd'],
    additionalProperties: false,
  },
}

export async function generateBlueprint({ task, industry }) {
  const cleanTask = String(task || '').trim().slice(0, 600)
  if (cleanTask.length < 5) {
    throw Object.assign(new Error('Please describe the task in a little more detail.'), { statusCode: 400 })
  }

  const industryLine = industry ? ` The visitor runs a ${industry}.` : ''
  const input = await runTool({
    system:
      'You are an automation architect at AstralApps, an AI automation studio. A potential client ' +
      'describes a manual task their team does every week. Produce a concrete, realistic automation ' +
      'blueprint they could actually build. Be specific about the trigger, the steps, and the real ' +
      'tools (Slack, HubSpot, Gmail, QuickBooks, Zapier/Make, OpenAI, Airtable, Twilio, etc.). Keep ' +
      'the hours-saved and cost estimates grounded and honest — never inflate them.' + industryLine,
    user: `Manual task: ${cleanTask}`,
    tool: blueprintTool,
  })

  if (!input) return mockBlueprint(cleanTask)
  return { ...input, demo: false }
}

/* ───────────────────────── Business Audit (#2) ───────────────────────── */

const auditTool = {
  name: 'emit_audit',
  description: 'Return an automation-opportunities report for a business.',
  input_schema: {
    type: 'object',
    properties: {
      company: { type: 'string', description: 'Best guess at the company / brand name' },
      summary: { type: 'string', description: 'One sentence on what the business appears to do' },
      opportunities: {
        type: 'array',
        description: '3 to 5 specific workflows this business likely does manually',
        items: {
          type: 'object',
          properties: {
            title: { type: 'string' },
            description: { type: 'string', description: 'Why it is likely manual and how to automate it' },
            hoursPerWeek: { type: 'number', description: 'Estimated manual hours / week' },
            tools: { type: 'array', items: { type: 'string' } },
          },
          required: ['title', 'description', 'hoursPerWeek', 'tools'],
          additionalProperties: false,
        },
      },
    },
    required: ['company', 'summary', 'opportunities'],
    additionalProperties: false,
  },
}

async function fetchSiteText(rawUrl) {
  let url
  try {
    url = new URL(/^https?:\/\//i.test(rawUrl) ? rawUrl : `https://${rawUrl}`)
  } catch {
    return ''
  }
  // basic SSRF guard
  const host = url.hostname
  if (!/^https?:$/.test(url.protocol)) return ''
  if (host === 'localhost' || host.endsWith('.local') || /^(127\.|10\.|192\.168\.|169\.254\.|0\.)/.test(host)) {
    return ''
  }
  try {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), 8000)
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { 'User-Agent': 'AstralAppsBot/1.0 (+https://astralapps.com)' },
      redirect: 'follow',
    })
    clearTimeout(timer)
    if (!res.ok) return ''
    const html = (await res.text()).slice(0, 200_000)
    return html
      .replace(/<script[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style[\s\S]*?<\/style>/gi, ' ')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 4000)
  } catch {
    return ''
  }
}

export async function generateAudit({ url }) {
  const cleanUrl = String(url || '').trim().slice(0, 200)
  if (cleanUrl.length < 3) {
    throw Object.assign(new Error('Please enter your website URL.'), { statusCode: 400 })
  }

  if (!getClient()) return mockAudit(cleanUrl)

  const siteText = await fetchSiteText(cleanUrl)
  const context = siteText
    ? `Website content:\n${siteText}`
    : `I could not fetch the page. Infer what you can from the URL itself: ${cleanUrl}`

  const input = await runTool({
    system:
      'You are an automation consultant at AstralApps. Given a company website, identify 3-5 specific ' +
      'workflows the business is most likely doing manually, and how AI/automation would handle each. ' +
      'Be concrete and specific to this business, not generic. Estimate manual hours/week honestly.',
    user: `Audit this business for automation opportunities.\n${context}`,
    tool: auditTool,
    maxTokens: 1500,
  })

  if (!input) return mockAudit(cleanUrl)
  return { ...input, demo: false }
}

/* ───────────────────────── Blueprint Wizard (#4) ───────────────────────── */

const scopeTool = {
  name: 'emit_scope',
  description: 'Return a concrete project scope document for an automation engagement.',
  input_schema: {
    type: 'object',
    properties: {
      summary: { type: 'string', description: 'One or two sentences framing the recommended project' },
      deliverables: { type: 'array', items: { type: 'string' }, description: '3 to 5 concrete deliverables' },
      timelineWeeks: {
        type: 'object',
        properties: { min: { type: 'number' }, max: { type: 'number' } },
        required: ['min', 'max'],
        additionalProperties: false,
      },
      priceRangeUsd: {
        type: 'object',
        properties: { min: { type: 'number' }, max: { type: 'number' } },
        required: ['min', 'max'],
        additionalProperties: false,
      },
      firstStep: { type: 'string', description: 'The very first step to kick the project off' },
    },
    required: ['summary', 'deliverables', 'timelineWeeks', 'priceRangeUsd', 'firstStep'],
    additionalProperties: false,
  },
}

export async function generateScope({ industry, teamSize, timeDrain, urgency }) {
  const drain = String(timeDrain || '').trim().slice(0, 300)
  if (drain.length < 3) {
    throw Object.assign(new Error('Tell us your biggest time-drain so we can scope it.'), { statusCode: 400 })
  }

  const input = await runTool({
    system:
      'You are a delivery lead at AstralApps, an AI automation studio. From a short intake, produce a ' +
      'realistic project scope a client could act on: deliverables, a timeline in weeks, a rough price ' +
      'range in USD, and a concrete first step. Be grounded and specific; do not over-promise.',
    user:
      `Industry: ${industry || 'unspecified'}\nTeam size: ${teamSize || 'unspecified'}\n` +
      `Biggest time-drain: ${drain}\nUrgency: ${urgency || 'unspecified'}`,
    tool: scopeTool,
  })

  if (!input) return mockScope(drain)
  return { ...input, demo: false }
}

/* ───────────────────────── Mocks (no API key) ───────────────────────── */

function mockBlueprint(task) {
  const lower = task.toLowerCase()
  const primaryTool = lower.includes('invoice') || lower.includes('account')
    ? 'QuickBooks'
    : lower.includes('crm') || lower.includes('lead')
      ? 'HubSpot'
      : lower.includes('email') || lower.includes('follow')
        ? 'Gmail'
        : 'Airtable'
  return {
    title: 'Automated workflow',
    summary: `An automation that handles “${task}” end-to-end, removing the manual steps your team repeats every week.`,
    trigger: 'A new record, message, or document arrives in one of your tools',
    steps: [
      'Detect the trigger event via webhook or a scheduled check',
      'Extract and validate the relevant details with AI',
      `Create or update the record in ${primaryTool} and any connected tools`,
      'Notify the right person and log the outcome for reporting',
    ],
    tools: [primaryTool, 'Zapier / Make', 'OpenAI', 'Webhooks'],
    hoursSavedPerWeek: 6,
    complexity: 'Moderate',
    estimatedCostUsd: { min: 1500, max: 4000 },
    demo: true,
  }
}

function mockAudit(url) {
  const name = url.replace(/^https?:\/\//i, '').replace(/^www\./i, '').split(/[/.]/)[0] || 'your business'
  return {
    company: name.charAt(0).toUpperCase() + name.slice(1),
    summary: 'A business with repeatable customer, data, and reporting workflows that are likely still manual.',
    opportunities: [
      { title: 'Lead capture & routing', description: 'New enquiries are probably copied between forms, email, and a CRM by hand. This can be captured, enriched, and routed automatically.', hoursPerWeek: 5, tools: ['CRM', 'Webhooks', 'Slack'] },
      { title: 'Follow-up sequences', description: 'Follow-ups sent one by one can be triggered and personalised automatically based on each contact’s stage.', hoursPerWeek: 6, tools: ['Email', 'OpenAI'] },
      { title: 'Reporting & dashboards', description: 'Weekly numbers assembled by hand can compile and deliver themselves on a schedule.', hoursPerWeek: 4, tools: ['Sheets / BI', 'Scheduler'] },
      { title: 'Document intake', description: 'Invoices, forms, and PDFs re-keyed into software can be read and entered automatically.', hoursPerWeek: 5, tools: ['OCR / AI', 'Accounting tool'] },
    ],
    demo: true,
  }
}

function mockScope(drain) {
  return {
    summary: `A focused automation that removes “${drain}” from your team’s week, built and deployed in a short engagement.`,
    deliverables: [
      'Discovery + a mapped workflow for the target process',
      'The production automation, integrated with your existing tools',
      'Monitoring, alerting, and a simple dashboard',
      'Handover docs and 30 days of support',
    ],
    timelineWeeks: { min: 2, max: 5 },
    priceRangeUsd: { min: 3000, max: 9000 },
    firstStep: 'A 30-minute discovery call to confirm the workflow and success metric',
    demo: true,
  }
}
