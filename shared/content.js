export const profile = {
  name: "Adarsh Singh",
  firstName: "Adarsh",
  lastName: "Singh",
  role: "Software engineer",
  location: "Noida, Uttar Pradesh",
  email: "adarsh.singh1768@gmail.com",
  phone: "+91 92771 97998",
  phoneHref: "tel:+919277197998",
  github: "https://github.com/adarshsingh-01",
  githubHandle: "adarshsingh-01",
  linkedin: "https://www.linkedin.com/in/adarshsingh",
  resume: "/AdarshResume.pdf",
  avatar: "/adarsh.jpeg",
  availability: "Software engineer at TCS, Noida",
  summary:
    "I am a software engineer at Tata Consultancy Services in Noida. I build React and Node systems, including LedgerLoop, and I have evaluated how AI models behave at Outlier.",
};

export const marquee = [
  "React",
  "Node.js",
  "Express",
  "MongoDB",
  "PostgreSQL",
  "Docker",
  "Kafka",
  "JavaScript",
  "Python",
  "PyTorch",
  "TensorFlow",
  "Git",
];

export const experience = [
  {
    org: "Tata Consultancy Services",
    role: "Software Engineer",
    dates: "July 2026 – Present",
    points: [
      "Contribute to development and maintenance by shipping improvements, debugging defects, and making enterprise applications more reliable.",
      "Trace complex issues through systematic debugging, log analysis, and root-cause investigation.",
      "Run functional tests, validate changes, and check edge cases so the software stays stable and easier to maintain.",
      "Work with cross-functional teams on requirements, troubleshooting, and fixes that follow established engineering practice.",
    ],
  },
  {
    org: "Outlier AI",
    role: "AI Training Expert",
    dates: "January 2025 – April 2025",
    points: [
      "Evaluated model outputs for accuracy, reasoning quality, and instruction adherence across different scenarios.",
      "Designed prompts and structured test cases that made responses more reliable.",
      "Found inconsistencies, logical errors, and edge-case failures, and fed them into training-data refinement.",
      "Reviewed large datasets and model outputs for quality and consistency, then wrote feedback that improved robustness.",
    ],
  },
];

export const education = {
  school: "Techno Main Salt Lake",
  degree: "B.Tech in Computer Science and Engineering (AI & ML)",
  place: "Kolkata, India",
  dates: "July 2022 – June 2026",
  coursework: [
    "Object-Oriented Programming",
    "Operating Systems",
    "Data Structures & Algorithms",
    "Machine Learning",
    "Database Management Systems",
  ],
};

export const skillGroups = [
  {
    title: "Languages",
    items: ["C++", "Python", "JavaScript", "SQL"],
  },
  {
    title: "Software engineering",
    items: ["Data Structures & Algorithms", "Object-Oriented Programming", "REST APIs"],
  },
  {
    title: "Systems",
    items: ["Operating Systems", "Computer Networks", "System Design", "Linux", "STL"],
  },
  {
    title: "Backend & databases",
    items: ["Node.js", "Express.js", "PostgreSQL", "Kafka", "MongoDB", "MySQL"],
  },
  {
    title: "Frontend & tools",
    items: ["React.js", "Docker", "Kubernetes", "Git"],
  },
  {
    title: "AI/ML & agents",
    items: ["LLMs", "Agentic AI", "Agent Evaluation", "PyTorch", "TensorFlow"],
  },
];

export const projects = [
  {
    slug: "ledgerloop",
    index: "01",
    title: "LedgerLoop",
    eyebrow: "Live product · MERN",
    summary:
      "An explainable reconciliation workspace that lines up orders, gateway payments, and bank-statement lines, and shows why a match is safe to confirm.",
    year: "2026",
    role: "Full-stack developer",
    stack: ["React", "Node.js", "Express", "MongoDB", "Docker"],
    coverLines: ["Orders", "Payments", "Bank"],
    links: [
      { label: "Live demo", href: "https://ledgerloop-hsvs.onrender.com" },
      { label: "GitHub", href: "https://github.com/adarshsingh-01/LedgerLoop" },
    ],
    brief:
      "A small online seller usually exports three files and tries to line them up by hand: orders, the payment gateway, and the bank. LedgerLoop is the screen for that work. A match is explained before anyone treats it as confirmed money movement.",
    shipped: [
      "A reconciliation workspace for orders, gateway payments, and bank-statement lines.",
      "A rules engine that auto-confirms exact references and settlement nets, keeps nickname, split-transfer, and installment matches as suggestions, and flags duplicates, missing refund debits, unpaid orders, and fees above the contract.",
      "An exception inbox with owners, states, notes, and follow-up drafts, plus an audit log of confirmations, rejections, and CSV imports.",
      "Separate books per store under one login, packaged with Docker.",
    ],
    outcome: "A live MERN product: React, Express, and MongoDB, with a public demo a reviewer can click through.",
  },
  {
    slug: "mindmeld",
    index: "02",
    title: "MindMeld",
    eyebrow: "Live product · MERN",
    summary:
      "Cognitive training with scientifically grounded exercises, live feedback, personal suggestions, and progress that stays on record.",
    year: "2025",
    role: "Full-stack developer",
    stack: ["React", "Node.js", "Express", "MongoDB"],
    coverLines: ["Memory", "Attention", "Focus"],
    links: [
      { label: "Live demo", href: "https://mind-beige.vercel.app" },
      { label: "GitHub", href: "https://github.com/adarshsingh-01/mind" },
    ],
    brief:
      "Practice only helps if the change is visible. MindMeld gives someone exercises for cognitive performance, then keeps the feedback and the trend in one place.",
    shipped: [
      "Interactive exercises with real-time feedback and personalized improvement suggestions.",
      "Gamification through daily challenges, leaderboards, and achievement tracking.",
      "MongoDB storage and performance analytics, with data-privacy requirements treated as part of the design.",
    ],
    outcome: "A deployed MERN app for practice, feedback, and a history of progress.",
  },
];

export function getProject(slug) {
  return projects.find((project) => project.slug === slug) || null;
}

export function getNextProject(slug) {
  const index = projects.findIndex((project) => project.slug === slug);
  if (index < 0) return projects[0];
  return projects[(index + 1) % projects.length];
}
