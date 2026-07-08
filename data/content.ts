
import { ProcessStep, Solution } from '../types';

export const processSteps: ProcessStep[] = [
  {
    id: '1',
    title: 'Entropy Audit',
    description: 'We dive into the chaos. Mapping every manual hand-off, fragmented data silo, and repetitive bottleneck within your current workflow.',
    decisionNote: 'Goal: Identify the highest ROI friction point.',
    icon: 'Search'
  },
  {
    id: '2',
    title: 'Semantic Architecture',
    description: 'Designing the data bridge. We define how unstructured human knowledge converts into structured machine-readable logic.',
    decisionNote: 'Goal: Build a scalable foundational ontology.',
    icon: 'Layers'
  },
  {
    id: '3',
    title: 'Model Orchestration',
    description: 'Selecting the right brain for the job. Whether it is a local LLM for privacy or a specialized agentic workflow.',
    decisionNote: 'Goal: Balance latency, cost, and intelligence.',
    icon: 'Cpu'
  },
  {
    id: '4',
    title: 'Feedback Loops',
    description: 'Iterative refinement. Deploying shadow mode tests to ensure the system learns from edge cases before full deployment.',
    decisionNote: 'Goal: 99.9% reliability in human-AI handoffs.',
    icon: 'RefreshCw'
  }
];

export const solutions: Solution[] = [
  {
    id: 'kbse',
    slug: 'knowledge-base-search-engine',
    featured: true,
    order: 3,
    palette: { base: '#0c2830', glow: '#67E8F9', accent: '#06B6D4', ambient: '#0a1a1e' },
    archetype: 'archive',
    tagline: 'A search engine that answers legal and tax questions — and shows the exact law behind every answer.',
    title: 'KBSE: Knowledge Base Search Engine',
    category: 'engineering',
    techTags: ['Python', 'CrewAI', 'RAG', 'Azure'],
    impactMetric: '94% Answer Accuracy',
    painPoint: 'Legal teams couldn\'t trust AI answers — no citations, no audit trail.',
    quote: "The legal team only started trusting the system when every answer showed the exact law it came from.",
    context: "Corporate tax and legal teams work with huge, scattered knowledge bases. Legislation, regulatory guidance, internal memos and technical opinions live across dozens of documents.",
    problem: "Keyword search can't handle this. It doesn't understand meaning, and it can't show where an answer came from. The team needed accurate answers to legal and tax questions — with the source and the reasoning attached to each one.",
    solution: "KBSE is a search engine built with Python and CrewAI. It splits the work into four stages, each with its own agent. The first retrieves relevant passages from a vector store — a database that searches by meaning, not keywords. The second consolidates findings across documents. The third validates and audits the retrieved excerpts. The fourth writes the final answer with explicit citations. Every response shows the answer and the exact legal text behind it.",
    role: "I led the solution architecture and the reasoning design. I implemented the multi-agent workflow with CrewAI and built the retrieval pipeline with citation validation.",
    insight: "The system reached 94% accuracy in validation tests. The bigger lesson: the legal team adopted it because every answer could be checked against its source. An answer you can verify is useful. An answer you can't verify is a risk.",
    highlights: [
      "Four agents: retrieve, consolidate, validate, answer",
      "Every answer cites the exact legal text behind it",
      "A validation stage audits every excerpt before the answer is written"
    ]
  },
  {
    id: 'revisa',
    slug: 'revisa-master-express',
    featured: true,
    order: 1,
    palette: { base: '#2a1608', glow: '#FDBA74', accent: '#F97316', ambient: '#1a120c' },
    archetype: 'editorial',
    tagline: 'Reviewing an academic paper takes an expert six hours. My platform delivers the first full review in fifteen minutes.',
    title: 'Revisa Express',
    category: 'engineering',
    techTags: ['Python', 'Django', 'CrewAI', 'ChromaDB'],
    impactMetric: '80% Less Analysis Time',
    painPoint: 'Senior reviewers spent their hours on first readings instead of expert work.',
    quote: "We wrote down every question our best reviewer asks. Then we taught each one to an agent.",
    context: "Academic consulting teams lose a lot of time on first readings. Before any deep revision starts, a senior reviewer has to read the paper, diagnose its problems and judge its quality.",
    problem: "That first diagnosis was slow and expensive, and it depended on senior reviewers being available. The team didn't lack skill. It lacked a fast, repeatable way to apply expert judgment at scale.",
    solution: "A cheap triage model screens every upload first, so the expensive pipeline only runs on valid submissions. Then five agents review the manuscript, one per quality pillar: clarity, methodology, relevance, technical writing, and norms. Each agent works from a 52-question rubric and a knowledge base of writing references. The student's own text is never stored in that base. A writer agent drafts the report, a copy-editing pass corrects it, and a validator audits it before publication. The result is a branded PDF. Every AI call is traced in production.",
    role: "I co-founded the company and I am its only engineer. I turned our best reviewer's tacit criteria into explicit agents. I built the orchestration and the backend (Python, Django, CrewAI, ChromaDB, Celery, Docker), and I operate it in production. When it breaks, I am the one who fixes it.",
    insight: "In production, a report takes about 13.7 minutes and costs about $1.78 in model usage. Across 210 traced calls, zero failed. The lesson: write down what your expert actually checks. Once the rubric is explicit, agents can apply it — and rigor stops being a bottleneck.",
    highlights: [
      "8 agents: 5 pillar reviewers, a writer, a copy editor and a validator",
      "The knowledge base holds the rubric — never the student's text",
      "Zero failed LLM calls across 210 traced production calls"
    ],
    constraints: [
      "The system runs on a small server (2 vCPUs / 8GB). The worker handles one analysis at a time, on purpose: two heavy pipelines at once could run the server out of memory.",
      "The student's manuscript is never embedded or indexed. It is extracted as plain text, cached briefly, and passed inside a sanitized prompt. Only the reference material is indexed: writing norms, the rubric, style guides.",
      "Every finding in the report must trace back to one of the 52 rubric questions. No unattributed claims.",
    ],
    architecture: {
      overview: "A cheap triage model screens every upload before the expensive pipeline commits. It rejects non-academic or broken files early.\n\nFive pillar agents then review the manuscript against a 52-question rubric. The pillars: clarity, methodology, relevance, technical writing, and norms. Each agent looks up its criteria in a ChromaDB knowledge base of academic-writing references. A sixth agent checks the paper against the submission brief, when one is attached. A writer agent consolidates every finding into a six-section report. A copy-editing pass then corrects the text under a drift guard: if the correction changes the report's length by more than 25%, the system throws the correction away. Finally, a validator agent audits the report before it can publish.\n\nThe agents run in a single sequential Celery chain — one task after another, never in parallel. This is deliberate. The API rate limits would allow parallel pillars now. The production server would not: it has 2 vCPUs, and each pipeline run imports CrewAI, LiteLLM and ChromaDB, which is heavy. Two analyses running their agents at once could exhaust memory. I protect that limit at the infrastructure layer, not with prompt workarounds.",
      decisions: [
        {
          title: "Sequential, not parallel, agent execution",
          choice: "One Celery chain. The five pillar agents run one after another, never as a parallel group.",
          alternatives: ["Parallel fan-out via Celery group/chord", "An explicit graph (e.g. LangGraph) with a fan-in node"],
          rationale: "Rate limits are not the constraint anymore — the account tier could handle parallel pillars. The server is the constraint. It has 2 vCPUs, and every pipeline run imports CrewAI, LiteLLM and ChromaDB, which is heavy. Parallel agents inside one analysis could starve a second user's analysis of memory. So concurrency stays at 1 until the server grows. A chosen trade-off, not an oversight.",
        },
        {
          title: "RAG indexes the rubric, not the student's work",
          choice: "ChromaDB stores only the reference material: writing norms, the grading rubric, style guides. The manuscript is extracted as plain text, cached briefly, and passed inside a sanitized prompt.",
          rationale: "Embedding a student's unpublished work would create a data-handling liability with no benefit. The agents don't need to search the student's text. They need to look up the grading criteria and apply them to the text in front of them.",
        },
        {
          title: "Eight narrow agents, not one long prompt",
          choice: "Five pillar reviewers plus a writer, a copy editor and a validator. Each agent has its own role and its own temperature.",
          alternatives: ["One large prompt covering every evaluation criterion"],
          rationale: "The rubric has 52 discrete questions, and every finding must trace back to one of them. That granularity dies inside a single giant prompt. Separate agents also get the right temperature per task: a strict 0.0 for norms-checking, a looser 0.3 for clarity feedback. And failure stays contained — one pillar can error without taking down the other four.",
        },
      ],
      tradeoffs: [
        "I migrated model providers in production (Anthropic → OpenAI) without touching business logic. An abstraction layer keeps the provider behind an environment variable, so the switch was a config change, not a rewrite.",
        "I kept CrewAI pinned to an older version on purpose. The next major version needs dependencies the rest of the stack can't use yet. This is tracked, deliberate technical debt.",
        "The pipeline has no explicit graph orchestration, even though it now has a conditional branch and a fan-in step that a graph would model better. The current abstraction fit the pipeline when it was simpler. Revisiting it is on the list.",
      ],
    },
    results: [
      { metric: '13.7 min', label: 'average pipeline duration', detail: 'measured across production traces, not a target' },
      { metric: '$1.78', label: 'average cost per analysis', detail: 'median $1.92 · Langfuse-traced' },
      { metric: '0 / 210', label: 'failed LLM calls', detail: 'zero errors across every traced call in production' },
      { metric: '52', label: 'rubric questions', detail: 'every report finding traces back to one' },
    ],
  },
  {
    id: 'saving-time',
    slug: 'saving-time-app',
    featured: false,
    order: 4,
    palette: { base: '#0d2b22', glow: '#6EE7B7', accent: '#10B981', ambient: '#0a1a14' },
    archetype: 'field',
    tagline: 'Consulting sessions that document themselves.',
    title: 'Saving Time App',
    category: 'engineering',
    techTags: ['React Native', 'OpenAI API', 'SQLite'],
    impactMetric: 'Zero Manual Reporting',
    painPoint: 'Consultants did the work, then lost hours writing it up.',
    quote: "Consultants were losing billable hours writing reports. Now the app writes the report while they talk.",
    context: "Consulting work happens in conversations: meetings, sessions, calls. What reaches the client afterwards is often fragmented, late, or inconsistent.",
    problem: "Consultants tracked time by hand and wrote reports by hand. Documentation quality varied by person, and clients had little visibility into progress.",
    solution: "A mobile app built on one idea: capture once, reuse everywhere. The consultant tracks time and records audio notes in the app. AI transcribes and summarizes the audio into a standard session report: what changed, time spent, next steps. The app works offline first, so nothing is lost without a connection.",
    role: "I designed the workflow end to end. I built the mobile architecture, the local storage layer, and the AI transcription and summarization.",
    insight: "Manual reporting dropped to zero. The report now writes itself at the moment the work happens, so nothing gets lost between doing and documenting.",
    highlights: [
      "Works offline first — nothing is lost without a connection",
      "AI turns audio notes into a standard session report",
      "Client-ready reports with zero manual writing"
    ]
  },
  {
    id: 'sdm-rt',
    slug: 'tax-reform-delivery-model',
    featured: false,
    order: 5,
    palette: { base: '#2b2008', glow: '#FCD34D', accent: '#F59E0B', ambient: '#1a1408' },
    archetype: 'strata',
    tagline: 'I rebuilt how KPMG delivers tax-reform projects — with AI inside every step.',
    title: 'Tax Reform Delivery Model',
    category: 'AI Adoption',
    techTags: ['Service Design', 'AI Personas', 'Ops'],
    impactMetric: 'Scalable AI Adoption',
    painPoint: 'Brazil\'s biggest tax reform hit a delivery process that couldn\'t keep up.',
    quote: "We put the AI inside each step of the delivery process. That's when the teams actually used it.",
    context: "Brazil's Tax Reform is one of the most complex regulatory changes in the country's history. Client demand at KPMG grew exponentially.",
    problem: "The existing delivery model could not scale under that pressure. Teams needed to deliver complex projects fast and consistently — and adopt AI as part of the work, not as a side experiment.",
    solution: "I redesigned the Service Delivery Model into six phases: Business Context, Kick-off, Pre-Workshop, Workshops, Impact Matrix, and Action Plan. Then I built AI accelerators for each role in each phase: personas, prompt banks and templates that sit inside the consultant's normal workflow.",
    role: "I redesigned the delivery model end to end. I translated the consulting methodology into AI-enabled workflows, built the accelerators, and wrote the execution manuals.",
    insight: "Task time dropped 30–80% on the workflows the model covered. Delivery became repeatable under crisis-level demand — because the AI lived inside the process, not beside it.",
    highlights: [
      "Six delivery phases, each with AI built in",
      "AI personas per role — for example, an Impact Analyst",
      "Standard prompt banks and execution templates"
    ]
  },
  {
    id: 'workshop',
    slug: 'ai-opportunity-mapping',
    featured: false,
    order: 6,
    palette: { base: '#2b1508', glow: '#FDBA74', accent: '#FB923C', ambient: '#190f08' },
    archetype: 'grid',
    tagline: 'Teams mapped their own work — and found the automation themselves.',
    title: 'AI Opportunity Mapping',
    category: 'AI Adoption',
    techTags: ['Facilitation', 'Miro', 'Process Mapping'],
    impactMetric: '6+ Deployed Solutions',
    painPoint: 'Tax teams knew AI existed but couldn\'t translate it into their daily work.',
    quote: "When the teams mapped their own work, they found the automation opportunities themselves.",
    context: "Corporate Tax teams do highly regulated, repetitive work. They knew AI existed. Turning that into day-to-day solutions was the hard part.",
    problem: "There was a gap between knowing about AI and using it well. The delivery models had grown organically over the years, so nobody could see the automation opportunities clearly.",
    solution: "I co-designed and delivered a hands-on, 12-hour workshop. The teams mapped how their delivery actually works today. Then they scored each opportunity by impact and effort, and turned the best ones into concrete solutions: AI personas, templates and workflows.",
    role: "I co-designed the methodology and the facilitation flow. I guided the teams while they mapped their work, and I helped translate abstract AI ideas into concrete Corporate Tax use cases.",
    insight: "The workshop produced six deployable solutions in 12 hours. The teams found the opportunities in their own maps — which is exactly why they adopted the results.",
    highlights: [
      "Teams mapped their current work, then designed the future version",
      "Every opportunity scored by impact and effort",
      "Abstract needs turned into buildable specs"
    ]
  },
  {
    id: 'training',
    slug: 'ai-training-for-all',
    featured: false,
    order: 7,
    palette: { base: '#1f1338', glow: '#C4B5FD', accent: '#8B5CF6', ambient: '#150e24' },
    archetype: 'grid',
    tagline: '1,600 professionals, one shared AI vocabulary.',
    title: 'AI Training for ALL',
    category: 'AI Adoption',
    techTags: ['Education', 'Change Mgmt', 'CARTS'],
    impactMetric: '1,600+ Professionals',
    painPoint: '1,600 professionals, each using AI in a different way — or not at all.',
    quote: "We didn't teach a tool. We taught 1,600 people to see their own work differently.",
    context: "AI use inside KPMG's Tax practice was growing unevenly. Knowledge varied a lot from person to person, and much of the usage was disconnected from real business problems.",
    problem: "Without a shared foundation, AI risked being underused or misused. The challenge was to build real capability across the entire practice — 1,600 people — not just among a few enthusiasts.",
    solution: "I designed a hybrid training program: concepts, hands-on challenges, and real business applications. It was structured around how Tax work actually happens. People learned to spot automation opportunities, to write effective prompts with CARTS — a prompt-writing framework I created — and to understand how AI solutions are put together.",
    role: "I led the program design end to end: the pedagogical structure, the challenges, the learning journey, and all the core content and exercises.",
    insight: "About 1,600 professionals went through the program. The real bottleneck was literacy. Once everyone shared a vocabulary, isolated experiments turned into a firm-wide capability.",
    highlights: [
      "Concepts plus hands-on challenges — not lectures alone",
      "CARTS: a prompt-writing framework I created for professionals",
      "Real business cases turned into working workflows"
    ]
  },
  {
    id: 'doc-analysis',
    slug: 'document-analysis-automation',
    featured: true,
    order: 2,
    palette: { base: '#161638', glow: '#818CF8', accent: '#4F46E5', ambient: '#12122a' },
    archetype: 'vault',
    tagline: 'The evidence for an $8 billion lawsuit sat in 50,000 scanned documents. My pipeline read every page in six hours.',
    title: 'Document Analysis Automation',
    category: 'engineering',
    techTags: ['Copilot Studio', 'Power Automate', 'AI Builder', 'Python'],
    impactMetric: '50,000 Docs in 6 Hours',
    painPoint: 'An $8 billion lawsuit depended on what was inside 50,000 old documents. Nobody could read them all by hand.',
    quote: "The case was worth $8 billion. Sampling wasn't good enough — we read every page.",
    context: "An $8 billion lawsuit was running in two countries at once, the US and Brazil. It involved retroactive tax exemptions. The evidence lived in 50,000 scanned documents going back to 1958: board minutes, commercial registry records and more. The task was to find every mention of profit or dividend distributions to shareholders.",
    problem: "The manual estimate was 5 consultants working for 10 days. Even then, they could only review a sample. Critical evidence could stay buried.",
    solution: "I built a pipeline that reads everything. A Python script splits each document into individual pages — this one step made the AI's analysis far more accurate. The pages flow into SharePoint. From there, Power Automate orchestrates the analysis with AI Builder and Copilot Studio. The output is a spreadsheet with one row per page and a column that says whether the page mentions dividends.",
    role: "The business team had already tried to solve this with existing AI platforms, and failed. I was called in after that. I designed the full architecture and delivered the pipeline end to end, with auditable page-level results.",
    insight: "The pipeline read 50,000 documents in 6 hours with 98% accuracy, validated by the business team's own audit. The key decision was splitting documents into pages before the AI ran. Smaller inputs, much better accuracy.",
    highlights: [
      "50,000 documents read in 6 hours",
      "Over 400 hours of manual work saved",
      "98% accuracy, validated by the business team's audit"
    ]
  },
  {
    id: 'lei-do-bem',
    slug: 'lei-do-bem-form-analysis',
    featured: false,
    order: 8,
    palette: { base: '#0e2135', glow: '#7DD3FC', accent: '#0EA5E9', ambient: '#0a1622' },
    archetype: 'strata',
    tagline: 'The team could only check a sample of the forms. Now software checks every one.',
    title: 'Tax Incentive Form Analysis — Lei do Bem',
    category: 'engineering',
    techTags: ['Copilot Studio', 'Power Automate', 'Power Apps'],
    impactMetric: 'From Sample to Full Analysis',
    painPoint: 'Only a sample of the R&D tax forms got reviewed. Missed errors cost clients money.',
    quote: "The team could only check a sample of each batch. Now they check everything.",
    context: "Lei do Bem is Brazil's R&D tax incentive law. Companies file long, detailed forms about their innovation projects, R&D staffing, materials and contracts. KPMG's specialists review those forms.",
    problem: "The volume of forms kept growing. The review team didn't. The specialists could only review a sample of the forms — and every unchecked form was a financial risk for the client.",
    solution: "I designed and built an automation with Copilot Studio and Power Automate. It reviews every form, not a sample. The evaluation became faster and more consistent, and the team's capacity now covers the entire client portfolio.",
    role: "I was the solution developer. I sat with the business team to gather requirements, then designed and built the automation. I delivered it end to end.",
    insight: "The bottleneck became a scalable process. Consultants now see every form a client submits, and the risk of a missed inconsistency dropped sharply.",
    highlights: [
      "Every form reviewed — not a sample",
      "Fewer bottlenecks in the specialist review",
      "Consultants see the full client portfolio",
      "Lower risk of missed inconsistencies",
      "Delivered end to end, from requirements to production"
    ]
  }
];
