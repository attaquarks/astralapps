/*
 * "Live system" data — webhook/automation events and JSON payloads used by the
 * command-center background (#9/#11) and the in-production ticker (#17).
 * These are illustrative, not a real feed. TODO: wire to a real event source
 * if you ever want it to be genuinely live.
 */

export type LiveEvent = { tool: string; event: string }

export const liveEvents: LiveEvent[] = [
  { tool: 'Slack', event: 'lead.routed → #sales' },
  { tool: 'HubSpot', event: 'contact.created' },
  { tool: 'Gmail', event: 'follow_up.sent' },
  { tool: 'QuickBooks', event: 'bill.posted' },
  { tool: 'Zapier', event: 'webhook.received' },
  { tool: 'Airtable', event: 'record.synced' },
  { tool: 'Calendly', event: 'meeting.booked' },
  { tool: 'OpenAI', event: 'document.classified' },
  { tool: 'Stripe', event: 'invoice.paid' },
  { tool: 'Notion', event: 'report.generated' },
  { tool: 'Twilio', event: 'sms.delivered' },
  { tool: 'Salesforce', event: 'stage.updated' },
]

/** Blurred JSON payloads scrolling in the background. */
export const feedPayloads: string[] = [
  '{ "event": "workflow.completed", "id": "wf_8421", "saved_min": 42 }',
  '{ "trigger": "form.submitted", "route": "crm", "status": 200 }',
  'POST /hooks/lead  202  ↳ enrich → assign → notify',
  '{ "doc": "invoice_0931.pdf", "parsed": true, "lines": 14 }',
  '{ "agent": "screener", "ranked": 38, "shortlist": 6 }',
  '200 OK  sync(ats, linkedin)  Δ 0.41s',
  '{ "task": "report.weekly", "clients": 9, "delivered": true }',
  '{ "reminder": "docs.missing", "sent_to": 5, "channel": "email" }',
  'queue: 0 pending · 7 automations live · 99.9% ok',
  '{ "match": "bank↔ledger", "auto": 214, "review": 3 }',
  '{ "lead": "zillow", "responded_in_s": 38, "booked": true }',
  '{ "approval": "creative_v3", "status": "signed", "via": "auto" }',
]
