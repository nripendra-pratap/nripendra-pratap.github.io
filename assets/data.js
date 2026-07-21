// ============================================================
//  Portfolio content — edit this file to update the website.
// ============================================================

// Feature flags — flip to true to enable. Applied to any element
// with a matching [data-feature] attribute (see script.js).
const FEATURES = {
  downloadResume: false, // set to true to show the "Download Résumé" button
};

// Inline SVG path data (viewBox 0 0 24 24) for company logos.
// Inlined so they render offline and via file:// (no external fetch).
const LOGOS = {
  microsoft: "M0 0v11.408h11.408V0zm12.594 0v11.408H24V0zM0 12.594V24h11.408V12.594zm12.594 0V24H24V12.594z",
  dell: "M17.963 14.6V9.324h1.222v4.204h2.14v1.07h-3.362zm-9.784-3.288l2.98-2.292c.281.228.56.458.841.687l-2.827 2.14.611.535 2.827-2.216c.281.228.56.458.841.688a295.83 295.83 0 0 1-2.827 2.216l.61.536 2.83-2.295-.001-1.986h1.223v4.204h2.216v1.07h-3.362v-1.987c-.995.763-1.987 1.529-2.981 2.292l-2.981-2.292c-.144.729-.653 1.36-1.312 1.694-.285.147-.597.24-.915.276-.183.022-.367.017-.551.017H3.516V9.325H5.69a2.544 2.544 0 0 1 1.563.557c.454.36.778.872.927 1.43m-3.516-.917v3.21l.953-.001a1.377 1.377 0 0 0 1.036-.523 1.74 1.74 0 0 0 .182-1.889 1.494 1.494 0 0 0-.976-.766c-.166-.04-.338-.03-.507-.032h-.688zM11.82 0h.337a11.94 11.94 0 0 1 5.405 1.373 12.101 12.101 0 0 1 4.126 3.557A11.93 11.93 0 0 1 24 11.82v.36a11.963 11.963 0 0 1-3.236 8.033A11.967 11.967 0 0 1 12.182 24h-.361a11.993 11.993 0 0 1-4.145-.806 12.04 12.04 0 0 1-4.274-2.836A12.057 12.057 0 0 1 .576 15.67 12.006 12.006 0 0 1 0 12.181v-.361a11.924 11.924 0 0 1 1.992-6.396 12.211 12.211 0 0 1 4.71-4.172A11.875 11.875 0 0 1 11.82 0m-.153 1.23a10.724 10.724 0 0 0-6.43 2.375 10.78 10.78 0 0 0-3.319 4.573 10.858 10.858 0 0 0 .193 8.12 10.788 10.788 0 0 0 3.546 4.421 10.698 10.698 0 0 0 4.786 1.946c1.456.209 2.955.124 4.376-.26a10.756 10.756 0 0 0 5.075-3.062 10.742 10.742 0 0 0 2.686-5.28 10.915 10.915 0 0 0-.122-4.682 10.77 10.77 0 0 0-7.098-7.626 10.78 10.78 0 0 0-3.693-.525z",
  tcs: "M24 16.262c0-1.305-.522-2.174-1.827-3.088l-1.785-1.24c-.033-.022-.06-.045-.092-.068-.629-.473-.91-.912-.91-1.43 0-.696.567-1.13 1.371-1.13 1.022 0 1.503.477 2.111.477.479 0 .805-.326.805-.804 0-.348-.174-.631-.631-.848-.718-.348-1.503-.48-2.35-.48-.892 0-1.676.262-2.241.697a.984.984 0 0 0 0-.001 3.64 3.64 0 0 0-.326.283l-.008.01c-.65.695-1.19 1.714-1.623 3.145l-.501 1.652c-.893 2.912-2.306 4.304-4.504 4.304-2.415 0-3.938-1.675-3.938-4.153v.026-.025c0-2.468 1.509-4.159 3.69-4.174l.03-.002a4.857 4.857 0 0 1 2.089.457c.282.13.522.174.74.174.1 0 .192-.017.279-.041.362-.103.592-.408.592-.83 0-.326-.196-.653-.653-.87-.827-.414-1.894-.653-3.046-.653-.86 0-1.653.152-2.359.436-2.117.851-3.452 2.886-3.452 5.545l.002-.024-.001.024c0 .931.169 1.783.479 2.536-.452.985-1.143 1.509-2.046 1.509-1.087 0-1.804-.63-1.806-2.06V9.477h2.546c.588 0 .979-.348.979-.848s-.39-.848-.98-.848H2.09V5.563c0-.653-.435-1.088-1.044-1.088C.435 4.475 0 4.911 0 5.563v10.285c0 2.393 1.37 3.655 3.7 3.655.486.001.97-.08 1.43-.24h.005a3.49 3.49 0 0 0 1.81-1.514c1.034 1.117 2.565 1.775 4.48 1.775.999 0 1.868-.195 2.65-.607h.003c1.588-.827 2.72-2.502 3.503-5.068l.457-1.5a2.984 2.984 0 0 1-.162-.234c.308.492.785.953 1.468 1.43l1.631 1.13c.244.17.463.34.668.51.289.322.378.67.378 1.078 0 .935-.74 1.566-1.807 1.566-1.022 0-1.893-.522-2.371-.522s-.806.325-.806.804c0 .348.174.63.632.848.631.304 1.653.566 2.567.566 1.153 0 2.111-.348 2.785-.957a1.59 1.59 0 0 0 .156-.161A3.104 3.104 0 0 0 24 16.262z",
  hcl: "M21.3968 10.4013l-1.0971 2.4399H24l-.3435.7629H17.294l1.4331-3.2028zm-6.3985 1.0896h2.4633c-.0152-.5377-.5358-.911-1.5672-1.0592-2.0348-.2994-4.2354-.1718-5.802.6934-1.2346.6859-1.329 1.7176-.099 2.2232 1.0357.4218 3.2106.4656 4.767.201 1.0077-.1712 1.7776-.502 2.2093-.9974H14.454c-.3262.251-.7526.376-1.25.3804-1.4124.0094-1.5988-.4182-1.3525-.9106.293-.5801.9075-.8966 1.8447-.9216.7381-.0199 1.1029.1436 1.3021.3908M0 13.6067h2.604l.5578-1.2789h2.553l-.5732 1.2771h2.635l1.4457-3.2031h-2.653l-.4769 1.0807H3.5421l.4831-1.0807-2.5781-.0006Z"
};

const EXPERIENCE = [
  {
    role: "Software Development Engineer II",
    company: "Microsoft",
    location: "Dublin",
    period: "Jul 2024 — Present",
    current: true,
    logo: "microsoft",
    brand: "#0078D4",
    points: [
      "Engineer on Microsoft's spelling & grammar service (the red/blue squiggles in Word, Outlook, OneNote) — operating an Azure Service Fabric platform serving over a billion requests/day across 26 regions and 8 clouds, including sovereign (EU, China) and air-gapped (USGov, DoD).",
      "Build features and reliability improvements across the Editor Service API gateway in C#, .NET, and Kusto; own end-to-end deployments, monitoring, and on-call across the full sovereign and public-cloud footprint, including escort-only environments.",
      "Led Editor Service's launch into Bleu and Delos (EU sovereign clouds), now authoring the work to bring Word Agent Mode to sovereign customers, and scaled that playbook across the Office Product Group.",
      "Co-built a Claude-based AI agent (7 MCP servers, 18+ skills covering deployments, ICM, on-call, code review, cost reporting) that automates operational toil and cut developer cycle time by ~75%."
    ]
  },
  {
    role: "Software Engineer II",
    company: "Dell Technologies",
    location: "Dublin",
    period: "Jul 2021 — Jun 2024",
    logo: "dell",
    brand: "#007DB8",
    points: [
      "Led the Personalization Order Status \"Visit Intent\" API targeting a 40% improvement in customer support experience; built with FastAPI, PyMongo, SQLAlchemy (PostgreSQL), Docker, and deployed on PKS (Kubernetes).",
      "Used FastAPI auto-documentation, dependency injection, and Pydantic models to maintain clean API design and validated inputs.",
      "Owned end-to-end delivery: requirements, technical planning, resourcing, GitLab CI/CD, unit/integration tests (pytest), and quality monitoring (coverage, Sonar) in an asynchronous environment.",
      "Implemented centralized logging and real-time monitoring via ELK and Dynatrace dashboards to speed RCA; delivered dell.com .NET widgets contributing to an 18% CSAT improvement."
    ]
  },
  {
    role: "Software Developer",
    company: "Tata Consultancy Services (TCS)",
    location: "Mumbai",
    period: "Aug 2016 — Aug 2019",
    logo: "tcs",
    brand: "#E31937",
    points: [
      "Built C# backend services and Windows Forms applications for high-volume business workflows; delivered complex modules for a capital markets banking client (Royal Bank of Canada) in Agile.",
      "Designed and developed a scalable internal reconciliation tracking website using ASP.NET MVC/REST, Entity Framework, and Microsoft SQL Server.",
      "Built a Python automation tool using XML-RPC and Selenium to automate daily production checks, saving ~4 hours/day.",
      "Contributed to DevOps integration (Git, JIRA, Jenkins) as part of an SVN-to-Git migration and production rollout."
    ]
  },
  {
    role: "Software Developer Intern",
    company: "HCL Technologies",
    location: "New Delhi",
    period: "May 2015 — Aug 2015",
    logo: "hcl",
    brand: "#0F5FDC",
    points: [
      "Built an electricity consumption analyzer with forecasting and anomaly detection to flag theft/unusual spikes and deliver insights via Tableau."
    ]
  }
];

const SKILLS = [
  {
    group: "Languages",
    icon: "💻",
    items: ["Python", "C#", "Ruby", "R", "SQL", "C++", "ASP.NET"]
  },
  {
    group: "Databases",
    icon: "🗄️",
    items: ["MongoDB", "Microsoft SQL Server", "PostgreSQL", "Redis"]
  },
  {
    group: "Frameworks & Tools",
    icon: "🧰",
    items: ["FastAPI", "SQLAlchemy", ".NET (ASP.NET MVC)", "Claude / MCP", "GitHub", "GitLab CI/CD", "Jenkins", "JIRA", "Jupyter", "Tableau"]
  },
  {
    group: "DevOps & Orchestration",
    icon: "☁️",
    items: ["Azure", "Service Fabric", "ADO", "Docker", "Kubernetes", "PKS"]
  },
  {
    group: "Monitoring & Quality",
    icon: "📊",
    items: ["ELK Stack", "Dynatrace", "Geneva", "DGREP", "Sonar", "Code Coverage"]
  }
];

const EDUCATION = [
  {
    degree: "Master of Science, Computer Science",
    school: "University College Dublin",
    period: "Sep 2019 — Oct 2020",
    detail: "GPA: 3.54",
    logo: "assets/edu/ucd.png"
  },
  {
    degree: "Bachelor of Engineering, Computer Engineering",
    school: "Pillai College of Engineering",
    period: "Aug 2012 — Aug 2016",
    detail: "First Class Honors · University of Mumbai",
    logo: "assets/edu/pillai.png"
  }
];

const ROLES_TYPED = [
  "Software Development Engineer II @ Microsoft",
  "Backend Engineer (C# / Python)",
  "Microservices & Cloud Ops",
  "AI / MCP Workflow Builder"
];
