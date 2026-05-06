export const seo = {
  siteTitle: 'Ghulam Haider | Full-Stack Developer',
  siteDescription:
    'Full Stack Developer with 3+ years of experience building scalable web applications using Laravel, PHP, MySQL, and React.js. Specializing in financial systems and e-commerce platforms.',
  keywords:
    'Ghulam Haider, Full Stack Developer, Laravel Developer, PHP Developer, React Developer, Lahore, Pakistan, TALL Stack, Financial Systems, E-commerce Development',
  themeColor: '#0a0a0f',
} as const;

export const schema = {
  personId: 'https://ghulamhaider.dev/#person',
  jobTitle: 'Full Stack Developer',
  worksFor: {
    type: 'Organization' as const,
    name: 'Rozee.pk',
    url: 'https://rozee.pk',
  },
  address: {
    type: 'PostalAddress' as const,
    addressLocality: 'Lahore',
    addressRegion: 'Punjab',
    addressCountry: 'Pakistan',
  },
  knowsAbout: [
    'Software Engineering',
    'Full Stack Development',
    'Laravel',
    'React.js',
    'PHP',
    'JavaScript',
    'TypeScript',
    'Livewire',
    'Tailwind CSS',
    'Flux',
    'MySQL',
    'MongoDB',
    'REST APIs',
    'Docker',
    'Financial Systems',
    'E-commerce Platforms',
    'API Integration',
    'Clean Code',
    'System Architecture',
  ],
  sameAs: [
    'https://linkedin.com/in/ghulamhaider',
    'https://github.com/ghulamhaiderdev',
  ],
} as const;

export type SEO = typeof seo;
export type Schema = typeof schema;
