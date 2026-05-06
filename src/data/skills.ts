export interface Skill {
  name: string;
  level: number; // 0-100
  category: 'language' | 'framework' | 'tool' | 'platform';
  icon?: string;
}

export interface SkillCategory {
  name: string;
  skills: Skill[];
}

export const skills: SkillCategory[] = [
  {
    name: 'Languages',
    skills: [
      { name: 'PHP', level: 90, category: 'language' },
      { name: 'JavaScript', level: 85, category: 'language' },
      { name: 'TypeScript', level: 80, category: 'language' },
      { name: 'HTML5', level: 95, category: 'language' },
      { name: 'CSS3/Tailwind', level: 95, category: 'language' },
      { name: 'SQL/NoSQL', level: 85, category: 'language' },
    ],
  },
  {
    name: 'Frameworks & Libraries',
    skills: [
      { name: 'Laravel', level: 95, category: 'framework' },
      { name: 'React.js', level: 85, category: 'framework' },
      { name: 'Livewire/Flux', level: 90, category: 'framework' },
      { name: 'TALL Stack', level: 95, category: 'framework' },
      { name: 'Node.js', level: 75, category: 'framework' },
      { name: 'Tailwind CSS', level: 95, category: 'framework' },
    ],
  },
  {
    name: 'Tools & Architecture',
    skills: [
      { name: 'REST APIs', level: 95, category: 'tool' },
      { name: 'Git/GitHub/GitLab', level: 90, category: 'tool' },
      { name: 'Docker', level: 80, category: 'tool' },
      { name: 'MySQL/MongoDB', level: 90, category: 'tool' },
      { name: 'MVC/ORM', level: 95, category: 'tool' },
      { name: 'Financial Systems', level: 85, category: 'tool' },
    ],
  },
];

export const technologies = [
  'Laravel',
  'PHP',
  'React.js',
  'TypeScript',
  'Livewire',
  'Tailwind CSS',
  'Flux',
  'MySQL',
  'MongoDB',
  'REST APIs',
  'Docker',
  'Git',
  'GitHub',
  'GitLab',
  'MVC',
  'ORM',
  'Full Stack Development',
] as const;

export type Technology = (typeof technologies)[number];

export const services = [
  {
    title: 'Full Stack Development',
    description:
      'Building <span class="hover-underline-trigger">scalable, high-traffic web applications</span> using Laravel, React.js, and the TALL stack. I specialize in creating robust backend architectures and reactive front-end interfaces that provide a <span class="hover-underline-trigger">seamless user experience</span>. From e-commerce platforms to financial systems, I deliver clean, maintainable code.',
    icon: 'code',
    features: [
      'Laravel & PHP Backend Systems',
      'React & Livewire Frontend',
      'REST API Design & Integration',
      'Database Optimization',
    ],
  },
  {
    title: 'Financial & E-commerce Systems',
    description:
      'Designing and implementing <span class="hover-underline-trigger">secure billing and invoicing solutions</span>. I have extensive experience building end-to-end financial workflows, integrating payment gateways, and managing complex transactional data for enterprise-level clients.',
    icon: 'credit-card',
    features: [
      'Invoice Management Systems',
      'Payment Gateway Integration',
      'Digital Services Modules',
      'Financial Process Automation',
    ],
  },
  {
    title: 'API & Third-Party Integration',
    description:
      'Connecting platforms through <span class="hover-underline-trigger">seamless API integrations</span>. Whether it\'s telecom top-ups, AI services like ChatGPT, KYC verification systems, or logistics partners like TCS and Leopards, I ensure reliable and efficient data exchange.',
    icon: 'puzzle', 
    features: [
      'Third-party API Connections',
      'AI/LLM Integration',
      'Logistics & Courier APIs',
      'Telecom & Top-up Services',
    ],
  },
];
