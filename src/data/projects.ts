export type Project = {
  title: string
  category: 'AI' | 'Web' | 'Automation' | 'SaaS'
  description: string
  techStack: string[]
  link?: string
}

export const projects: Project[] = [
  {
    title: 'OrbitOps Command Center',
    category: 'SaaS',
    description:
      'A real-time operations dashboard for monitoring accounts, tasks, support queues, and automation health.',
    techStack: ['React', 'TypeScript', 'PostgreSQL', 'Charts'],
  },
  {
    title: 'Nova Support Agent',
    category: 'AI',
    description:
      'An AI support assistant that classifies requests, drafts replies, and escalates complex cases to humans.',
    techStack: ['LLM APIs', 'RAG', 'Node.js', 'CRM APIs'],
  },
  {
    title: 'Pipeline Automator',
    category: 'Automation',
    description:
      'A business automation layer that moves leads, invoices, documents, and status updates between tools.',
    techStack: ['Webhooks', 'Queues', 'REST APIs', 'Workers'],
  },
  {
    title: 'Celestial Launch Site',
    category: 'Web',
    description:
      'A high-performance launch website with cinematic interactions, custom CMS content, and SEO foundations.',
    techStack: ['Vite', 'R3F', 'GSAP', 'Tailwind'],
  },
]
