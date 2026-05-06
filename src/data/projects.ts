export interface SubSubProject {
  title: string;
  description: string;
  image: string;
  live?: string;
}

export interface SubProject {
  title: string;
  description: string;
  image: string;
  live?: string;
  subProjects?: SubSubProject[];
}

export interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  metrics: string[];
  github: string | null;
  live: string | null;
  featured: boolean;
  subProjects?: SubProject[];
}

export const projects: Project[] = [
  {
    title: 'ABN Global',
    description:
      'Developed finance and billing features for a global platform, ensuring scalability and high availability. Built end-to-end billing systems for enterprise clients.',
    image: '/img/featured/abn-global.png',
    tags: ['Laravel', 'MySQL', 'MongoDB', 'Finance'],
    metrics: ['Scalable Architecture', 'Global Billing System'],
    github: null,
    live: 'https://abnglobal.io',
    featured: true,
  },
  {
    title: 'Sellers CPanel (Dukan.pk)',
    description:
      "Core seller management dashboard powering Dukan.pk's e-commerce ecosystem. Integrated telecom top-ups, AI-powered KYC verification, and logistics partner APIs.",
    image: '/img/featured/dukan-cpanel.png',
    tags: ['PHP', 'Laravel', 'React.js', 'REST APIs', 'AI'],
    metrics: ['AI-powered KYC', 'Digital Services Module'],
    github: null,
    live: 'https://sellers.dukan.pk',
    featured: true,
  },
  {
    title: 'Dlivr Onboarding',
    description:
      'Implemented end-to-end Visa card transactional payment workflows and courier partner integrations (TCS, Leopards) for seamless logistics.',
    image: '/img/featured/dlivr.png',
    tags: ['Laravel', 'Payment Gateways', 'API Integration'],
    metrics: ['Automated Logistics', 'Payment Workflows'],
    github: null,
    live: null,
    featured: true,
  },
  {
    title: 'Clan Compass',
    description:
      'All-in-one family planner with shared calendar, meal planning, chore management, and smart lists.',
    image: '/img/featured/featured-clan.avif',
    tags: ['React', 'Next.js', 'MySQL', 'Sass'],
    metrics: ['40% cost reduction', 'Automated workflows'],
    github: null,
    live: 'https://clancompass.com',
    featured: false,
  },
  {
    title: 'Personal Family Organizer',
    description:
      'React-based application for family task management and scheduling',
    image: '/img/portfolio/lists.webp',
    tags: ['React', 'TypeScript', 'Node.js', 'MongoDB'],
    metrics: ['Real-time sync', 'Mobile responsive'],
    github: 'https://github.com/leoashcraft',
    live: null,
    featured: false,
  },
  {
    title: 'DOCX Search & Replace',
    description:
      'Python utility for batch processing and text replacement in Word documents',
    image: '/img/portfolio/docx-search-replace.webp',
    tags: ['Python', 'python-docx', 'CLI'],
    metrics: ['Batch processing', 'Regex support'],
    github: 'https://github.com/leoashcraft',
    live: null,
    featured: false,
  },
  {
    title: 'Radio Daddy Archive',
    description:
      'Web archive and streaming platform for vintage radio broadcasts',
    image: '/img/portfolio/radiodaddy.webp',
    tags: ['PHP', 'MySQL', 'Audio Streaming'],
    metrics: ['1000+ broadcasts', 'Search indexing'],
    github: null,
    live: null,
    featured: false,
  },
  {
    title: 'Lindale IT Services',
    description: 'WordPress website for local IT services company',
    image: '/img/portfolio/lindaleit.webp',
    tags: ['WordPress', 'Elementor', 'SEO'],
    metrics: ['Mobile optimized', 'Local SEO'],
    github: null,
    live: null,
    featured: false,
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const otherProjects = projects.filter((p) => !p.featured);
