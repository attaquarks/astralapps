export type Service = {
  title: string
  description: string
  accent: 'cyan' | 'violet' | 'mint' | 'amber' | 'rose' | 'blue'
}

export const services: Service[] = [
  {
    title: 'AI Applications',
    description:
      'Custom AI tools that turn product workflows, content, and operations into faster intelligent systems.',
    accent: 'cyan',
  },
  {
    title: 'Web Applications',
    description:
      'Modern React platforms with polished interfaces, scalable architecture, and production-grade performance.',
    accent: 'violet',
  },
  {
    title: 'Automation Systems',
    description:
      'Reliable automation pipelines for repetitive business tasks, integrations, reporting, and customer operations.',
    accent: 'mint',
  },
  {
    title: 'Chatbots & Voice Agents',
    description:
      'Conversational agents that answer, qualify, route, and take action across chat, phone, and internal tools.',
    accent: 'amber',
  },
  {
    title: 'SaaS Dashboards',
    description:
      'Operational dashboards, admin portals, and analytics surfaces designed for clarity and repeated use.',
    accent: 'blue',
  },
  {
    title: 'API Integrations',
    description:
      'Clean integration layers that connect CRMs, payment systems, AI models, databases, and third-party apps.',
    accent: 'rose',
  },
]
