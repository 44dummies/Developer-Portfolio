// Shared content + design tokens for the portfolio universe.
// One place for the signal color so it never scatters as raw hex across files.

export const SIGNAL = "#8ea2ff"; // restrained cool signal — used sparingly for interactive emphasis
export const SIGNAL_DIM = "rgba(142,162,255,0.14)";

export const PERSON = {
  name: "44 Dummies",
  short: "Damian",
  role: "AI Engineer · Software Developer · Founder",
  location: "Nairobi, KE",
  email: "muindidamian@gmail.com",
  github: "github.com/44dummies",
  linkedin: "linkedin.com/in/damianrourke",
  x: "x.com/damianbuilds",
  tagline: "I design intelligent systems that connect research, software, and businesses.",
};

export type Category = "AI Systems" | "SaaS" | "Experiments";

export type Project = {
  slug: string;
  index: string;
  title: string;
  kind: string;
  category: Category;
  year: string;
  blurb: string;
  color: string; // accent color used sparingly for signal
  image: string; // hero / thumbnail photo
  biome: string; // radial gradient describing the planet surface
  stack: string[];
  role: string; // what I did on this
  duration: string; // engagement length
  overview: string; // longer narrative intro for the case study
  problem: string;
  approach: string;
  build: { title: string; body: string }[]; // key decisions during the build
  architecture: { node: string; detail: string }[];
  metrics: { label: string; value: string }[];
  outcome: string; // closing result statement
  lessons: string[];
  repo: string;
  demo: string;
  status: string;
};

export const projects: Project[] = [
  {
    slug: "legal-rag",
    index: "01",
    title: "Legal RAG",
    kind: "Kenyan Legal Retrieval System",
    category: "AI Systems",
    year: "2026",
    blurb:
      "A retrieval system that reads Kenyan case law and statute the way a senior advocate would — grounded, cited, and honest about what it doesn't know.",
    color: "#5b8cff",
    image:
      "https://images.unsplash.com/photo-1479142506502-19b3a3b7ff33?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    biome: "radial-gradient(circle at 32% 28%, #a9c2ff, #3f63d6 42%, #14204a 78%, #060a1c)",
    stack: ["Next.js", "TypeScript", "pgvector", "LangGraph", "Claude"],
    role: "System design, retrieval pipeline, evals",
    duration: "6 months · ongoing",
    overview:
      "Legal RAG began as a question I couldn't shake: could a retrieval system reason over Kenyan law well enough that an advocate would trust it in front of a judge? The bar was brutal. Every sentence had to trace to a paragraph of authority. That shaped every decision that followed, from how documents were chunked to when the system stays silent.",
    problem:
      "Legal teams in Kenya drown in precedent and gazette notices. Generic chatbots invent citations — a fireable, sometimes disbarrable, mistake. The system had to be correct or silent, never confidently wrong. Existing tools optimised for fluency; this domain punishes fluency that isn't grounded.",
    approach:
      "A multi-agent retrieval graph: a planner decomposes the question, retrievers pull from a hybrid dense/sparse index over the Kenya Law corpus, and a verifier agent refuses any claim it cannot attach to a source paragraph. Every answer ships with its citations attached, and confidence is expressed as coverage — how much of the response is grounded — rather than a vague percentage.",
    build: [
      { title: "Citation-aware chunking", body: "Chunks preserve the paragraph and section numbering of judgments so a retrieved span can always be cited back precisely, not approximately." },
      { title: "Hybrid over pure-vector", body: "Dense embeddings miss exact statutory language; BM25 catches it. Fusing the two recovered the named-section queries that embeddings alone dropped." },
      { title: "Refusal as a first-class path", body: "The verifier can return 'no supporting authority found' — and does, often. Making that a designed outcome rather than a failure was the hardest cultural shift." },
      { title: "Evals as code", body: "A growing suite of gold questions with known citations runs on every change. A regression can't merge." },
    ],
    architecture: [
      { node: "Ingestion", detail: "Parsing of judgments, statutes & gazettes into a citation-aware chunk graph." },
      { node: "Hybrid index", detail: "pgvector dense embeddings fused with BM25 sparse ranking." },
      { node: "Planner agent", detail: "Decomposes queries into sub-questions with LangGraph state." },
      { node: "Verifier", detail: "Grounds every sentence to a source span or drops it." },
    ],
    metrics: [
      { label: "Documents indexed", value: "410k" },
      { label: "Citation accuracy", value: "99.1%" },
      { label: "P95 latency", value: "1.6s" },
      { label: "Hallucination rate", value: "<0.3%" },
    ],
    outcome:
      "Now in production with a Nairobi legal team, Legal RAG answers grounded questions over 410k documents at 99.1% citation accuracy, and declines the ones it can't ground.",
    lessons: [
      "Refusal is a feature. Users trust a system that says 'no source' more than one that guesses.",
      "Retrieval quality dwarfs model choice — we swapped models twice with negligible impact.",
      "Evals as code. Every regression became a permanent test case.",
    ],
    repo: "github.com/44dummies/LEGAL-RAG",
    demo: "legal.rourke.systems",
    status: "Development",
  },
  {
    slug: "penny-claw",
    index: "02",
    title: "Penny Claw",
    kind: "AI Finance Copilot",
    category: "AI Systems",
    year: "2025",
    blurb:
      "An agent that reads your statements, categorises the mess, and tells you the uncomfortable truth about where the money actually went.",
    color: "#e0a45e",
    image:
      "https://images.unsplash.com/photo-1650661926447-9efb2610f64c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    biome: "radial-gradient(circle at 30% 30%, #ffdca6, #e0a45e 40%, #8a5a1e 74%, #2a1808)",
    stack: ["Python", "FastAPI", "React", "PostgreSQL", "Claude"],
    role: "Full-stack build, agent pipeline, product",
    duration: "4 months",
    overview:
      "Penny Claw started from frustration with finance apps that hand you a dashboard and call it a product. Nobody wants to interpret charts. They want an honest answer to 'can I afford this?', backed by their own transactions. The whole system is built around turning messy statement exports into that one trustworthy sentence.",
    problem:
      "Personal finance tools are dashboards that make you do the work. People want a straight answer about whether they can afford the thing. And in Kenya, the money story lives across MPESA, bank, and card exports that never agree with each other.",
    approach:
      "An agent pipeline that ingests bank exports, reconciles duplicates across sources, learns per-user categories, and answers plain-language questions with the exact transactions to back them up. No figure is ever generated — every number is retrieved from a real row.",
    build: [
      { title: "Dedup before anything else", body: "The same transaction appears in an MPESA statement and a bank export. Reconciliation had to happen first or every downstream number was wrong." },
      { title: "Categories that adapt", body: "A few-shot classifier learns each user's own labels rather than forcing a fixed taxonomy — 'chama' and 'shop stock' are real categories here." },
      { title: "Receipts, not vibes", body: "Every answer links to the transactions behind it, so the user can audit the claim instead of trusting a black box." },
      { title: "Speed budget", body: "Setup had to feel instant; parsing and reconciliation were tuned to bring average onboarding under 90 seconds." },
    ],
    architecture: [
      { node: "Import", detail: "Statement parsing + dedup across MPESA, bank & card exports." },
      { node: "Categoriser", detail: "Few-shot classifier that adapts to each user's labels." },
      { node: "Reasoner", detail: "Agent answers questions and cites the transactions." },
      { node: "Guardrail", detail: "Never invents a figure — every number traces to a row." },
    ],
    metrics: [
      { label: "Accounts linked", value: "3.2k" },
      { label: "Categorisation F1", value: "0.94" },
      { label: "Import formats", value: "11" },
      { label: "Avg. setup", value: "90s" },
    ],
    outcome:
      "In beta with 3.2k linked accounts, Penny Claw categorises transactions at 0.94 F1 across 11 import formats and answers money questions with the receipts attached — usually within 90 seconds of signup.",
    lessons: [
      "MPESA reconciliation is its own dark art — local context beats a generic parser.",
      "Users forgive slowness far less than a single wrong balance.",
      "A plain sentence with a receipt beats any pie chart.",
    ],
    repo: "github.com/44dummies/penny-claw",
    demo: "pennyclaw.app",
    status: "Development",
  },
  {
    slug: "shannon",
    index: "03",
    title: "Shannon",
    kind: "Knowledge Graph Engine",
    category: "AI Systems",
    year: "2025",
    blurb:
      "A knowledge graph that reads a company's scattered docs and builds a queryable map of what it actually knows — named for the father of information theory.",
    color: "#54c9a8",
    image:
      "https://images.unsplash.com/photo-1644088379091-d574269d422f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    biome: "radial-gradient(circle at 33% 30%, #b6f5e2, #54c9a8 40%, #1f6f5c 76%, #072019)",
    stack: ["Python", "Neo4j", "spaCy", "Ray", "React"],
    role: "Research, extraction pipeline, graph design",
    duration: "5 months · research",
    overview:
      "Shannon is a research bet that flat retrieval is leaving the most valuable answers on the table. Companies don't just need to find the document that mentions a thing — they need to know how things connect. Named after Claude Shannon, the project reconstructs a company's implicit knowledge as an explicit, queryable graph and lets an agent walk it.",
    problem:
      "Institutional knowledge lives in Slack threads, PDFs, and one person's head. RAG over a flat index loses the relationships that make the knowledge useful — it can find a fact but never answer 'how are these two things connected?'",
    approach:
      "An extraction pipeline turns documents into typed entities and relations, stores them in a graph, resolves duplicates across sources, and lets an agent traverse it — answering multi-hop questions no single document could.",
    build: [
      { title: "Typed extraction", body: "An LLM paired with spaCy pulls entities and relations under a schema, so the graph is queryable rather than a bag of nodes." },
      { title: "Entity resolution is the product", body: "Merging 'Jane', 'J. Mwangi', and 'the CFO' into one node is where a knowledge graph earns its keep — most engineering effort went here." },
      { title: "Evolving ontology", body: "The schema is allowed to grow as new document types arrive; freezing it early would have made the graph brittle." },
      { title: "Multi-hop traversal", body: "The agent answers by walking edges, chaining facts that live in separate sources into a single grounded answer." },
    ],
    architecture: [
      { node: "Extractor", detail: "LLM + spaCy pull typed entities and relations from docs." },
      { node: "Graph store", detail: "Neo4j holds the evolving entity–relation network." },
      { node: "Resolver", detail: "Entity resolution merges duplicates across sources." },
      { node: "Traversal agent", detail: "Answers multi-hop questions by walking the graph." },
    ],
    metrics: [
      { label: "Entities mapped", value: "1.4M" },
      { label: "Relation types", value: "62" },
      { label: "Multi-hop recall", value: "91%" },
      { label: "Sources fused", value: "9" },
    ],
    outcome:
      "The research prototype maps 1.4M entities across 62 relation types and 9 sources, answering multi-hop questions at 91% recall — questions a flat index structurally cannot reach.",
    lessons: [
      "Entity resolution is where knowledge graphs live or die.",
      "Graphs answer 'how are these connected?' — the question flat RAG can't.",
      "Extraction schemas should evolve; don't freeze the ontology on day one.",
    ],
    repo: "github.com/44dummies/shannon",
    demo: "private",
    status: "Research",
  },
  {
    slug: "jarvis",
    index: "04",
    title: "Jarvis",
    kind: "Local-First Agent Runtime",
    category: "Experiments",
    year: "2025",
    blurb:
      "A local-first operating layer for my own life — mail, calendar, shell, and notes behind one agent that runs on my machine, not someone's cloud.",
    color: "#a68bff",
    image:
      "https://images.unsplash.com/photo-1518773553398-650c184e0bb3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    biome: "radial-gradient(circle at 30% 30%, #ded0ff, #a68bff 40%, #5a3fb0 74%, #1c1338)",
    stack: ["Rust", "Tauri", "Local LLM", "SQLite", "TypeScript"],
    role: "Everything — runtime, model, desktop shell",
    duration: "Ongoing · daily driver",
    overview:
      "Jarvis is the assistant I refused to hand to someone else's cloud. It's a local-first operating layer over my own life — mail, calendar, shell, notes — behind a single agent that runs entirely on my machine. It doubles as my proving ground for capability-based agent security, and it's earned enough trust to be my daily driver.",
    problem:
      "Every assistant wants your data on their servers. I wanted an agent with root access to my world that never phones home. That makes the security model non-negotiable: the blast radius is my whole machine.",
    approach:
      "A Rust runtime with a permission-scoped tool bus, driving a local quantized model, wrapped in a Tauri desktop shell. Tools are granted capabilities explicitly, every action is audited, and anything destructive requires a physical hardware-key tap.",
    build: [
      { title: "Capability-scoped tool bus", body: "Tools receive narrow, auditable capabilities rather than ambient access — the agent can only do what it's been explicitly handed." },
      { title: "Local model, good enough", body: "A quantized 8B model via llama.cpp handles the vast majority of daily tasks. It doesn't need to be state-of-the-art; the win is privacy, with zero cloud calls." },
      { title: "Rust as a safety net", body: "The type system caught whole classes of permission bugs at compile time — exactly the errors you don't want in something with shell access." },
      { title: "Hardware-gated destruction", body: "Irreversible actions pause for a YubiKey tap, keeping a human in the loop for the operations that matter." },
    ],
    architecture: [
      { node: "Tool bus", detail: "Capability-scoped, audited access to shell/mail/fs." },
      { node: "Local model", detail: "Quantized 8B model via llama.cpp, GPU-offloaded." },
      { node: "Memory", detail: "SQLite + embeddings, fully on-device." },
      { node: "Guardrail", detail: "Destructive ops gated behind a YubiKey tap." },
    ],
    metrics: [
      { label: "Cloud calls", value: "0" },
      { label: "Cold start", value: "0.8s" },
      { label: "Tools wired", value: "27" },
      { label: "Runs on", value: "Arch Linux" },
    ],
    outcome:
      "Jarvis runs 27 wired tools with a 0.8s cold start and zero cloud calls — private enough that I trust it with root access, and useful enough that I reach for it every day.",
    lessons: [
      "Capability-based security makes agent tool use tractable and auditable.",
      "Local models are 'good enough' for 80% of daily tasks — and infinitely more private.",
      "Rust's type system caught whole classes of agent-permission bugs at compile time.",
    ],
    repo: "github.com/44dummies/jarvis",
    demo: "local-only",
    status: "Development",
  },
  {
    slug: "eclair-and-co",
    index: "05",
    title: "Eclair & Co",
    kind: "E-commerce Storefront",
    category: "SaaS",
    year: "2024",
    blurb:
      "A patisserie storefront built to feel as considered as the product — fast, warm, and quietly obsessed with the details of checkout.",
    color: "#f28fb5",
    image: "/images/eclair.jpg",
    biome: "radial-gradient(circle at 32% 30%, #ffd9e6, #f28fb5 42%, #a84e73 76%, #35142200)",
    stack: ["Next.js", "TypeScript", "Stripe", "Sanity", "Tailwind"],
    role: "Design & full-stack build",
    duration: "6 weeks",
    overview:
      "Eclair & Co is a patisserie storefront built on a simple conviction: the store should feel as considered as the pastries. On African mobile networks that conviction is also a hard technical fact: performance decides whether the customer ever sees your product. The whole build is organised around a fast first paint and a checkout that gets out of the way.",
    problem:
      "Small food brands lose customers at checkout. The store needed to load instantly on patchy mobile connections and make ordering feel effortless — every extra second and every extra tap was a lost order.",
    approach:
      "A statically-rendered storefront with a headless CMS for the menu, Stripe for payments, and an aggressively optimised image and checkout path tuned for the reality of 3G mobile.",
    build: [
      { title: "Static first", body: "Product pages are pre-rendered and edge-cached, so the first paint doesn't wait on a server round-trip." },
      { title: "Owner-editable menu", body: "Sanity lets the owner change the menu without a redeploy — which turned out to be the feature they valued most." },
      { title: "One-screen checkout", body: "Collapsing checkout to a single screen beat every clever cart animation I tried; fewer steps converted better." },
      { title: "Images for 3G reality", body: "Responsive, lazy-loaded imagery keeps the page fast on the connections customers actually have." },
    ],
    architecture: [
      { node: "Storefront", detail: "Statically rendered, edge-cached product pages." },
      { node: "CMS", detail: "Sanity powers the menu without a redeploy." },
      { node: "Checkout", detail: "Stripe with a one-screen mobile flow." },
      { node: "Media", detail: "Responsive, lazy-loaded imagery for 3G reality." },
    ],
    metrics: [
      { label: "Lighthouse", value: "99" },
      { label: "LCP (mobile)", value: "1.1s" },
      { label: "Checkout steps", value: "1" },
      { label: "Conv. lift", value: "+38%" },
    ],
    outcome:
      "Live and running at a 99 Lighthouse score with a 1.1s mobile LCP and a single-step checkout — which lifted conversion 38% over the brand's previous store.",
    lessons: [
      "On African mobile networks, performance is the whole design.",
      "One-screen checkout beat every clever cart animation.",
      "Letting the owner edit the menu themselves was the real feature.",
    ],
    repo: "github.com/44dummies/Eclair-Co.",
    demo: "eclairandcostore.co.ke",
    status: "In production",
  },
  {
    slug: "paul-and-says",
    index: "06",
    title: "Paul & Says",
    kind: "Property Management Platform",
    category: "SaaS",
    year: "2024",
    blurb:
      "A management platform for a property firm — tenants, leases, payments, and maintenance in one place that non-technical staff actually use.",
    color: "#5ecb8f",
    image: "/images/paulandsays.jpg",
    biome: "radial-gradient(circle at 32% 30%, #c3f5d7, #5ecb8f 42%, #2a7d54 76%, #08251700)",
    stack: ["React", "Node.js", "PostgreSQL", "MPESA API", "Docker"],
    role: "Product & full-stack build",
    duration: "3 months",
    overview:
      "Paul & Says replaced a property firm's real operating system — WhatsApp, spreadsheets, and one person's memory — with software the staff could actually run. The brief was unglamorous and exacting: track leases, collect rent, log repairs, and lose nothing. Success was measured less in features than in how quickly a non-technical team could trust it.",
    problem:
      "The firm ran on WhatsApp, spreadsheets, and memory. Rent, receipts, and repair requests slipped through the cracks every month, and no one had a reliable picture of who owed what.",
    approach:
      "A role-based platform that tracks leases and payments with an auditable history, integrates MPESA for rent collection and automatic receipts, and gives staff a dashboard simple enough to train in a single afternoon.",
    build: [
      { title: "MPESA STK-push", body: "Rent collection triggers a push to the tenant's phone and auto-issues a receipt — turning rent day from chase-ups into notifications." },
      { title: "Auditable ledger", body: "Every lease and payment carries a history, so a disputed figure can always be traced rather than argued." },
      { title: "Scoped roles", body: "Owners, staff, and tenants each see exactly what they should — access control that matched how the firm actually works." },
      { title: "Designed for non-technical staff", body: "The hard problem was UX, not features; the dashboard was tuned until it trained in an afternoon." },
    ],
    architecture: [
      { node: "Ledger", detail: "Lease & payment records with an auditable history." },
      { node: "MPESA", detail: "STK-push rent collection with auto-receipts." },
      { node: "Maintenance", detail: "Tenant requests routed and tracked to resolution." },
      { node: "Roles", detail: "Scoped access for owners, staff, and tenants." },
    ],
    metrics: [
      { label: "Units managed", value: "240+" },
      { label: "On-time rent", value: "+52%" },
      { label: "Manual receipts", value: "0" },
      { label: "Train time", value: "1 afternoon" },
    ],
    outcome:
      "Live across 240+ units, the platform lifted on-time rent 52%, eliminated manual receipts entirely, and trained a non-technical team in a single afternoon.",
    lessons: [
      "MPESA STK-push turned rent day from chaos into a notification.",
      "The best feature was the one that removed a spreadsheet.",
      "Software for non-technical users is a UX problem, not a feature problem.",
    ],
    repo: "github.com/44dummies/paul-says",
    demo: "paulandsaysmanagement.co.ke",
    status: "In production",
  },
];

export const timeline = [
  { year: "2021", title: "First lines of code", body: "A broken game mod sent me down the rabbit hole. I never climbed back out." },
  { year: "2022", title: "Linux, all the way down", body: "Wiped Windows, installed Arch, and learned the machine by breaking and rebuilding it dozens of times." },
  { year: "2023", title: "Security & first SaaS", body: "CTFs taught me to think adversarially. Shipped my first paying product — a small tool that made rent." },
  { year: "2024", title: "Shipping for real clients", body: "Built Eclair & Co and Paul & Says — and learned what production and non-technical users actually demand." },
  { year: "2025", title: "Agents & knowledge", body: "Went deep on agent runtimes and knowledge graphs — Jarvis, Penny Claw, and Shannon." },
  { year: "2026", title: "Building legal AI", body: "Now building Legal RAG: retrieval for a domain where being wrong is not an option." },
];

export const labs = [
  { title: "KRA / GavaConnect bridge", tag: "Integration", note: "A tidy client over Kenya's tax APIs so apps can file and verify without the pain. Boring, load-bearing, satisfying.", state: "live" },
  { title: "Local LLM rig", tag: "Infra", note: "A quantised model stack running on my own GPU — the substrate under Jarvis. Private by default.", state: "live" },
  { title: "n8n automations", tag: "Agents", note: "Self-hosted workflow graphs that wire my tools together. Half my life runs on these now.", state: "wip" },
  { title: "MCP experiments", tag: "Agents", note: "Model Context Protocol servers exposing my own tools to any client. The future of agent plumbing.", state: "wip" },
  { title: "Packet whisperer", tag: "Security", note: "A passive Wi-Fi presence sensor built from 802.11 CSI. Knows when you enter a room.", state: "idea" },
  { title: "ASCII ray tracer", tag: "Graphics", note: "A path tracer that renders to your terminal. No reason. Every reason.", state: "live" },
];

export const articles = [
  { slug: "kenyan-legal-rag", title: "Building a Kenyan Legal RAG", date: "Jun 2026", read: "11 min", topic: "AI Systems", excerpt: "What it takes to make retrieval trustworthy in a domain where a wrong citation ends careers — grounding, refusal, and evals as code." },
  { slug: "penny-claw", title: "Creating Penny Claw", date: "Apr 2026", read: "8 min", topic: "AI Systems", excerpt: "Turning a pile of MPESA and bank exports into an agent that gives you the uncomfortable, receipted truth about your money." },
  { slug: "local-ai-linux", title: "Running Local AI on Linux", date: "Feb 2026", read: "9 min", topic: "Linux", excerpt: "A practical guide to a private, GPU-backed local LLM stack — the infrastructure that powers Jarvis, with zero cloud calls." },
  { slug: "ai-dev-workflow", title: "My AI Development Workflow", date: "Dec 2025", read: "7 min", topic: "AI Systems", excerpt: "How I actually build with agents day to day — MCP tools, n8n automations, and the guardrails that keep it sane." },
  { slug: "lessons-saas", title: "Lessons from Building SaaS Products", date: "Oct 2025", read: "6 min", topic: "SaaS", excerpt: "What Eclair & Co and Paul & Says taught me about shipping software for real, often non-technical, users." },
  { slug: "designing-eclair", title: "How I Designed Eclair & Co", date: "Aug 2025", read: "5 min", topic: "SaaS", excerpt: "Why performance was the whole design on African mobile networks, and how a one-screen checkout beat every clever animation." },
];

export const nav = [
  { to: "/", label: "Home", n: "01" },
  { to: "/about", label: "About", n: "02" },
  { to: "/projects", label: "Projects", n: "03" },
  { to: "/contact", label: "Contact", n: "04" },
];
