import { useState, useRef, useEffect, type KeyboardEvent } from 'react';
import { profile } from '../../data/profile';
import { experience, education, certifications, passions } from '../../data/experience';
import { skills, technologies } from '../../data/skills';

type OutputLine = {
  type: 'input' | 'output' | 'error' | 'ascii';
  content: string;
};

const ASCII_ART_DESKTOP = `
 _                  _         _                   __ _
| |    ___  ___    / \\   ___| |__   ___ _ __ __ _ / _| |_
| |   / _ \\/ _ \\  / _ \\ / __| '_ \\ / __| '__/ _\` | |_| __|
| |__|  __/ (_) |/ ___ \\\\__ \\ | | | (__| | | (_| |  _| |_
|_____\\___|\\___//_/   \\_\\___/_| |_|\\___|_|  \\__,_|_|  \\__|

Welcome to my interactive portfolio terminal!
Type 'help' to see available commands.
`;

const ASCII_ART_MOBILE = `
╭──────────────────────╮
│   GHULAM HAIDER       │
│   Full Stack Dev     │
╰──────────────────────╯

Welcome! Type 'help' for commands.
`;

const commands: Record<string, () => string> = {
  'easter eggs': () => `
🥚 SECRET COMMANDS UNLOCKED! 🥚

Try these hidden gems:

ANIMATIONS:
  dev             npm run dev       shutdown
  restart         q / quit / exit

LINUX COMMANDS:
  ls              pwd               cd
  cat             head              tail
  grep            diff              sort
  tar             zip               unzip
  chmod           chown             mount
  ps              top               kill
  df              free              du
  ssh             ping              curl
  wget            traceroute        ifconfig
  uname           whoami            hostname
  service         systemctl         ufw
  useradd         passwd            id

PACKAGE MANAGERS:
  npm install     brew              apt
  yum             pacman            rpm

PROGRAMMING:
  python          node              docker
  git status      git log           git blame
  vim             nano              emacs
  make            make coffee       make money

FUN STUFF:
  neofetch        cowsay            fortune
  sl              figlet            cmatrix
  matrix          lolcat            yes / no
  weather         cal               history

MISCHIEF:
  rm -rf /        sudo              su
  exit            cat /etc/passwd   hack

NAVIGATION:
  form            activity          top
  bottom          github            linkedin

Type any command to see what happens! 🎮
`,

  easter: () => commands['easter eggs'](),
  eggs: () => commands['easter eggs'](),
  egg: () => commands['easter eggs'](),
  'easter egg': () => commands['easter eggs'](),
  secrets: () => commands['easter eggs'](),
  hidden: () => commands['easter eggs'](),
  commands: () => commands['easter eggs'](),

  help: () => `
Available commands:
  help        Show this help message
  about       Learn about me
  skills      View my technical skills
  experience  View my work experience
  projects    Browse my projects
  contact     Get my contact info
  resume      Download my resume
  social      View social links
  clear       Clear the terminal
`,

  about: () => `
╔══════════════════════════════════════════════════════════════╗
║                       ABOUT ME                               ║
╚══════════════════════════════════════════════════════════════╝

${profile.name}
${profile.title}
📍 ${profile.location}

${profile.bio}

📊 Stats:
   • ${profile.stats[0].value}+ years of tech experience
   • ${profile.stats[1].value}+ years of development
   • ${profile.stats[2].value}+ years in management
   • ${profile.stats[3].value}+ products launched

Type 'skills' to see my technical stack or 'experience' for work history.
`,

  skills: () => `
╔══════════════════════════════════════════════════════════════╗
║                    TECHNICAL SKILLS                          ║
╚══════════════════════════════════════════════════════════════╝

Languages:
${skills[0].skills.map((s) => `  ${s.name.padEnd(15)} ${'█'.repeat(Math.floor(s.level / 10))}${'░'.repeat(10 - Math.floor(s.level / 10))} ${s.level}%`).join('\n')}

Frameworks & Libraries:
${skills[1].skills.map((s) => `  ${s.name.padEnd(15)} ${'█'.repeat(Math.floor(s.level / 10))}${'░'.repeat(10 - Math.floor(s.level / 10))} ${s.level}%`).join('\n')}

Technologies: ${technologies.slice(0, 12).join(' • ')}
`,

  experience: () => `
╔══════════════════════════════════════════════════════════════╗
║                    WORK EXPERIENCE                           ║
╚══════════════════════════════════════════════════════════════╝

${experience
    .slice(0, 3)
    .map(
      (exp) => `
┌─ ${exp.company} ─────────────────────────
│  ${exp.position}
│  ${exp.period}
│
${exp.highlights.slice(0, 2).map((h) => `│  • ${h.slice(0, 60)}${h.length > 60 ? '...' : ''}`).join('\n')}
└────────────────────────────────────────────
`
    )
    .join('')}

Type 'projects' to see my portfolio work.
`,

  projects: () => `
╔══════════════════════════════════════════════════════════════╗
║                      PROJECTS                                ║
╚══════════════════════════════════════════════════════════════╝

1. Parker University Web Systems
   Full-stack development for multiple university domains
   Stack: PHP, Laravel, WordPress, Salesforce API

2. Strategic Fulfillment Group
   Laravel backend with HubSpot CRM integration
   Stack: Laravel, PHP, HubSpot API

3. Personal Family Organizer
   React-based family management application
   Stack: React, TypeScript, Node.js

4. DOCX Search & Replace Tool
   Python utility for batch document processing
   Stack: Python, python-docx

Visit /projects for detailed case studies with metrics.
`,

  contact: () => {
    const email = profile.contact.email.user.split('').reverse().join('') + '@' + profile.contact.email.website.split('').reverse().join('');
    const phone = profile.contact.phone.area.split('').reverse().join('') + ' ' + profile.contact.phone.number.split('').reverse().join('');

    return `
╔══════════════════════════════════════════════════════════════╗
║                      CONTACT ME                              ║
╚══════════════════════════════════════════════════════════════╝

📧 Email:    ${email}
📱 Phone:    ${phone}
📍 Location: ${profile.location}

Or scroll down to use the contact form!
`;
  },

  resume: () => `
📄 Resume Download

Opening resume in new tab...
(If popup blocked, visit: ${profile.resumeUrl})

[Downloading Ghulam-Haider-Resume.pdf]
`,

  social: () => `
╔══════════════════════════════════════════════════════════════╗
║                    SOCIAL LINKS                              ║
╚══════════════════════════════════════════════════════════════╝

🔗 LinkedIn: ${profile.social.linkedin}
🐙 GitHub:   ${profile.social.github}

Feel free to connect!
`,

  github: () => {
    window.open(profile.social.github, '_blank');
    return `🐙 Opening GitHub profile...

${profile.social.github}`;
  },

  linkedin: () => {
    window.open(profile.social.linkedin, '_blank');
    return `🔗 Opening LinkedIn profile...

${profile.social.linkedin}`;
  },

  form: () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    return `📝 Jumping to contact form...`;
  },

  activity: () => {
    document.getElementById('github')?.scrollIntoView({ behavior: 'smooth' });
    return `🐙 Jumping to GitHub activity...`;
  },

  top: () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return `⬆️ Jumping to top...`;
  },

  bottom: () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    return `⬇️ Jumping to bottom...`;
  },

  employer: () => {
    const current = experience.find(e => e.endDate === 'Current');
    if (!current) return 'Currently seeking new opportunities!';
    return `
╔══════════════════════════════════════════════════════════════╗
║                  CURRENT EMPLOYER                            ║
╚══════════════════════════════════════════════════════════════╝

🏢 ${current.company}
💼 ${current.position}
📅 ${current.period}
📍 ${current.location || 'Remote'}

Key Responsibilities:
${current.highlights.map(h => `  • ${h}`).join('\n')}

Type 'employment' for full work history.
`;
  },

  employment: () => `
╔══════════════════════════════════════════════════════════════╗
║                  EMPLOYMENT HISTORY                          ║
╚══════════════════════════════════════════════════════════════╝

${experience.map(exp => `
┌─ ${exp.company} ${'─'.repeat(Math.max(0, 45 - exp.company.length))}
│  💼 ${exp.position}
│  📅 ${exp.period}
│  📍 ${exp.location || 'Remote'}
└${'─'.repeat(50)}
`).join('')}
Total: ${experience.length} positions | ${profile.stats[0].value}+ years in tech
`,

  education: () => `
╔══════════════════════════════════════════════════════════════╗
║                     EDUCATION                                ║
╚══════════════════════════════════════════════════════════════╝

${education.map(edu => `
🎓 ${edu.degree}
   ${edu.institution} (${edu.year})
   ${edu.description}

   Skills: ${edu.skills.join(' • ')}
`).join('\n')}
Type 'certifications' for professional certifications.
`,

  certifications: () => `
╔══════════════════════════════════════════════════════════════╗
║                  CERTIFICATIONS                              ║
╚══════════════════════════════════════════════════════════════╝

${certifications.map(cert => `
📜 ${cert.name}
   Issuer: ${cert.issuer}
   Year: ${cert.year}
   Status: ${cert.credentialId}
`).join('\n')}
`,

  passions: () => `
╔══════════════════════════════════════════════════════════════╗
║                  WHAT DRIVES ME                              ║
╚══════════════════════════════════════════════════════════════╝

${passions.map(p => `${p.icon} ${p.name}
   ${p.description}
`).join('\n')}
These passions fuel my work every day!
`,

  techstack: () => `
╔══════════════════════════════════════════════════════════════╗
║                    TECH STACK                                ║
╚══════════════════════════════════════════════════════════════╝

Languages:
  ${technologies.filter(t => ['PHP', 'JavaScript', 'TypeScript', 'Python', 'SQL'].includes(t)).join(' • ')}

Frontend:
  React • Vue.js • Next.js • Tailwind CSS • HTML5 • CSS3

Backend:
  Laravel • Node.js • WordPress • REST APIs • GraphQL

Databases:
  MySQL • PostgreSQL • MongoDB • Redis

DevOps & Tools:
  Docker • AWS • Git • GitHub • Jenkins • CI/CD

CRM & Integration:
  Salesforce • HubSpot • Twilio • SearchStax

Currently exploring: Astro, Three.js, AI/ML integrations
`,

  repos: () => `
╔══════════════════════════════════════════════════════════════╗
║                  GITHUB REPOSITORIES                         ║
╚══════════════════════════════════════════════════════════════╝

🔗 github.com/ghulamhaiderdev

Featured Repos:
  📁 Portfolio          This website! Astro + Three.js + React
  📁 DOCX-Tool          Python batch document processor
  📁 Family-Organizer   React family management app

Stats: Check the GitHub section on the homepage for live data!

Visit: ${profile.social.github}
`,

  cv: () => `
📄 CV/Resume Download

Opening resume in new tab...
(If popup blocked, visit: ${profile.resumeUrl})

[Downloading Ghulam-Haider-Resume.pdf]
`,

  neofetch: () => `
        .--.          ghulam@portfolio
       |o_o |         ──────────────
       |:_/ |         OS: macOS (brain runs on coffee)
      //   \\ \\        Host: Lahore, Pakistan
     (|     | )       Kernel: ${profile.stats[0].value}+ years experience
    /'\\_   _/\`\\       Uptime: Since 2009
    \\___)=(___/       Packages: ${technologies.length} technologies
                      Shell: zsh + oh-my-zsh
   ${profile.name}    Resolution: 4K problems daily
   ${profile.title}   DE: VS Code + Dark Mode
                      Terminal: This one!
                      CPU: Highly caffeinated
                      Memory: Stack Overflow cached
`,

  matrix: () => `
🐇 Follow the white rabbit...

01001000 01100101 01101100 01101100 01101111
01010111 01101111 01110010 01101100 01100100

(That's "Hello World" in binary)

There is no spoon. 🥄
`,

  // Classic terminal commands
  ifconfig: () => `
eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 192.168.1.337  netmask 255.255.255.0  broadcast 192.168.1.255
        inet6 fe80::1337:dead:beef:cafe  prefixlen 64  scopeid 0x20<link>
        ether de:ad:be:ef:ca:fe  txqueuelen 1000  (Ethernet)
        RX packets 1337420  bytes 69696969 (69.6 MB)
        TX packets 420420  bytes 42424242 (42.4 MB)

lo: flags=73<UP,LOOPBACK,RUNNING>  mtu 65536
        inet 127.0.0.1  netmask 255.0.0.0
        inet6 ::1  prefixlen 128  scopeid 0x10<host>
        loop  txqueuelen 1000  (Local Loopback)

Note: These aren't real IPs. Nice try though! 😉
`,

  ip: () => commands.ifconfig(),

  ls: () => `
drwxr-xr-x  about/
drwxr-xr-x  experience/
drwxr-xr-x  projects/
drwxr-xr-x  skills/
-rw-r--r--  resume.pdf
-rw-r--r--  contact.txt
-rw-r--r--  README.md
drwxr-xr-x  .secrets/        <- Nice try 👀
`,

  'ls -la': () => commands.ls(),
  'ls -a': () => commands.ls(),
  dir: () => commands.ls(),

  pwd: () => `/home/ghulam/portfolio
(You are here! 🏠)`,

  cd: () => `bash: cd: nowhere to go, you're already at the best place!`,

  cat: () => `Usage: cat <filename>
Try: cat readme.md | cat resume.pdf | cat secrets.txt`,

  'cat readme.md': () => `
# Ghulam Haider's Portfolio

Welcome! This is my interactive terminal portfolio.

## Quick Start
- Type 'help' for available commands
- Type 'about' to learn about me
- Type 'contact' to get in touch

Built with: Astro, React, Three.js, TypeScript, and ☕
`,

  'cat resume.pdf': () => `[Binary file - use 'resume' command to download]`,

  'cat secrets.txt': () => `Nice try! 🔒
The secret is: there is no secret. Just hard work and coffee.`,

  'cat /etc/passwd': () => `root:x:0:0:root:/root:/bin/bash
ghulam:x:1000:1000:Ghulam Haider,,,:/home/ghulam:/bin/zsh
coffee:x:1001:1001:Essential Service:/dev/null:/bin/espresso

Just kidding. This is a portfolio, not a server! 😄`,

  date: () => {
    const now = new Date();
    return now.toString();
  },

  uptime: () => `
 ${new Date().toLocaleTimeString()} up ${Math.floor(Math.random() * 365)} days, ${Math.floor(Math.random() * 24)}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')},  1 user,  load average: 0.${Math.floor(Math.random() * 99)}, 0.${Math.floor(Math.random() * 99)}, 0.${Math.floor(Math.random() * 99)}

Actually, I've been coding for ${profile.stats[0].value}+ years. That's the real uptime! 💪
`,

  top: () => `
  PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND
 1337 ghulam       20   0  420.0m  69.0m  42.0m S  99.9  13.37  9001:00 coding
 1338 ghulam       20   0  256.0m  64.0m  32.0m S  42.0   8.00   420:00 debugging
 1339 ghulam       20   0  128.0m  32.0m  16.0m S  25.0   4.00   180:00 coffee
 1340 ghulam       20   0   64.0m  16.0m   8.0m S  10.0   2.00    60:00 meetings
 1341 ghulam       20   0   32.0m   8.0m   4.0m S   5.0   1.00    30:00 stackoverflow

Press 'q' to quit... just kidding, this isn't real top 😄
`,

  htop: () => commands.top(),
  ps: () => commands.top(),

  ping: () => `
PING google.com (142.250.80.46): 56 data bytes
64 bytes from 142.250.80.46: icmp_seq=0 ttl=117 time=4.20 ms
64 bytes from 142.250.80.46: icmp_seq=1 ttl=117 time=6.90 ms
64 bytes from 142.250.80.46: icmp_seq=2 ttl=117 time=13.37 ms
^C
--- google.com ping statistics ---
3 packets transmitted, 3 received, 0% packet loss

Spoiler: This portfolio doesn't actually have network access 🌐
`,

  curl: () => `
curl: try 'curl https://ghulamhaider.dev' to visit my site!
Or just scroll around - you're already here! 🎉
`,

  wget: () => commands.curl(),

  git: () => `
usage: git <command>

Try:
  git status    - See what's happening
  git log       - View commit history
  git blame     - It's always DNS

Or visit: ${profile.social.github}
`,

  'git status': () => `
On branch main
Your branch is up to date with 'origin/main'.

Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        modified:   career.js
        new file:   awesome-projects.ts
        deleted:    bugs.log

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        future-plans/
        coffee-consumption.log
`,

  'git log': () => `
commit 7h1s1s4h4sh (HEAD -> main, origin/main)
Author: Ghulam Haider <ghulam@ashcraft.tech>
Date:   ${new Date().toDateString()}

    Made everything awesome ✨

commit c0ff33c0d3
Author: Ghulam Haider <ghulam@ashcraft.tech>
Date:   Yesterday

    Fixed bugs, added features, drank coffee

commit d34db33f
Author: Ghulam Haider <ghulam@ashcraft.tech>
Date:   Last week

    Initial commit (it worked on my machine)
`,

  'git blame': () => `It's always DNS. Or cache. Clear your cache.`,

  'git push': () => `Everything up-to-date (your career is already pushed to production!)`,

  npm: () => `
npm commands available:
  npm install   - Install dependencies
  npm start     - Start the dev server
  npm run build - Build for production
  npm audit     - Check for vulnerabilities

Pro tip: This portfolio was built with npm! 📦
`,

  'npm install': () => `
added 420 packages, removed 69 vulnerabilities

   ╭──────────────────────────────────────────╮
   │                                          │
   │   Successfully installed dependencies!   │
   │                                          │
   │   Now run: npm run hire-ghulam              │
   │                                          │
   ╰──────────────────────────────────────────╯
`,

  'npm start': () => `
> portfolio@1.0.0 start
> astro dev

  🚀 Server running at http://localhost:4321

  Wait... you're already here! 🎉
`,

  'npm run build': () => `
> portfolio@1.0.0 build
> astro build

✓ Built in 4.20s
✓ 69 pages generated
✓ 0 errors (because Ghulam writes clean code)
`,

  man: () => `
What manual page do you want?

Try:
  man ghulam        - Learn about me
  man portfolio  - About this site
  man life       - The meaning of it all
`,

  'man ghulam': () => commands.about(),
  'man portfolio': () => `
PORTFOLIO(1)              Ghulam's Documentation              PORTFOLIO(1)

NAME
       portfolio - An interactive developer portfolio

SYNOPSIS
       portfolio [--hire-me] [--view-projects] [--contact]

DESCRIPTION
       A cutting-edge portfolio built with Astro, React, Three.js,
       and way too much coffee. Features an interactive terminal
       (you're using it!), 3D animations, and actual useful content.

AUTHOR
       Written by Ghulam Haider with assistance from AI and caffeine.

SEE ALSO
       about(1), skills(1), projects(1), contact(1)
`,

  'man life': () => `
The meaning of life is... 42.
Also: coffee, coding, and continuous learning.
`,

  vim: () => `
~
~
~                    VIM - Vi IMproved
~
~                    type :q! to exit
~                    (good luck with that)
~
~                    Or just use VS Code like a normal person 😉
~
`,

  nano: () => `GNU nano is nice but have you tried VS Code?`,
  emacs: () => `Emacs? I see you like to live dangerously. VS Code gang here.`,
  code: () => `VS Code is already open in another dimension where I'm writing more code.`,

  'rm -rf /': () => `
Nice try! 🛡️

sudo rm -rf / --no-preserve-root
Password: ********
rm: cannot remove '/': Permission denied

(This portfolio has plot armor)
`,

  rm: () => `rm: missing operand\nTry 'rm -rf /' for fun... just kidding, don't.`,

  exit: () => `
Logout? But you just got here! 😢

Here are some reasons to stay:
  • Free coffee (virtually)
  • Great conversation
  • No ads
  • Cool 3D graphics

Type 'stay' to remain or just close the tab (but please don't).
`,

  stay: () => `Yay! Thanks for staying! 🎉 Type 'help' to explore more.`,
  quit: () => commands.exit(),
  logout: () => commands.exit(),

  history: () => `
    1  help
    2  about
    3  skills
    4  sudo rm -rf /
    5  why isn't this working
    6  stackoverflow please help
    7  it works now (no idea why)
    8  coffee
    9  git push --force (oops)
   10  history

(Your actual command history is stored locally in this session)
`,

  echo: () => `echo what? Try: echo hello`,
  'echo hello': () => `hello`,
  'echo $PATH': () => `/usr/local/bin:/usr/bin:/bin:/home/ghulam/scripts:/road/to/success`,
  'echo $HOME': () => `/home/ghulam (but Lahore, Pakistan IRL 🏠)`,

  cowsay: () => `
 _______________________________________
< Hire Ghulam! He's mass cool. >
 ---------------------------------------
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||
`,

  fortune: () => {
    const fortunes = [
      "A great developer is in your future... oh wait, you found one!",
      "The code you seek is closer than you think. Try 'projects'.",
      "Coffee in your past, code in your future.",
      "You will hire an excellent developer today. (hint: type 'contact')",
      "A wise developer once said: 'It works on my machine.'",
      "Your lucky numbers are: 127.0.0.1",
      "The bug is not in the code, it's in the requirements.",
      "Ctrl+C Ctrl+V is not a sin, it's efficiency.",
    ];
    return fortunes[Math.floor(Math.random() * fortunes.length)];
  },

  sl: () => `
      ====        ________                ___________
  _D _|  |_______/        \\__I_I_____===__|_________|
   |(_)---  |   H\\________/ |   |        =|___ ___|
   /     |  |   H  |  |     |   |         ||_| |_||
  |      |  |   H  |__--------------------| [___] |
  | ________|___H__/__|_____/[][]~\\_______|       |
  |/ |   |-----------I_____I [][] []  D   |=======|__

Choo choo! 🚂 (You typed 'sl' instead of 'ls')
`,

  ssh: () => `ssh: connect to host awesome-company.com port 22: Connection established
Welcome! You've successfully SSH'd into my portfolio.
Type 'help' for available commands.`,

  chmod: () => `chmod: changing permissions of 'portfolio': Operation awesome`,
  chown: () => `chown: changing ownership to 'you': Welcome aboard!`,

  grep: () => `Usage: grep <pattern>
Try: grep skills | grep awesome | grep hire`,
  'grep skills': () => commands.skills(),
  'grep awesome': () => `Found 420 instances of 'awesome' in Ghulam's portfolio.`,
  'grep hire': () => `Found 1 perfect candidate. Type 'contact' to proceed.`,

  whoami: () => `You are a visitor exploring Ghulam Haider's portfolio.
Or are you a recruiter? A potential collaborator?
Either way, welcome! 👋`,

  sudo: () => `[sudo] password for user: ********
Sorry, user is not in the sudoers file. This incident will be reported.

Just kidding! But nice try getting root access. 🔒`,

  'sudo su': () => commands.sudo(),
  'sudo -i': () => commands.sudo(),
  su: () => `su: Authentication failure (you're not root here!)`,

  touch: () => `touch: cannot touch 'file': This is a read-only portfolio 📖`,
  mkdir: () => `mkdir: cannot create directory: You can look but not touch!`,

  brew: () => `
==> Formulae
ghulam-haider ✓ (installed, great choice!)
coffee        ✓ (essential dependency)
creativity    ✓ (auto-updated daily)

Already up-to-date. ☕
`,

  apt: () => `
Reading package lists... Done
Building dependency tree... Done
The following NEW packages will be installed:
  ghulam-haider-developer (1.0.0)

Do you want to continue? [Y/n] Y

Setting up ghulam-haider-developer... Done!
Type 'contact' to initialize.
`,

  'apt-get': () => commands.apt(),
  yum: () => commands.apt(),

  python: () => `
Python 3.11.0 (main, Oct 24 2022, 00:00:00)
>>> print("Hello from Ghulam's portfolio!")
Hello from Ghulam's portfolio!
>>> exit()

(Not a real Python shell, but I do know Python! 🐍)
`,

  node: () => `
Welcome to Node.js v20.0.0.
> console.log("Ghulam is awesome");
Ghulam is awesome
undefined
> process.exit()

(This portfolio was built with Node! 💚)
`,

  docker: () => `
CONTAINER ID   IMAGE              STATUS          NAMES
a1b2c3d4e5f6   ghulam/portfolio      Up 15 years     career
b2c3d4e5f6g7   ghulam/skills         Up 15 years     expertise
c3d4e5f6g7h8   ghulam/creativity     Always running  innovation

All systems operational! 🐳
`,

  'docker ps': () => commands.docker(),

  make: () => `
make: *** No targets specified and no makefile found.

Try: make coffee | make money | make sense
`,

  'make coffee': () => `☕ Brewing... Done! Coffee is ready.`,
  'make money': () => `💰 Error: Requires 'job' dependency. Type 'contact' to install.`,
  'make sense': () => `🧠 Compiling... Warning: Life rarely makes sense. Continuing anyway.`,

  weather: () => `
Current weather in Lahore, Pakistan:

  ☀️  Sunny  (probably)
  🌡️  Hot    (it's Texas)
  💨  Wind   (occasional)
  🌧️  Rain   (rare but dramatic)

Forecast: 100% chance of great code being written.
`,

  time: () => commands.date(),

  lsof: () => `
COMMAND   PID   USER   FD   TYPE   NAME
vscode    420   ghulam    cwd  DIR    /projects
chrome    421   ghulam    cwd  DIR    /stackoverflow
spotify   422   ghulam    cwd  DIR    /focus-music
slack     423   ghulam    cwd  DIR    /procrastination

(All the tools of a modern developer)
`,

  df: () => `
Filesystem     1K-blocks    Used Available Use% Mounted on
/dev/brain     unlimited    85%   infinite  -   /knowledge
/dev/coffee        500ml   100%       0ml 100%  /energy
/dev/skills    unlimited    70%   infinite  -   /career

Warning: /dev/coffee is full. Refill recommended. ☕
`,

  free: () => `
              total        used        free      shared  buff/cache   available
Mem:       16777216     8388608     4194304     2097152     4194304     6291456
Swap:       8388608           0     8388608

Translation: Brain memory is fine, but could always use more coffee.
`,

  uname: () => `Darwin Ghulam-MacBook-Pro 23.0.0 Darwin Kernel Version 23.0.0 arm64`,
  'uname -a': () => commands.uname(),

  hostname: () => `ghulam-portfolio.local`,

  which: () => `Usage: which <command>\nTry: which ghulam`,
  'which ghulam': () => `/usr/local/bin/awesome-developer`,
  'which coffee': () => `/dev/essential`,

  alias: () => `
alias ll='ls -la'
alias please='sudo'
alias yolo='git push --force'
alias coffee='echo "☕ Here you go!"'
alias hire='contact'
`,

  please: () => commands.sudo(),

  yes: () => `y
y
y
y
(yes, Ghulam is hireable. Type 'contact')`,

  no: () => `no? But you haven't even seen my projects yet! Type 'projects' first.`,

  lolcat: () => `🌈 R A I N B O W   T E X T 🌈
(imagine this is colorful)`,

  figlet: () => `
 _                  _         _                   __ _
| |    ___  ___    / \\   ___| |__   ___ _ __ __ _ / _| |_
| |   / _ \\/ _ \\  / _ \\ / __| '_ \\ / __| '__/ _\` | |_| __|
| |__|  __/ (_) |/ ___ \\\\__ \\ | | | (__| | | (_| |  _| |_
|_____\\___|\\___//_/   \\_\\___/_| |_|\\___|_|  \\__,_|_|  \\__|
`,

  cmatrix: () => commands.matrix(),

  screenfetch: () => commands.neofetch(),

  // Additional Linux commands
  ln: () => `ln: creating symbolic link: Permission denied
(This portfolio doesn't support shortcuts - explore it all!)`,

  less: () => `
:: Ghulam's Portfolio (press q to quit, j/k to scroll) ::

Just kidding - scroll works normally here!
Type 'about' to learn more about me.`,

  more: () => commands.less(),

  tar: () => `
tar: extracting ghulam-portfolio.tar.gz...
x about/
x skills/
x experience/
x projects/
x contact/

Done! All content extracted. Type 'help' to explore.`,

  'tar -xvf': () => commands.tar(),
  'tar -xzf': () => commands.tar(),

  head: () => `
==> portfolio.txt <==
Ghulam Haider
Full Stack Developer
17+ years of experience
...

Use 'about' for the full story!`,

  'head -n': () => commands.head(),

  tail: () => `
==> career.log <==
...
2023: Still coding
2024: Still coding
2025: You guessed it - still coding!

The journey continues... Type 'experience' for details.`,

  'tail -f': () => `Following /var/log/portfolio.log... (Ctrl+C to stop)
[INFO] Visitor detected
[INFO] Loading awesome content
[INFO] Preparing to impress
[SUCCESS] Portfolio rendered successfully`,

  diff: () => `
diff --git a/junior-dev.txt b/senior-dev.txt
- console.log("it works!")
+ // Proper logging with context
+ logger.info("Operation completed", { status: "success" })

- // TODO: fix later
+ // Comprehensive error handling implemented

Type 'experience' to see my growth!`,

  cmp: () => `cmp: ghulam.txt and awesome-developer.txt are identical`,

  comm: () => `
Common skills across all my jobs:
  Problem Solving
  Clean Code
  Coffee Consumption
  Learning New Things`,

  sort: () => `
Sorting Ghulam's priorities...
1. Quality Code
2. User Experience
3. Team Collaboration
4. Coffee
5. More Coffee`,

  export: () => `
export PATH=$PATH:/road/to/success
export DEVELOPER="Ghulam Haider"
export COFFEE_LEVEL="maximum"
export HIRE_ME="yes please"

Environment configured for success! 🚀`,

  zip: () => `
  adding: skills.txt (deflated 0% - too valuable to compress)
  adding: experience.txt (deflated 0% - years of learning)
  adding: projects.txt (deflated 0% - quality work)

Created: ghulam-haider-portfolio.zip`,

  unzip: () => `
Archive:  ghulam-haider-portfolio.zip
  inflating: skills.txt
  inflating: experience.txt
  inflating: projects.txt
  inflating: awesome.txt
  inflating: hire-me.txt

Done! Type 'help' to explore contents.`,

  service: () => `
● portfolio.service - Ghulam's Portfolio Service
     Loaded: loaded (/etc/systemd/system/portfolio.service; enabled)
     Active: active (running) since forever
   Main PID: 1337 (node)
     Memory: Lots of coffee
        CPU: 100% dedication

Service is running smoothly! 🟢`,

  'service status': () => commands.service(),
  systemctl: () => commands.service(),

  kill: () => `kill: cannot kill process 1337 (portfolio): It's immortal!`,
  killall: () => `killall: no process found worth killing (except bugs)`,
  'kill -9': () => commands.kill(),

  mount: () => `
/dev/skills    on /career      type awesome (rw,relatime)
/dev/coffee    on /energy      type caffeine (rw,essential)
/dev/projects  on /portfolio   type showcase (ro,impressive)

All filesystems mounted and ready!`,

  traceroute: () => `
traceroute to success (Career Path)
 1  education.local (School) 0.001 ms
 2  first-job.net (Learning) 0.002 ms
 3  experience.io (Growing) 0.003 ms
 4  senior-dev.com (Leading) 0.004 ms
 5  your-company.com (Next?) 0.005 ms

Type 'contact' to complete the route!`,

  ufw: () => `
Status: active

To                         Action      From
--                         ------      ----
22/tcp (SSH)               ALLOW       Anywhere
80/tcp (HTTP)              ALLOW       Anywhere
443/tcp (HTTPS)            ALLOW       Anywhere
Spam                       DENY        Everywhere
Bugs                       DENY        Everywhere

Firewall protecting quality code! 🛡️`,

  iptables: () => commands.ufw(),

  pacman: () => `
:: Synchronizing package databases...
 core is up to date
 extra is up to date
 community is up to date

:: ghulam-haider is up to date. No upgrade needed.
   (Already running latest version of awesome)`,

  rpm: () => `
ghulam-haider-1.0.0-1.x86_64
  Installed: Yes
  Size: Immeasurable talent
  Summary: Full Stack Developer
  License: Open to opportunities`,

  cal: () => {
    const now = new Date();
    const month = now.toLocaleString('default', { month: 'long' });
    const year = now.getFullYear();
    return `
      ${month} ${year}
 Su Mo Tu We Th Fr Sa
        1  2  3  4  5
  6  7  8  9 10 11 12
 13 14 15 16 17 18 19
 20 21 22 23 24 25 26
 27 28 29 30 31

Best day to hire Ghulam: TODAY ⭐`;
  },

  dd: () => `
dd: creating bootable career...
1337+0 records in
1337+0 records out
69420 bytes (69 kB) copied, 0.42 s, 165 kB/s

Career successfully written to /dev/success! 🚀`,

  whereis: () => `
whereis ghulam
ghulam: /home/dallas-fort-worth /usr/local/bin/developer /career/success`,

  'whereis ghulam': () => commands.whereis(),

  whatis: () => `
whatis ghulam
ghulam (1)              - Full Stack Developer, problem solver, coffee enthusiast`,

  'whatis ghulam': () => commands.whatis(),

  useradd: () => `useradd: cannot create user: This is a portfolio, not a server!
But I can add YOU to my network - type 'contact'!`,

  usermod: () => `usermod: modifying user 'visitor' to 'potential-employer'... Done!`,

  passwd: () => `
Changing password for user ghulam.
Current password: ********
New password: ********
Retype new password: ********
passwd: password updated successfully

(The secret password is: "hire-ghulam" 🤫)`,

  mv: () => `mv: cannot move files in a portfolio
(But I can move mountains with code!)`,

  cp: () => `cp: cannot copy portfolio - it's one of a kind! ✨`,

  env: () => `
USER=ghulam
HOME=/home/ghulam
SHELL=/bin/zsh
EDITOR=code
COFFEE=essential
STATUS=hireable
MOOD=caffeinated`,

  printenv: () => commands.env(),

  id: () => `uid=1337(ghulam) gid=1337(developers) groups=1337(developers),420(coffee-lovers),69(nice)`,

  groups: () => `ghulam : developers coffee-lovers nice problem-solvers`,

  clear: () => 'CLEAR',
};

export default function InteractiveTerminal() {
  const [isMobile, setIsMobile] = useState(false);

  const [output, setOutput] = useState<OutputLine[]>([]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [windowState, setWindowState] = useState<'normal' | 'minimized' | 'maximized' | 'closed'>('normal');
  const [isAnimating, setIsAnimating] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Detect mobile and set initial ASCII art
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Set initial output after mobile detection
  useEffect(() => {
    const art = isMobile ? ASCII_ART_MOBILE : ASCII_ART_DESKTOP;
    setOutput([{ type: 'ascii', content: art }]);
  }, [isMobile]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [output]);

  // Auto-focus input when terminal scrolls into view (desktop only)
  // But not when navigating to other sections via hash links
  useEffect(() => {
    if (isMobile) return;

    const terminal = terminalRef.current?.parentElement;
    if (!terminal) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && windowState === 'normal') {
            // Don't steal focus if user is navigating to a different section
            const hash = window.location.hash;
            if (hash && hash !== '#terminal' && hash !== '') {
              return;
            }
            inputRef.current?.focus();
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(terminal);
    return () => observer.disconnect();
  }, [windowState, isMobile]);

  // Focus input on click
  const focusInput = () => {
    inputRef.current?.focus();
  };

  // Window control handlers
  const handleClose = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setWindowState('closed');
    setTimeout(() => {
      setIsAnimating(false);
      // Reopen after a moment
      setTimeout(() => {
        setWindowState('normal');
        const art = window.innerWidth < 640 ? ASCII_ART_MOBILE : ASCII_ART_DESKTOP;
        setOutput([{ type: 'ascii', content: art + '\n\n  🔴 Nice try! This terminal is immortal. 😄' }]);
      }, 1500);
    }, 500);
  };

  const handleMinimize = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    if (windowState === 'minimized') {
      setWindowState('normal');
      setTimeout(() => setIsAnimating(false), 300);
    } else {
      setWindowState('minimized');
      setTimeout(() => setIsAnimating(false), 300);
    }
  };

  const handleMaximize = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    if (windowState === 'maximized') {
      setWindowState('normal');
    } else {
      setWindowState('maximized');
    }
    setTimeout(() => setIsAnimating(false), 300);
  };

  const runDevAnimation = () => {
    const frames = [
      `
  ██████╗ ███████╗██╗   ██╗
  ██╔══██╗██╔════╝██║   ██║
  ██║  ██║█████╗  ██║   ██║
  ██║  ██║██╔══╝  ╚██╗ ██╔╝
  ██████╔╝███████╗ ╚████╔╝
  ╚═════╝ ╚══════╝  ╚═══╝

  [▓░░░░░░░░░] 10%  Loading dependencies...`,
      `
  ██████╗ ███████╗██╗   ██╗
  ██╔══██╗██╔════╝██║   ██║
  ██║  ██║█████╗  ██║   ██║
  ██║  ██║██╔══╝  ╚██╗ ██╔╝
  ██████╔╝███████╗ ╚████╔╝
  ╚═════╝ ╚══════╝  ╚═══╝

  [▓▓▓░░░░░░░] 30%  Compiling assets...`,
      `
  ██████╗ ███████╗██╗   ██╗
  ██╔══██╗██╔════╝██║   ██║
  ██║  ██║█████╗  ██║   ██║
  ██║  ██║██╔══╝  ╚██╗ ██╔╝
  ██████╔╝███████╗ ╚████╔╝
  ╚═════╝ ╚══════╝  ╚═══╝

  [▓▓▓▓▓░░░░░] 50%  Building modules...`,
      `
  ██████╗ ███████╗██╗   ██╗
  ██╔══██╗██╔════╝██║   ██║
  ██║  ██║█████╗  ██║   ██║
  ██║  ██║██╔══╝  ╚██╗ ██╔╝
  ██████╔╝███████╗ ╚████╔╝
  ╚═════╝ ╚══════╝  ╚═══╝

  [▓▓▓▓▓▓▓░░░] 70%  Optimizing...`,
      `
  ██████╗ ███████╗██╗   ██╗
  ██╔══██╗██╔════╝██║   ██║
  ██║  ██║█████╗  ██║   ██║
  ██║  ██║██╔══╝  ╚██╗ ██╔╝
  ██████╔╝███████╗ ╚████╔╝
  ╚═════╝ ╚══════╝  ╚═══╝

  [▓▓▓▓▓▓▓▓▓░] 90%  Almost there...`,
      `
  ██████╗ ███████╗██╗   ██╗
  ██╔══██╗██╔════╝██║   ██║
  ██║  ██║█████╗  ██║   ██║
  ██║  ██║██╔══╝  ╚██╗ ██╔╝
  ██████╔╝███████╗ ╚████╔╝
  ╚═════╝ ╚══════╝  ╚═══╝

  [▓▓▓▓▓▓▓▓▓▓] 100% Complete!

  ✨ Development mode activated!
  🚀 Ready to build amazing things.

  Type 'projects' to see what I've built.`,
    ];

    let frameIndex = 0;
    setOutput((prev) => [...prev, { type: 'ascii', content: frames[0] }]);

    const interval = setInterval(() => {
      frameIndex++;
      if (frameIndex >= frames.length) {
        clearInterval(interval);
        return;
      }
      setOutput((prev) => {
        const newOutput = [...prev];
        newOutput[newOutput.length - 1] = { type: 'ascii', content: frames[frameIndex] };
        return newOutput;
      });
    }, 400);
  };

  const runShutdownAnimation = () => {
    const frames = [
      `Broadcast message from ghulam@portfolio:

  The system is going down for shutdown NOW!`,
      `Broadcast message from ghulam@portfolio:

  The system is going down for shutdown NOW!

  [    ] Stopping services...`,
      `Broadcast message from ghulam@portfolio:

  The system is going down for shutdown NOW!

  [ OK ] Stopping services...
  [    ] Saving session data...`,
      `Broadcast message from ghulam@portfolio:

  The system is going down for shutdown NOW!

  [ OK ] Stopping services...
  [ OK ] Saving session data...
  [    ] Unmounting filesystems...`,
      `Broadcast message from ghulam@portfolio:

  The system is going down for shutdown NOW!

  [ OK ] Stopping services...
  [ OK ] Saving session data...
  [ OK ] Unmounting filesystems...
  [    ] Powering off...`,
      `Broadcast message from ghulam@portfolio:

  The system is going down for shutdown NOW!

  [ OK ] Stopping services...
  [ OK ] Saving session data...
  [ OK ] Unmounting filesystems...
  [ OK ] Powering off...


  ███████╗██╗  ██╗██╗   ██╗████████╗██████╗  ██████╗ ██╗    ██╗███╗   ██╗
  ██╔════╝██║  ██║██║   ██║╚══██╔══╝██╔══██╗██╔═══██╗██║    ██║████╗  ██║
  ███████╗███████║██║   ██║   ██║   ██║  ██║██║   ██║██║ █╗ ██║██╔██╗ ██║
  ╚════██║██╔══██║██║   ██║   ██║   ██║  ██║██║   ██║██║███╗██║██║╚██╗██║
  ███████║██║  ██║╚██████╔╝   ██║   ██████╔╝╚██████╔╝╚███╔███╔╝██║ ╚████║
  ╚══════╝╚═╝  ╚═╝ ╚═════╝    ╚═╝   ╚═════╝  ╚═════╝  ╚══╝╚══╝ ╚═╝  ╚═══╝

  Just kidding! You can't shut down a portfolio.
  Type 'clear' to start fresh instead. 😄`,
    ];

    let frameIndex = 0;
    setOutput((prev) => [...prev, { type: 'output', content: frames[0] }]);

    const interval = setInterval(() => {
      frameIndex++;
      if (frameIndex >= frames.length) {
        clearInterval(interval);
        return;
      }
      setOutput((prev) => {
        const newOutput = [...prev];
        newOutput[newOutput.length - 1] = { type: 'output', content: frames[frameIndex] };
        return newOutput;
      });
    }, 500);
  };

  const runRestartAnimation = () => {
    const frames = [
      `Broadcast message from ghulam@portfolio:

  The system is going down for reboot NOW!`,
      `  [ OK ] Stopping services...
  [    ] Saving state...`,
      `  [ OK ] Stopping services...
  [ OK ] Saving state...
  [    ] Restarting...`,
      `
  ██████╗ ███████╗██████╗  ██████╗  ██████╗ ████████╗██╗███╗   ██╗ ██████╗
  ██╔══██╗██╔════╝██╔══██╗██╔═══██╗██╔═══██╗╚══██╔══╝██║████╗  ██║██╔════╝
  ██████╔╝█████╗  ██████╔╝██║   ██║██║   ██║   ██║   ██║██╔██╗ ██║██║  ███╗
  ██╔══██╗██╔══╝  ██╔══██╗██║   ██║██║   ██║   ██║   ██║██║╚██╗██║██║   ██║
  ██║  ██║███████╗██████╔╝╚██████╔╝╚██████╔╝   ██║   ██║██║ ╚████║╚██████╔╝
  ╚═╝  ╚═╝╚══════╝╚═════╝  ╚═════╝  ╚═════╝    ╚═╝   ╚═╝╚═╝  ╚═══╝ ╚═════╝

  .`,
      `
  ██████╗ ███████╗██████╗  ██████╗  ██████╗ ████████╗██╗███╗   ██╗ ██████╗
  ██╔══██╗██╔════╝██╔══██╗██╔═══██╗██╔═══██╗╚══██╔══╝██║████╗  ██║██╔════╝
  ██████╔╝█████╗  ██████╔╝██║   ██║██║   ██║   ██║   ██║██╔██╗ ██║██║  ███╗
  ██╔══██╗██╔══╝  ██╔══██╗██║   ██║██║   ██║   ██║   ██║██║╚██╗██║██║   ██║
  ██║  ██║███████╗██████╔╝╚██████╔╝╚██████╔╝   ██║   ██║██║ ╚████║╚██████╔╝
  ╚═╝  ╚═╝╚══════╝╚═════╝  ╚═════╝  ╚═════╝    ╚═╝   ╚═╝╚═╝  ╚═══╝ ╚═════╝

  . .`,
      `
  ██████╗ ███████╗██████╗  ██████╗  ██████╗ ████████╗██╗███╗   ██╗ ██████╗
  ██╔══██╗██╔════╝██╔══██╗██╔═══██╗██╔═══██╗╚══██╔══╝██║████╗  ██║██╔════╝
  ██████╔╝█████╗  ██████╔╝██║   ██║██║   ██║   ██║   ██║██╔██╗ ██║██║  ███╗
  ██╔══██╗██╔══╝  ██╔══██╗██║   ██║██║   ██║   ██║   ██║██║╚██╗██║██║   ██║
  ██║  ██║███████╗██████╔╝╚██████╔╝╚██████╔╝   ██║   ██║██║ ╚████║╚██████╔╝
  ╚═╝  ╚═╝╚══════╝╚═════╝  ╚═════╝  ╚═════╝    ╚═╝   ╚═╝╚═╝  ╚═══╝ ╚═════╝

  . . .`,
    ];

    let frameIndex = 0;
    setOutput((prev) => [...prev, { type: 'output', content: frames[0] }]);

    const interval = setInterval(() => {
      frameIndex++;
      if (frameIndex >= frames.length) {
        clearInterval(interval);
        // Clear and show welcome after animation
        setTimeout(() => {
          const art = window.innerWidth < 640 ? ASCII_ART_MOBILE : ASCII_ART_DESKTOP;
          setOutput([{ type: 'ascii', content: art + '\n\n  ✨ System restarted! Welcome back.' }]);
        }, 500);
        return;
      }
      setOutput((prev) => {
        const newOutput = [...prev];
        newOutput[newOutput.length - 1] = { type: 'output', content: frames[frameIndex] };
        return newOutput;
      });
    }, 400);
  };

  const runNpmDevAnimation = () => {
    const frames = [
      `
> ghulam-portfolio@1.0.0 dev
> next dev

  ▲ Next.js 14.0.0`,
      `
> ghulam-portfolio@1.0.0 dev
> next dev

  ▲ Next.js 14.0.0
  - Local:        http://localhost:3000

  ✓ Ready in 420ms`,
      `
> ghulam-portfolio@1.0.0 dev
> next dev

  ▲ Next.js 14.0.0
  - Local:        http://localhost:3000

  ✓ Ready in 420ms
  ○ Compiling / ...`,
      `
> ghulam-portfolio@1.0.0 dev
> next dev

  ▲ Next.js 14.0.0
  - Local:        http://localhost:3000

  ✓ Ready in 420ms
  ✓ Compiled / in 1337ms`,
      `
> ghulam-portfolio@1.0.0 dev
> next dev

  ▲ Next.js 14.0.0
  - Local:        http://localhost:3000

  ✓ Ready in 420ms
  ✓ Compiled / in 1337ms

  ┌─────────────────────────────────────────────────────┐
  │                                                     │
  │   🚀 Portfolio is already running!                  │
  │                                                     │
  │   You're looking at it right now.                   │
  │   Pretty meta, huh?                                 │
  │                                                     │
  │   Type 'projects' to see what I've built.           │
  │                                                     │
  └─────────────────────────────────────────────────────┘`,
    ];

    let frameIndex = 0;
    setOutput((prev) => [...prev, { type: 'output', content: frames[0] }]);

    const interval = setInterval(() => {
      frameIndex++;
      if (frameIndex >= frames.length) {
        clearInterval(interval);
        return;
      }
      setOutput((prev) => {
        const newOutput = [...prev];
        newOutput[newOutput.length - 1] = { type: 'output', content: frames[frameIndex] };
        return newOutput;
      });
    }, 350);
  };

  const runQuitAnimation = () => {
    const frames = [
      `Quitting...`,
      `Quitting...

  Wait, you're leaving already?`,
      `Quitting...

  Wait, you're leaving already?

  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░`,
      `Quitting...

  Wait, you're leaving already?

  ▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░░░░░░░░░░░░`,
      `Quitting...

  Wait, you're leaving already?

  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░░`,
      `Quitting...

  Wait, you're leaving already?

  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░`,
      `Quitting...

  Wait, you're leaving already?

  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓`,
      `
   ██████╗ ██╗   ██╗██╗████████╗██████╗
  ██╔═══██╗██║   ██║██║╚══██╔══╝╚════██╗
  ██║   ██║██║   ██║██║   ██║    █████╔╝
  ██║▄▄ ██║██║   ██║██║   ██║   ██╔═══╝
  ╚██████╔╝╚██████╔╝██║   ██║   ███████╗
   ╚══▀▀═╝  ╚═════╝ ╚═╝   ╚═╝   ╚══════╝

  ┌────────────────────────────────────────┐
  │                                        │
  │  ❌ ERROR: Cannot quit portfolio       │
  │                                        │
  │  You're trapped here forever...        │
  │                                        │
  │  Just kidding! But seriously,          │
  │  there's no escape from my awesomeness │
  │                                        │
  │  Type 'contact' to hire me instead! 😄 │
  │                                        │
  └────────────────────────────────────────┘`,
    ];

    let frameIndex = 0;
    setOutput((prev) => [...prev, { type: 'output', content: frames[0] }]);

    const interval = setInterval(() => {
      frameIndex++;
      if (frameIndex >= frames.length) {
        clearInterval(interval);
        return;
      }
      setOutput((prev) => {
        const newOutput = [...prev];
        newOutput[newOutput.length - 1] = { type: 'output', content: frames[frameIndex] };
        return newOutput;
      });
    }, 300);
  };

  const executeCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();

    if (!trimmedCmd) return;

    // Add to output
    setOutput((prev) => [...prev, { type: 'input', content: `$ ${cmd}` }]);

    // Add to history
    setHistory((prev) => [...prev, trimmedCmd]);
    setHistoryIndex(-1);

    // Execute command
    if (trimmedCmd === 'clear') {
      const art = isMobile ? ASCII_ART_MOBILE : ASCII_ART_DESKTOP;
      setOutput([{ type: 'ascii', content: art }]);
      return;
    }

    if (trimmedCmd === 'dev') {
      runDevAnimation();
      return;
    }

    if (trimmedCmd === 'shutdown' || trimmedCmd === 'poweroff' || trimmedCmd === 'halt') {
      runShutdownAnimation();
      return;
    }

    if (trimmedCmd === 'restart' || trimmedCmd === 'reboot') {
      runRestartAnimation();
      return;
    }

    if (trimmedCmd === 'npm run dev' || trimmedCmd === 'npm start' || trimmedCmd === 'npm dev' || trimmedCmd === 'yarn dev' || trimmedCmd === 'pnpm dev') {
      runNpmDevAnimation();
      return;
    }

    if (trimmedCmd === 'q' || trimmedCmd === 'quit' || trimmedCmd === 'exit' || trimmedCmd === ':q' || trimmedCmd === ':q!' || trimmedCmd === ':wq') {
      runQuitAnimation();
      return;
    }

    if (trimmedCmd === 'resume' || trimmedCmd === 'cv') {
      window.open(profile.resumeUrl, '_blank');
    }

    const commandFn = commands[trimmedCmd];
    if (commandFn) {
      const result = commandFn();
      setOutput((prev) => [...prev, { type: 'output', content: result }]);
    } else {
      setOutput((prev) => [
        ...prev,
        {
          type: 'error',
          content: `Command not found: ${trimmedCmd}\nType 'help' for available commands.`,
        },
      ]);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const newIndex =
          historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(history[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= history.length) {
          setHistoryIndex(-1);
          setInput('');
        } else {
          setHistoryIndex(newIndex);
          setInput(history[newIndex]);
        }
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      // Simple tab completion
      const commandNames = Object.keys(commands);
      const matches = commandNames.filter((cmd) =>
        cmd.startsWith(input.toLowerCase())
      );
      if (matches.length === 1) {
        setInput(matches[0]);
      } else if (matches.length > 1) {
        setOutput((prev) => [
          ...prev,
          { type: 'output', content: `Suggestions: ${matches.join(', ')}` },
        ]);
      }
    }
  };

  const getTerminalClasses = () => {
    const baseClasses = "terminal max-w-3xl mx-auto shadow-2xl transition-all duration-300 ease-in-out";
    switch (windowState) {
      case 'closed':
        return `${baseClasses} scale-0 opacity-0`;
      case 'maximized':
        return `${baseClasses} fixed inset-4 max-w-none z-50`;
      default:
        return baseClasses;
    }
  };

  return (
    <div
      className={getTerminalClasses()}
      onClick={focusInput}
      role="application"
      aria-label="Interactive terminal"
    >
      {/* Terminal Header */}
      <div className="terminal-header">
        <button
          className="terminal-dot red cursor-pointer hover:brightness-125 transition-all hover:scale-110"
          aria-label="Close terminal"
          onClick={(e) => { e.stopPropagation(); handleClose(); }}
        />
        <button
          className="terminal-dot yellow cursor-pointer hover:brightness-125 transition-all hover:scale-110"
          aria-label="Minimize terminal"
          onClick={(e) => { e.stopPropagation(); handleMinimize(); }}
        />
        <button
          className="terminal-dot green cursor-pointer hover:brightness-125 transition-all hover:scale-110"
          aria-label="Maximize terminal"
          onClick={(e) => { e.stopPropagation(); handleMaximize(); }}
        />
        <span className="ml-4 text-gray-400 text-sm font-mono">
          ghulam@portfolio ~ {windowState === 'maximized' && '(fullscreen)'}{windowState === 'minimized' && '(minimized - click yellow to restore)'}
        </span>
      </div>

      {/* Terminal Body */}
      {windowState !== 'minimized' && (
        <div
          ref={terminalRef}
          className={`terminal-body text-sm transition-all duration-300 ${
            windowState === 'maximized' ? 'h-[calc(100vh-8rem)]' : ''
          }`}
          role="log"
          aria-live="polite"
        >
        {output.map((line, i) => (
          <div
            key={i}
            className={`mb-2 whitespace-pre-wrap font-mono ${
              line.type === 'input'
                ? 'text-neon-green'
                : line.type === 'error'
                  ? 'text-red-400'
                  : line.type === 'ascii'
                    ? 'text-neon-cyan'
                    : 'text-gray-300'
            }`}
          >
            {line.content}
          </div>
        ))}

        {/* Input Line */}
        <div className="terminal-line">
          <span className="terminal-prompt">$</span>
          <div className="relative flex-1 flex items-center">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="terminal-input caret-transparent"
              placeholder=""
              aria-label="Terminal input"
              autoComplete="off"
              spellCheck={false}
            />
            {/* Overlay to show text with cursor */}
            <div className="absolute inset-0 pointer-events-none flex items-center font-mono text-gray-100">
              <span>{input}</span>
              <span className="terminal-cursor" aria-hidden="true" />
              {!input && <span className="text-gray-400 ml-0">Type a command...</span>}
            </div>
          </div>
        </div>
        </div>
      )}
    </div>
  );
}
