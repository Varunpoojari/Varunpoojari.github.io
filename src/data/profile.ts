/**
 * Single source of truth for the site's content.
 *
 * Reconciled from Varun's CV, LinkedIn export, GitHub (repos, READMEs, code, PRs)
 * and Dev.to. Where sources disagreed, the choice made is noted next to the field.
 * To update the site, edit this file — components only render what is here.
 */

export const person = {
  name: 'Varun Poojari',
  // CV, GitHub README and Dev.to say "Intern"; LinkedIn headline says "Engineer".
  role: 'AI Security Intern at RakFort',
  location: 'Dublin, Ireland',
  email: 'varunrpoojari@gmail.com', // used on CV, GitHub and LinkedIn summary
  intro:
    'I work where security operations meets AI security. By day I test LLM applications for prompt injection, data leakage and unsafe agent integrations. In the evenings I contribute detection content and red-teaming tooling to open source, most recently a dataset loader merged into Microsoft PyRIT.',
  seeking: 'Graduate, SOC analyst and detection engineering roles in Ireland and the EU.',
  workRights: 'Stamp 1G: full right to work in Ireland until October 2028.',
  siteUrl: 'https://varunpoojari.github.io',
  links: [
    { label: 'GitHub', href: 'https://github.com/Varunpoojari', handle: 'Varunpoojari' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/varunpoojari/', handle: 'in/varunpoojari' },
    { label: 'Dev.to', href: 'https://dev.to/varun_poojari', handle: 'varun_poojari' },
    { label: 'TryHackMe', href: 'https://tryhackme.com/p/VarunPoojari', handle: 'Top 2%' },
    { label: 'X', href: 'https://x.com/itsVarunPujary', handle: '@itsVarunPujary' },
  ],
};

/** GitHub username used by build-time and live API calls. */
export const githubUser = 'Varunpoojari';
export const devtoUser = 'varun_poojari';

export type Entry = {
  date: string; // display date, e.g. "Oct 2026"
  title: string;
  body: string;
  links?: { label: string; href: string }[];
  /** id of a live PR to show status for, "owner/repo#123" */
  pr?: string;
};

export type Era = {
  id: string;
  title: string; // role or programme
  org: string;
  period: string;
  place: string;
  city: 'dublin' | 'pune' | 'bengaluru' | 'texas';
  kind: 'work' | 'study';
  summary?: string;
  points?: string[];
  entries?: Entry[];
};

/**
 * The timeline. Newest first. Overlapping periods are kept as separate eras,
 * like a case file's exhibits, and each era carries the dated events that
 * happened during it.
 */
export const eras: Era[] = [
  {
    id: 'rakfort',
    title: 'AI Security Intern',
    org: 'RakFort',
    period: 'Sep 2026 – present',
    place: 'Dublin',
    city: 'dublin',
    kind: 'work',
    summary:
      'RakFort is a Dublin AI security and governance company that helps organisations in high-stakes industries assess AI risk and protect deployed AI systems.',
    points: [
      'Assess LLM-based applications against the OWASP LLM Top 10 and map risks to MITRE ATLAS techniques.',
      'Test for prompt injection, data leakage and insecure agent and webhook integrations, and write up findings with remediation guidance.',
      'Build Python automation for LLM-assisted alert triage and security testing workflows.',
    ],
    entries: [
      {
        date: 'Oct 2026',
        title: 'Dataset loader merged into Microsoft PyRIT',
        body:
          "Added a remote loader that brings the MITRE benchmark from Meta's CyberSecEval into PyRIT, Microsoft's AI red-teaming framework: 1,000 prompts across ten ATT&CK tactics, harm labels kept separate from tactic labels, exact-match privacy annotations, and 48 unit tests. Reviewed and merged by the PyRIT maintainers.",
        pr: 'microsoft/PyRIT#3028',
        links: [{ label: 'Pull request #3028', href: 'https://github.com/microsoft/PyRIT/pull/3028' }],
      },
      {
        date: 'Oct 2026',
        title: 'MemHalfLife: how long does fileless attack evidence last in memory?',
        body:
          'A research tool that turns "grab memory fast" into a number. It scores Volatility 3 output at fixed times after an attack, fits decay curves with bootstrap confidence intervals, and combines them with acquisition latency to estimate how much evidence a responder will recover. Nine scenarios across Windows and Linux cloud VMs, eight YARA rules, 41 tests. Lab data collection is next.',
        links: [{ label: 'Repository', href: 'https://github.com/Varunpoojari/memhalflife' }],
      },
      {
        date: 'Oct 2026',
        title: 'Writing on AI security reviews',
        body:
          'Two articles from working on secfoo: what an AI-driven security review costs per run, and how its prompt review maps to the OWASP LLM Top 10.',
        links: [{ label: 'Dev.to', href: 'https://dev.to/varun_poojari' }],
      },
      {
        date: 'Sep – Oct 2026',
        title: 'Five merged pull requests to secfoo',
        body:
          'secfoo orchestrates AI coding agents to run security assessments. Contributions: a Codex CLI agent adapter, Codex token-usage tracking, hardening the Claude adapter so scans ignore a target repo’s own settings and MCP servers, honest reporting of unpriced runs, and date validation for risk-acceptance records.',
        links: [{ label: 'Merged PRs', href: 'https://github.com/secfoo-com/secfoo/pulls?q=is%3Apr+author%3AVarunpoojari+is%3Amerged' }],
      },
      {
        date: 'Oct 2026',
        title: 'macOS detection rule submitted to SigmaHQ',
        body:
          'A Sigma rule for tccutil resetting TCC permissions, a step used by macOS infostealers such as Banshee (ATT&CK T1548.006). Field values confirmed on macOS with eslogger and validated with the SigmaHQ test suite.',
        pr: 'SigmaHQ/sigma#6362',
        links: [{ label: 'Pull request #6362', href: 'https://github.com/SigmaHQ/sigma/pull/6362' }],
      },
    ],
  },
  {
    id: 'nci',
    title: 'MSc Cyber Security',
    org: 'National College of Ireland',
    period: 'Sep 2025 – Aug 2026',
    place: 'Dublin',
    city: 'dublin',
    kind: 'study',
    summary:
      'Graduated with a 2:1. Modules covered network security and penetration testing, malware analysis, cryptography, incident response and analytics, forensics and eDiscovery, cloud security, IT law and ethics, and research methods.',
    points: [
      'Alongside the MSc: night team member and later appointed person at Whitbread, Dublin, handling operations, cash controls and end-of-day audits.',
    ],
    entries: [
      {
        date: 'Mar 2026',
        title: 'Pentest Suite',
        body:
          'A Next.js 14 and TypeScript penetration-testing workbench with one interface over four AI providers (OpenAI, Grok, Claude and local Ollama models), twelve scan modules, an AI payload generator and exportable reports with a weighted 0–100 risk score and A–F grade.',
        links: [
          { label: 'Live app', href: 'https://pentest-suite.vercel.app' },
          { label: 'Repository', href: 'https://github.com/Varunpoojari/pentest-suite' },
        ],
      },
      {
        date: 'Feb 2026',
        title: 'OWASP Dublin meetup',
        body:
          'Discussed AI-driven WAF security, zero-day trends and malware detection across a set of more than 35,000 malicious domains with practitioners from the Dublin security community.',
      },
      {
        date: 'Nov 2025',
        title: 'Event staff at the HYROX Fitness Championships',
        body: 'Ran spectator check-in, chip recovery and on-site operations at RDS Hall 8.',
      },
    ],
  },
  {
    id: 'mitwpu',
    title: 'BTech Computer Science (Cyber Security and Forensics)',
    org: 'MIT World Peace University',
    period: 'Aug 2021 – 2025',
    place: 'Pune',
    city: 'pune',
    kind: 'study',
    summary:
      'First-class honours equivalent and the Outstanding Achievement Award for academic performance and project work.',
    entries: [
      {
        date: 'Mar 2025',
        title: 'Speaker at DevConf.IN 2025 (Red Hat)',
        body:
          'Ran a workshop on MITRE ATT&CK, malware analysis and offensive security, with live demos on PortSwigger labs, bWAPP and Metasploitable exploitation, and SET-based phishing.',
        links: [{ label: 'Talk materials', href: 'https://github.com/Varunpoojari/ai-cybersecurity-dual-nature' }],
      },
      {
        date: 'Feb 2025',
        title: 'Detection and analysis toolkit',
        body:
          'A run of Python security tools: a static malware analyser with YARA rules and PE parsing, a Random Forest malware classifier built on byte-entropy features, a multi-port honeypot, an ML network intrusion detector, a phishing scorer and a security log analyser.',
        links: [{ label: 'Projects', href: '#work' }],
      },
      {
        date: '2024',
        title: 'Published at Springer ICACIS 2024',
        body:
          'Co-authored “Deepfake-based Covert Data Acquisition System and Methods with Malicious Application Mimicry and Stealthy Communication Channels”, accepted in the Springer Advances in Computer Science Applications and Research series.',
        links: [{ label: 'Research notes', href: 'https://github.com/Varunpoojari/Stealthy_Deepfake_Data_Acquisition_System' }],
      },
      {
        date: '2021',
        title: 'National Inter-Engineering Sports Meet: water polo winner',
        body: 'Led the team to first place against more than 20 universities.',
      },
    ],
  },
  {
    id: 'aether',
    title: 'Cyber Security Intern',
    org: 'Aether Shield Technologies',
    period: 'Jun 2024 – Jan 2025', // LinkedIn; CV said Jul
    place: 'Pune',
    city: 'pune',
    kind: 'work',
    summary:
      'A Netherlands-based blockchain security company working on AI-powered threat detection for decentralised ecosystems.',
    points: [
      'Led end-to-end development of a smart contract auditing tool: a ten-person team integrating six open-source analysis frameworks, which shortened delivery by 20%.',
      'Worked with senior security engineers and cross-functional teams to ship on schedule.',
      'Ran workshops and seminars on security awareness.',
    ],
  },
  {
    id: 'tamu',
    title: 'Summer International Cybersecurity Research Program',
    org: 'Texas A&M University',
    period: 'Jun – Jul 2024',
    place: 'Texas',
    city: 'texas',
    kind: 'study',
    summary: 'Research programme in cybersecurity and digital forensics. Completed with a research certificate and letter of recommendation.',
    points: [
      'Earlier that June: National Academic Immersion Program in Cybersecurity and Digital Forensics at IIT Jodhpur.',
    ],
  },
  {
    id: 'ziroh',
    title: 'Project Team Lead, Secure File Sharing',
    org: 'Ziroh Labs',
    period: 'Apr – Sep 2023',
    place: 'Bengaluru',
    city: 'bengaluru',
    kind: 'work',
    points: [
      'Designed a secure file-sharing architecture with end-to-end encryption for enterprise data.',
      'Built a Java tool that recursively analyses OneDrive permissions for security audits; tighter permission management cut unauthorised access incidents by 85%.',
      'Migrated more than 500 sensitive files with zero data loss and an intact chain of custody.',
      'Led secure code reviews and automated compliance checks, cutting manual audit time by 30%.',
    ],
  },
];

export type Project = {
  repo: string; // GitHub repo name, used to pull live stats
  name: string;
  what: string; // one line: what it is
  how: string[]; // what the code actually does
  stack: string[];
  live?: string;
  area: 'ai' | 'forensics' | 'detection' | 'offense';
  featured?: boolean;
};

/** Descriptions are written from the code in each repository. */
export const projects: Project[] = [
  {
    repo: 'pentest-suite',
    name: 'Pentest Suite',
    what: 'A web workbench for AI-assisted penetration testing.',
    how: [
      'One query interface over OpenAI, Grok, Claude and local Ollama models, used for vulnerability analysis, payload generation and executive summaries.',
      'Twelve scan modules from XSS and SQL injection to TLS and port checks, with a live log stream; the security-header check runs against the real target.',
      'Weighted risk score (critical 40, high 20, medium 10, low 3) capped at 100 and mapped to an A–F grade; state persisted with Zustand.',
    ],
    stack: ['Next.js 14', 'TypeScript', 'Zustand', 'Tailwind', 'Docker'],
    live: 'https://pentest-suite.vercel.app',
    area: 'offense',
    featured: true,
  },
  {
    repo: 'memhalflife',
    name: 'MemHalfLife',
    what: 'Measures how quickly fileless attack evidence decays in memory.',
    how: [
      'Declarative TOML scenarios for nine ATT&CK techniques, from PowerShell cradles and LSASS access to memfd fileless ELFs and IMDS credential theft.',
      'Scores Volatility 3 JSON automatically, fits decay curves with bootstrap 95% confidence intervals and handles right-censoring.',
      'An acquisition-SLA simulator combines decay with measured latency; every image is SHA-256 hashed into an append-only custody log.',
    ],
    stack: ['Python', 'Volatility 3', 'YARA', 'Statistics'],
    area: 'forensics',
    featured: true,
  },
  {
    repo: 'Malware_Analysis_Lab',
    name: 'Malware Analysis Lab',
    what: 'Static triage for suspicious files.',
    how: [
      'File metadata, MD5, SHA-1 and SHA-256 hashes, magic-number type detection and printable-string extraction.',
      'PE header and section analysis with pefile.',
      'Custom YARA rules for suspicious strings, Base64-encoded commands and executable properties.',
    ],
    stack: ['Python', 'YARA', 'pefile', 'libmagic'],
    live: 'https://malware-analysis-lab.vercel.app',
    area: 'forensics',
    featured: true,
  },
  {
    repo: 'Adaptive_AI_Honeypot_System',
    name: 'Adaptive Honeypot',
    what: 'A multi-service honeypot that records attacker sessions.',
    how: [
      'Threaded listeners emulate FTP, SSH and HTTP banners on configurable ports and log every byte an attacker sends.',
      'Self-restarting service threads and a containerised deployment for isolation.',
      'Designed around a behavioural-analysis stage that classifies sessions; listed in the awesome-honeypots catalogue submission.',
    ],
    stack: ['Python', 'Sockets', 'Docker'],
    live: 'https://adaptive-ai-honeypot-system.vercel.app',
    area: 'detection',
    featured: true,
  },
  {
    repo: 'Malware-classification-system',
    name: 'Malware Classifier',
    what: 'Separates malicious from benign binaries with machine learning.',
    how: [
      'Extracts file size, Shannon entropy, byte-frequency and byte-sequence features from raw binaries.',
      'Trains a 100-tree Random Forest on scaled features and plots feature importance.',
    ],
    stack: ['Python', 'scikit-learn', 'NumPy'],
    area: 'detection',
  },
  {
    repo: 'Network-Intrusion-Detection-System-using-Machine-Learning',
    name: 'Network Intrusion Detector',
    what: 'Flags DoS, probing and port scans in network traffic.',
    how: [
      'Packet-rate and port-scan heuristics alongside a Random Forest classifier with confidence scores.',
      'Rotating logs and JSON alert output for downstream tooling.',
    ],
    stack: ['Python', 'scikit-learn'],
    area: 'detection',
  },
  {
    repo: 'AI-powered-phishing-detector',
    name: 'Phishing Detector',
    what: 'Scores emails for phishing indicators.',
    how: ['Pattern rules for urgency, credential requests and suspicious links add up to a capped risk score with low, medium and high bands.'],
    stack: ['Python'],
    area: 'detection',
  },
  {
    repo: 'Security-log-analyzer',
    name: 'Security Log Analyser',
    what: 'Finds anomalies in security event logs.',
    how: ['Loads JSON security logs into pandas and flags failed-login bursts and unusual activity.'],
    stack: ['Python', 'pandas'],
    area: 'detection',
  },
];

export type Contribution = {
  pr: string; // owner/repo#number — status fetched live
  repo: string;
  title: string;
  note: string;
  href: string;
  fallbackState: 'merged' | 'open' | 'closed';
};

export const contributions: Contribution[] = [
  {
    pr: 'microsoft/PyRIT#3028',
    repo: 'microsoft/PyRIT',
    title: 'CyberSecEval MITRE dataset loader',
    note: '1,000 ATT&CK-tagged prompts, 48 tests',
    href: 'https://github.com/microsoft/PyRIT/pull/3028',
    fallbackState: 'merged',
  },
  {
    pr: 'secfoo-com/secfoo#30',
    repo: 'secfoo-com/secfoo',
    title: 'Report unpriced AI spend as unknown, not $0',
    note: 'Cost accuracy and a distinct not-configured status',
    href: 'https://github.com/secfoo-com/secfoo/pull/30',
    fallbackState: 'merged',
  },
  {
    pr: 'secfoo-com/secfoo#26',
    repo: 'secfoo-com/secfoo',
    title: 'Harden the Claude adapter',
    note: 'Scans no longer load the target repo’s hooks or MCP servers',
    href: 'https://github.com/secfoo-com/secfoo/pull/26',
    fallbackState: 'merged',
  },
  {
    pr: 'secfoo-com/secfoo#21',
    repo: 'secfoo-com/secfoo',
    title: 'Record Codex token usage',
    note: 'Cost tracking for Codex runs',
    href: 'https://github.com/secfoo-com/secfoo/pull/21',
    fallbackState: 'merged',
  },
  {
    pr: 'secfoo-com/secfoo#12',
    repo: 'secfoo-com/secfoo',
    title: 'Codex CLI agent adapter',
    note: 'Read-only sandboxed Codex runs',
    href: 'https://github.com/secfoo-com/secfoo/pull/12',
    fallbackState: 'merged',
  },
  {
    pr: 'secfoo-com/secfoo#7',
    repo: 'secfoo-com/secfoo',
    title: 'Validate dates on exception records',
    note: 'Malformed expiry dates were silently untrackable',
    href: 'https://github.com/secfoo-com/secfoo/pull/7',
    fallbackState: 'merged',
  },
  {
    pr: 'SigmaHQ/sigma#6362',
    repo: 'SigmaHQ/sigma',
    title: 'TCC permissions reset via tccutil',
    note: 'macOS rule for ATT&CK T1548.006',
    href: 'https://github.com/SigmaHQ/sigma/pull/6362',
    fallbackState: 'open',
  },
  {
    pr: 'paralax/awesome-honeypots#172',
    repo: 'paralax/awesome-honeypots',
    title: 'Add Adaptive AI Honeypot System',
    note: 'Catalogue listing',
    href: 'https://github.com/paralax/awesome-honeypots/pull/172',
    fallbackState: 'open',
  },
];

/**
 * Skills matrix. Each technique lists the evidence that backs it, so the
 * matrix doubles as an index into the rest of the page.
 */
export type Skill = { name: string; evidence: string[] };
export type Tactic = { id: string; name: string; skills: Skill[] };

export const matrix: Tactic[] = [
  {
    id: 'detect',
    name: 'Detect',
    skills: [
      { name: 'Splunk', evidence: ['MSc incident response and analytics'] },
      { name: 'IBM QRadar', evidence: ['SIEM monitoring and log analysis'] },
      { name: 'Elastic SIEM', evidence: ['SIEM monitoring and log analysis'] },
      { name: 'Sigma rules', evidence: ['SigmaHQ #6362'] },
      { name: 'Sysmon', evidence: ['Endpoint telemetry'] },
      { name: 'Suricata', evidence: ['Network IDS'] },
      { name: 'EDR / XDR', evidence: ['Endpoint detection and response'] },
    ],
  },
  {
    id: 'respond',
    name: 'Respond',
    skills: [
      { name: 'Alert triage', evidence: ['LLM-assisted triage automation at RakFort'] },
      { name: 'Incident response', evidence: ['MSc incident response and analytics'] },
      { name: 'IOC and TTP analysis', evidence: ['MITRE ATT&CK mapping'] },
      { name: 'Tines (SOAR)', evidence: ['Playbook automation'] },
    ],
  },
  {
    id: 'forensics',
    name: 'Investigate',
    skills: [
      { name: 'Memory forensics', evidence: ['MemHalfLife'] },
      { name: 'Volatility 3', evidence: ['MemHalfLife'] },
      { name: 'YARA', evidence: ['MemHalfLife', 'Malware Analysis Lab'] },
      { name: 'Static malware analysis', evidence: ['Malware Analysis Lab', 'Malware Classifier'] },
      { name: 'Chain of custody', evidence: ['Ziroh Labs migration', 'MemHalfLife custody log'] },
      { name: 'Wireshark', evidence: ['Network analysis'] },
    ],
  },
  {
    id: 'ai',
    name: 'Secure AI',
    skills: [
      { name: 'OWASP LLM Top 10', evidence: ['RakFort assessments', 'Dev.to article'] },
      { name: 'MITRE ATLAS', evidence: ['RakFort risk mapping'] },
      { name: 'Prompt injection testing', evidence: ['RakFort assessments'] },
      { name: 'Microsoft PyRIT', evidence: ['PyRIT #3028'] },
      { name: 'Agent security', evidence: ['secfoo Claude adapter hardening'] },
    ],
  },
  {
    id: 'assess',
    name: 'Assess',
    skills: [
      { name: 'Burp Suite', evidence: ['DevConf.IN workshop'] },
      { name: 'Metasploit', evidence: ['DevConf.IN workshop'] },
      { name: 'Nmap', evidence: ['Pentest Suite port module'] },
      { name: 'Nessus', evidence: ['Vulnerability management'] },
      { name: 'Smart contract auditing', evidence: ['Aether Shield'] },
      { name: 'Secure code review', evidence: ['Ziroh Labs', 'SonarQube'] },
      { name: 'STRIDE threat modelling', evidence: ['Threat Dragon'] },
    ],
  },
  {
    id: 'govern',
    name: 'Govern',
    skills: [
      { name: 'MITRE ATT&CK', evidence: ['PyRIT #3028', 'MemHalfLife', 'DevConf.IN'] },
      { name: 'ISO/IEC 27001:2022', evidence: ['ISO 27001 Associate'] },
      { name: 'NIST CSF', evidence: ['Detection and response workflows'] },
      { name: 'CIS Controls', evidence: ['Detection and response workflows'] },
    ],
  },
  {
    id: 'build',
    name: 'Build',
    skills: [
      { name: 'Python', evidence: ['MemHalfLife', 'PyRIT #3028', 'secfoo'] },
      { name: 'TypeScript', evidence: ['Pentest Suite'] },
      { name: 'Java', evidence: ['Ziroh Labs audit tool'] },
      { name: 'AWS', evidence: ['IAM, VPC, S3, GuardDuty, CloudTrail'] },
      { name: 'GCP', evidence: ['Cloud security module'] },
      { name: 'Docker', evidence: ['Pentest Suite', 'Adaptive Honeypot'] },
      { name: 'Jenkins (CI/CD)', evidence: ['Pipeline security'] },
    ],
  },
];

export type Cert = { name: string; issuer: string; href?: string; status?: 'in progress'; id?: string };

export const certifications: Cert[] = [
  { name: 'Certified Ethical Hacker (CEH v12)', issuer: 'EC-Council', id: 'ECC1487032569', href: 'https://drive.google.com/drive/folders/1rfoXJ5-WfP2vr-3a1b44imPVVqlJVixz?usp=share_link' },
  { name: 'ISO/IEC 27001:2022 Information Security Associate', issuer: '' },
  { name: 'Google Cybersecurity Professional Certificate', issuer: 'Google, via Coursera', href: 'https://www.coursera.org/account/accomplishments/professional-cert/VHGLLYF4GTD7' },
  { name: 'Ethical Hacking Essentials (EHE)', issuer: 'EC-Council', href: 'https://codered.eccouncil.org/certificate/91a0a72e-4ece-44ed-b700-07b6bec73b29?logged=false' },
  { name: 'Network Defense Essentials (NDE)', issuer: 'EC-Council', href: 'https://codered.eccouncil.org/certificate/09751cef-26a2-4570-8c2e-11870f4f2646?logged=false' },
  { name: 'Digital Forensics Essentials (DFE)', issuer: 'EC-Council' },
  { name: 'Summer International Cybersecurity Research Program', issuer: 'Texas A&M University', href: 'https://drive.google.com/drive/folders/1czguXXIS3nLbZxFkhKBSW0Tf1D1IweZD?usp=share_link' },
  { name: 'Academic Immersion Program in Cybersecurity and Forensics', issuer: 'IIT Jodhpur', href: 'https://drive.google.com/file/d/1lox9T3NuYSHct9qC4_hLTAlJ-C5eFWSC/view?usp=share_link' },
  { name: 'Cybersecurity Industrial Training Program', issuer: 'DevTown', href: 'https://www.cert.devtown.in/verify/5fkJe1zif2' },
  { name: 'eJPT', issuer: 'INE', status: 'in progress' },
  { name: 'CompTIA Security+', issuer: 'CompTIA', status: 'in progress' },
];

export const honours: string[] = [
  'Outstanding Achievement Award, MIT World Peace University',
  'Winner, National Level Inter-Engineering Sports Meet 2021 (water polo)',
  'Guinness World Records participant',
  "IIT Bombay E-Summit '21",
  'National Merit Scholarship Exam 2020',
  'TryHackMe: top 2% worldwide',
];

/** ISO 3166-1 numeric codes, matching the world-atlas topology ids. */
export const countries = [
  { name: 'India', code: '356', note: 'Home: Pune, Bengaluru' },
  { name: 'United Arab Emirates', code: '784' },
  { name: 'United Kingdom', code: '826' },
  { name: 'United States', code: '840', note: 'Texas A&M research programme' },
  { name: 'Ireland', code: '372', note: 'Dublin, MSc and RakFort' },
];
