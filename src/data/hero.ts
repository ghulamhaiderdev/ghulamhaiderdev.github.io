export const heroTitles = [
  'Full Stack Developer',
  'PHP Laravel Specialist',
  'TALL Stack Expert',
  'Backend Architect',
  'Digital Solutions Provider',
] as const;

export type HeroTitle = (typeof heroTitles)[number];
