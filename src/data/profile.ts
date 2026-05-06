export const profile = {
  name: "Ghulam Haider",
  title: "Full Stack Developer",
  location: "Lahore, Pakistan",
  tagline: "I Cultivate Digital Excellence",
  description:
    "Full Stack Developer with 3+ years of experience building scalable web applications using Laravel, PHP, MySQL, and React.js.",
  bio: `Full Stack Developer with 3+ years of experience building scalable web applications using Laravel, PHP, MySQL, and React.js. Proven track record in designing REST APIs. Strong expertise in backend architecture, database optimization, and third-party API integrations. Currently driving Finance & Invoicing solutions at Rozee.pk, with a focus on clean code and operational efficiency.`,

  availability: ["Open to freelance", "Open to full-time"],

  // Obfuscated contact info (reversed for spam protection)
  contact: {
    whatsapp: { area: "29+", number: "3156325203" }, // +92 3025236513
    phone: { area: "29+", number: "324642471" },    // +92 174246423
    email: { user: "280rediahmaluhg", website: "moc.liamg" },
  },

  social: {
    linkedin: "https://linkedin.com/in/ghulamhaider",
    github: "https://github.com/ghulamhaiderdev",
  },

  stats: [
    { value: 3, suffix: "+", label: "Years Tech Experience" },
    { value: 3, suffix: "+", label: "Years Development" },
    { value: 8, suffix: "+", label: "Projects Completed" },
  ],

  resumeUrl: "https://drive.google.com/file/d/1cdOKI8Wzsy9lPdV8mqFfd_b35ZnC7Tti/view?usp=drive_link", // Add your Google Drive link here (e.g., "https://drive.google.com/file/d/...")
  photoUrl: "/img/profile-img.jpeg",
  avatarUrl: "/img/profile-img.jpeg",
} as const;

export type Profile = typeof profile;
