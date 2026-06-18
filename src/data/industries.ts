/*
 * INDUSTRY CONTENT MODEL
 * Powers the soft "Industry-Locked Entry" (#3): choosing a vertical swaps the
 * hero copy, the "dead workflow" examples, the before/after timeline, and the
 * featured case study across the page. The page also works with nothing
 * selected — see `genericContent` for that neutral state.
 *
 * TODO: replace case-study numbers/titles with real results as they land.
 */

export type IndustryId = 'recruiting' | 'marketing' | 'accounting' | 'realestate'

/** A manual task that's bleeding hours — used by the Graveyard (#6),
 *  Before/After journey (#5), and side-by-side timeline (#7). */
export type DeadWorkflow = {
  task: string
  hoursPerWeek: number
  automated: string
}

export type IndustryContent = {
  /** hero headline variant */
  headline: string
  subhead: string
  /** the manual work that's killing this vertical */
  deadWorkflows: DeadWorkflow[]
  caseStudy: { title: string; result: string; hoursSavedPerWeek: number }
  /** seed text for the Live Automation Builder input */
  builderPlaceholder: string
}

export type Industry = IndustryContent & {
  id: IndustryId
  label: string
  short: string
  /** icon key resolved in the UI */
  icon: IndustryId
}

export const industries: Industry[] = [
  {
    id: 'recruiting',
    label: 'Recruiting Agency',
    short: 'Recruiting',
    icon: 'recruiting',
    headline: 'Automate the busywork. Place more candidates.',
    subhead:
      'We build automations that source, screen, and follow up — so your recruiters spend their hours on people, not data entry.',
    deadWorkflows: [
      { task: 'Manually updating the ATS after every call', hoursPerWeek: 9, automated: 'Calls are auto-logged and the ATS updates itself from the notes.' },
      { task: 'Copy-pasting candidates between LinkedIn, email & CRM', hoursPerWeek: 7, automated: 'New candidates sync across every tool the moment they reply.' },
      { task: 'Sending interview reminders one by one', hoursPerWeek: 6, automated: 'Reminders and nudges schedule and send themselves.' },
      { task: 'Screening résumés against the spec by hand', hoursPerWeek: 8, automated: 'AI shortlists and ranks every applicant in minutes.' },
    ],
    caseStudy: { title: 'ATS auto-sync for a 12-person tech recruiter', result: 'Admin cut from 30 → 6 hrs/week', hoursSavedPerWeek: 24 },
    builderPlaceholder: 'e.g. When a candidate replies to an email, update their stage in our ATS and ping the recruiter in Slack',
  },
  {
    id: 'marketing',
    label: 'Marketing Agency',
    short: 'Marketing',
    icon: 'marketing',
    headline: 'Ship campaigns, not status reports.',
    subhead:
      'Automations that pull data, build reports, and route approvals — so your team creates instead of copy-pasting.',
    deadWorkflows: [
      { task: 'Building client reports across GA, Meta & Google Ads', hoursPerWeek: 10, automated: 'Branded reports compile themselves and land in the client inbox.' },
      { task: 'Chasing creative approvals over email', hoursPerWeek: 5, automated: 'Approvals route automatically and nudge until signed off.' },
      { task: 'Moving leads from forms into the CRM', hoursPerWeek: 4, automated: 'Every lead lands in the CRM, enriched and assigned.' },
      { task: 'Repurposing one asset into 8 channel formats', hoursPerWeek: 7, automated: 'One upload — AI drafts every channel variant.' },
    ],
    caseStudy: { title: 'Automated reporting for a 9-client agency', result: 'Saved ~9 hrs/week of reporting', hoursSavedPerWeek: 9 },
    builderPlaceholder: 'e.g. Every Monday, pull last week’s ad metrics and build a branded PDF report for each client',
  },
  {
    id: 'accounting',
    label: 'Accounting Firm',
    short: 'Accounting',
    icon: 'accounting',
    headline: 'Close faster. Touch fewer spreadsheets.',
    subhead:
      'Automations that capture documents, reconcile data, and chase clients — so your team reviews instead of re-keys.',
    deadWorkflows: [
      { task: 'Chasing clients for missing receipts & documents', hoursPerWeek: 8, automated: 'Automated reminders collect docs without a human in the loop.' },
      { task: 'Manually entering invoices and bills', hoursPerWeek: 9, automated: 'Documents are read and posted to the ledger automatically.' },
      { task: 'Reconciling transactions across feeds & ledgers', hoursPerWeek: 6, automated: 'Matches are proposed — you just approve the exceptions.' },
      { task: 'Assembling month-end client packets', hoursPerWeek: 5, automated: 'Packets generate themselves straight from the ledger.' },
    ],
    caseStudy: { title: 'Document intake for a 6-partner firm', result: 'Data entry cut by ~70%', hoursSavedPerWeek: 22 },
    builderPlaceholder: 'e.g. When a client emails an invoice, extract the line items and create a bill in QuickBooks',
  },
  {
    id: 'realestate',
    label: 'Real Estate Team',
    short: 'Real Estate',
    icon: 'realestate',
    headline: 'Never drop a lead again.',
    subhead:
      'Automations that capture, qualify, and nurture leads 24/7 — so your agents focus on closings, not data entry.',
    deadWorkflows: [
      { task: 'Entering leads from portals into the CRM by hand', hoursPerWeek: 6, automated: 'Leads from every portal sync into the CRM instantly.' },
      { task: 'Following up with new leads one by one', hoursPerWeek: 8, automated: 'New leads get an instant, personal first response.' },
      { task: 'Updating listing status across portals', hoursPerWeek: 4, automated: 'One change updates every portal automatically.' },
      { task: 'Scheduling showings over endless texts', hoursPerWeek: 5, automated: 'Buyers self-book from your real-time availability.' },
    ],
    caseStudy: { title: 'Instant lead response for a 15-agent team', result: 'Response time 4 hrs → 2 min', hoursSavedPerWeek: 18 },
    builderPlaceholder: 'e.g. When a new lead comes from Zillow, text them within 60 seconds and add them to our CRM',
  },
]

/** Neutral content shown before a visitor picks an industry. */
export const genericContent: IndustryContent = {
  headline: 'Describe a manual task. Watch it become an automation.',
  subhead:
    'AstralApps is an AI automation studio. Tell us what your team does by hand every week — we’ll show you the system that does it for them.',
  deadWorkflows: [
    { task: 'Copy-pasting data between tools', hoursPerWeek: 7, automated: 'Records sync across every tool automatically.' },
    { task: 'Sending the same follow-ups by hand', hoursPerWeek: 6, automated: 'Follow-ups send themselves, on schedule.' },
    { task: 'Building the same report every week', hoursPerWeek: 8, automated: 'Reports compile and deliver themselves.' },
    { task: 'Re-keying documents into software', hoursPerWeek: 9, automated: 'Documents are read and entered automatically.' },
  ],
  caseStudy: { title: 'A typical first automation', result: 'Reclaims 20+ hrs/week of manual work', hoursSavedPerWeek: 20 },
  builderPlaceholder: 'e.g. When a lead fills out our form, qualify them with AI and route hot ones to Slack',
}

export function getIndustry(id: IndustryId | null): IndustryContent {
  return industries.find((industry) => industry.id === id) ?? genericContent
}
