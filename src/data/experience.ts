export interface Experience {
  company: string;
  position: string;
  period: string;
  startDate: string;
  endDate: string | 'Current';
  location?: string;
  highlights: string[];
}

export const experience: Experience[] = [
  {
    company: 'Rozee.pk',
    position: 'Senior Full Stack Developer',
    period: 'Oct 2025 - Present',
    startDate: '2025-10',
    endDate: 'Current',
    location: 'Lahore, Pakistan',
    highlights: [
      'Develop and maintain Finance & Invoicing modules using Laravel, MySQL, and MongoDB, building end-to-end billing systems for enterprise clients.',
      'Implement secure invoice management workflows and automate financial processes, reducing manual overhead and improving operational efficiency.',
      'Design SPA-like interfaces with Livewire, Flux, and Tailwind CSS, delivering reactive UI updates and performance-optimized frontend architecture.',
      'Optimize database queries and reporting systems to enhance data accuracy and application performance.',
      'Contribute to scalable system architecture, clean code practices, and code reviews.',
      'Project: ABN Global (abnglobal.io) – Developed finance and billing features for a global platform, ensuring scalability and high availability.',
    ],
  },
  {
    company: 'Dukan.pk',
    position: 'Full Stack Developer',
    period: 'Aug 2021 - Sep 2025',
    startDate: '2021-08',
    endDate: '2025-09',
    location: 'Lahore, Pakistan',
    highlights: [
      'Integrated telecom top-up APIs (Zong, Telenor, Jazz, Ufone), enabling a large-scale digital services module that significantly expanded platform revenue streams.',
      'Developed an AI-powered KYC verification system using CNIC data and ChatGPT API, cutting onboarding time and improving identity validation accuracy.',
      'Built the Dlivr onboarding application and implemented end-to-end Visa card transactional payment workflows for seamless checkout experiences.',
      'Integrated courier partner APIs (TCS, Leopards Courier) to automate logistics and improve delivery reliability across the platform.',
      'Designed scalable RESTful APIs and backend systems to support high-traffic e-commerce operations.',
      'Project: Sellers CPanel (sellers.dukan.pk) – Core seller management dashboard powering Dukan.pk’s e-commerce ecosystem.',
    ],
  },
  {
    company: 'NetRoots Technologies',
    position: 'PHP Laravel Developer',
    period: 'Jan 2021 - Aug 2021',
    startDate: '2021-01',
    endDate: '2021-08',
    location: 'Lahore, Pakistan',
    highlights: [
      'Developed complex nested CRUD modules for a land management system, handling hierarchical data relationships with high accuracy.',
      'Collaborated with a cross-functional team using GitLab for version control, code reviews, and agile workflow management.',
      'Applied MVC architecture and ORM principles to build clean, maintainable, and scalable backend features.',
    ],
  },
];

export interface Education {
  institution: string;
  degree: string;
  year: string;
  description: string;
  skills: string[];
  credentialUrl?: string;
}

export const education: Education[] = [
  {
    institution: 'Virtual University of Pakistan',
    degree: 'Bachelor of Computer Science (BSCS)',
    year: '2020',
    description: 'Relevant Coursework: Object-Oriented Programming, Data Structures, Algorithms, Database Management Systems (DBMS)',
    skills: ['OOP', 'Data Structures', 'Algorithms', 'DBMS', 'Software Engineering'],
  },
];

export const certifications = [
  {
    name: 'Full Stack Web Development',
    issuer: 'Professional Experience',
    year: '2021-Present',
    credentialId: 'Verified',
  },
];

export const passions = [
  {
    name: 'Open Source',
    description: 'Contributing to and learning from the open source community',
    icon: '🌐',
  },
  {
    name: 'Automation',
    description: 'Building tools that eliminate repetitive tasks and improve workflows',
    icon: '🤖',
  },
  {
    name: 'Clean Code',
    description: 'Writing maintainable, readable, and well-documented code',
    icon: '✨',
  },
  {
    name: 'Continuous Learning',
    description: 'Always exploring new technologies and best practices',
    icon: '📚',
  },
  {
    name: 'Problem Solving',
    description: 'Finding elegant solutions to complex technical challenges',
    icon: '🧩',
  },
];
