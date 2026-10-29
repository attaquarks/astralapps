/*
 * SERVICES
 * `icon` maps to an inline SVG in ServicesSection. The visual accent is the
 * single brand gradient (violet → blue) everywhere, for a cohesive look.
 */

export type Service = {
  title: string
  description: string
  icon: 'ai' | 'web' | 'automation' | 'chat' | 'dashboard' | 'api'
}

export const services: Service[] = [
  {
    title: 'AI Applications',
    description:
      'Custom AI tools that turn product workflows, content, and operations into faster, intelligent systems.',
    icon: 'ai',
  },
  {
    title: 'Web Applications',
    description:
      'Modern React platforms with polished interfaces, scalable architecture, and production-grade performance.',
    icon: 'web',
  },
  {
    title: 'Automation Systems',
    description:
      'Reliable pipelines for repetitive business tasks, integrations, reporting, and customer operations.',
    icon: 'automation',
  },
  {
    title: 'Chatbots & Voice Agents',
    description:
      'Conversational agents that answer, qualify, route, and take action across chat, phone, and internal tools.',
    icon: 'chat',
  },
  {
    title: 'SaaS Dashboards',
    description:
      'Operational dashboards, admin portals, and analytics surfaces designed for clarity and repeated use.',
    icon: 'dashboard',
  },
  {
    title: 'API Integrations',
    description:
      'Clean integration layers connecting CRMs, payment systems, AI models, databases, and third-party apps.',
    icon: 'api',
  },
]
