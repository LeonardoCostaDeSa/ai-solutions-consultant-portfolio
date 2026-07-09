
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
    tagline: 'A search engine that answers legal and regulatory questions — and links every answer to its original source.',
    title: 'KBSE: Knowledge Base Search Engine',
    category: 'engineering',
    techTags: ['Python', 'Django', 'CrewAI', 'ChromaDB', 'Azure OpenAI'],
    impactMetric: '94% Answer Accuracy',
    painPoint: "In 2024, AI chatbots answered legal questions with confidence — and no sources. Legal teams couldn't trust them.",
    quote: "The legal team only started trusting the system when every answer showed the exact law it came from.",
    context: "KPMG's Legal and Corporate teams needed to consult legislation and internal legal knowledge. This was 2024: generative models were still weak at precise information retrieval. And in a legal context, a wrong reference can compromise real analyses and decisions.",
    problem: "Conversational models of the time had low precision when searching large document bases. A confident answer with a wrong legal reference is worse than no answer. The teams needed more than answers. They needed the applicable legislation, a contextual interpretation, references to case law when relevant — and a direct link to the original source, so anyone could verify the answer in one click.",
    solution: "KBSE is a search engine built on RAG — retrieval-augmented generation: the model answers from retrieved documents, not from memory. The pipeline has four stages. Retrieval finds the most relevant documents by vector search. Consolidation organizes and combines the retrieved evidence. Validation checks the consistency of that evidence before any text is generated. The answer stage then writes the response: the applicable legislation, an interpretation in context, case-law references when they apply, and a direct link to the source. Users rated the answers, and that feedback — stored in Supabase — drove three months of refinement.",
    role: "This was a team project. I worked on the RAG architecture, implemented the retrieval, consolidation and answer pipeline, and helped structure the vector base (ChromaDB with Azure OpenAI embeddings). I also sat with the Legal and Corporate teams through the validation rounds.",
    insight: "After about three months of testing with Legal and Corporate professionals, the system reached 94% validated answer accuracy — and 99% of its answers were rated relevant by the users. The lesson from building RAG in 2024: when the model is weak, the architecture has to carry the precision. Retrieval, consolidation and validation did the work the model couldn't.",
    highlights: [
      "Every answer links to the original legal source",
      "94% validated accuracy · 99% user-rated relevance",
      "Built in 2024, when models were far weaker — the architecture carried the precision"
    ],
    constraints: [
      "2024 models: generative AI was still unreliable at precise retrieval. The architecture had to compensate for the model, not lean on it.",
      "Legal domain: a wrong legal reference can compromise analyses and decisions. Traceability was a requirement, not a feature.",
      "Every answer had to be verifiable by the user: applicable legislation, interpretation, case-law references, and a direct link to the source.",
    ],
    architecture: {
      overview: "Four stages, each with one job.\n\nRetrieval finds the most relevant documents by vector search — ChromaDB stores the embeddings, generated with Azure OpenAI. Consolidation organizes and merges the evidence retrieved across documents. Validation checks the consistency of that evidence before any answer is written. The answer stage generates the final response with its legal grounding: the applicable legislation, an interpretation in context, case-law and regulatory references when relevant, and a direct link to the original source.\n\nUser feedback closed the loop. Every rating was stored in Supabase and reviewed during the three-month validation with the Legal and Corporate teams. The pipeline was refined against real usage, not against a benchmark.",
      decisions: [
        {
          title: "Validate before generating",
          choice: "A validation stage checks the consistency of the retrieved evidence before the answer is written.",
          alternatives: ["Generate directly from retrieval — standard RAG"],
          rationale: "In 2024, the model was the weak link. Letting it write from unchecked excerpts meant confident answers built on wrong evidence. Checking the evidence first cost latency — and paid for it in trust.",
        },
        {
          title: "Link to the source, don't just cite it",
          choice: "Every answer carries a direct link to the original document, next to the legislation and the interpretation.",
          alternatives: ["Textual citations only"],
          rationale: "A citation asks the user to trust the system. A link lets the user check. For a legal team, verifying an answer in one click is what turned the tool from a curiosity into something they actually used.",
        },
        {
          title: "Measure with users, not benchmarks",
          choice: "About three months of evaluation with the Legal and Corporate teams, rating real answers. Feedback stored in Supabase.",
          alternatives: ["Offline benchmark evaluation"],
          rationale: "The teams' real questions were the distribution that mattered — no benchmark reproduced them. Rating live answers for three months produced two honest numbers: 94% validated accuracy and 99% rated relevance. Numbers earned that way hold up.",
        },
      ],
      tradeoffs: [
        "The validation stage adds latency to every query. In a legal context, a slower correct answer beats a fast wrong one — the trade was deliberate.",
        "Built with 2024 models, so the pipeline carries heavy scaffolding. Newer models would need less of it. The traceability layer — sources, links, validation — stays valuable no matter how good the model gets.",
      ],
    },
    results: [
      { metric: '94%', label: 'validated answer accuracy', detail: 'measured with the business teams during validation' },
      { metric: '99%', label: 'answers rated relevant', detail: 'by Legal and Corporate users over ~3 months' },
      { metric: '3 months', label: 'of user validation', detail: 'every rating stored in Supabase and reviewed' },
      { metric: '1 click', label: 'to the original source', detail: 'every answer links to the document behind it' },
    ],
  },
  {
    id: 'revisa',
    slug: 'revisa-master-express',
    featured: true,
    order: 1,
    palette: { base: '#2a1608', glow: '#FDBA74', accent: '#F97316', ambient: '#1a120c' },
    archetype: 'editorial',
    tagline: 'Professors are overloaded, so students wait weeks for feedback. My platform delivers an expert-level review in fifteen minutes.',
    title: 'Revisa Express',
    category: 'engineering',
    techTags: ['Python', 'Django', 'CrewAI', 'ChromaDB'],
    impactMetric: '80% Less Analysis Time',
    painPoint: 'Professors are overloaded, and students are left without guidance on their manuscripts.',
    quote: "We wrote down every question our best reviewer asks. Then we taught each one to an agent.",
    context: "Graduate students need expert feedback on their manuscripts. But professors are overloaded, so guidance arrives late, thin — or not at all.",
    problem: "Students were left to guess what was wrong with their own work. Expert human review exists, but it is slow, expensive and scarce: a proper first review takes a senior reviewer about six hours. Revisa Master needed a way to give every student an expert-level review, fast.",
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
    order: 5,
    palette: { base: '#0d2b22', glow: '#6EE7B7', accent: '#10B981', ambient: '#0a1a14' },
    archetype: 'field',
    tagline: 'Revisa Master consultants sell hours. This app turns each session into a client-ready record.',
    title: 'Saving Time App',
    category: 'engineering',
    techTags: ['React Native', 'OpenAI API', 'SQLite'],
    impactMetric: 'Production Beta',
    painPoint: 'Clients bought consulting hours, but the record of what happened inside those hours was too informal.',
    quote: "The product wasn't the app. It was turning an informal client-update habit into a system.",
    context: "Revisa Master sells consulting hours. After each demand, clients need to understand what was done, why it mattered, and what happens next.",
    problem: "Consultants were writing updates by hand, or recording too little. That made the work harder to explain, weakened client trust, and made revenue tracking less precise.",
    solution: "I built a beta mobile app for Revisa Master consultants. At the end of a client demand, the consultant records an audio note. AI turns it into a session summary and next-step list, then the record updates that client's database. The app uses SQLite on mobile and syncs once a day, so the workflow works without pressuring the VPS.",
    role: "I mapped the business pain, designed the workflow, and built the mobile architecture, local storage and AI summarization flow.",
    insight: "The hard part was not the app screen. It was understanding that clients needed confidence in the hours they bought, and the company needed a clean record of time spent per demand.",
    highlights: [
      "Production beta used by Revisa Master consultants",
      "SQLite mobile store with daily sync to reduce VPS load",
      "Session summaries and next steps generated from audio"
    ],
    constraints: [
      "The client buys hours, so the record had to explain the value of the work without forcing consultants into a second reporting workflow.",
      "The app had to work well on mobile and avoid pressuring a small VPS with constant writes.",
      "The output had to be useful for the client and for internal revenue tracking, not just a pretty AI summary."
    ],
    results: [
      { metric: 'Beta', label: 'in production', detail: 'used by Revisa Master consultants after client demands' },
      { metric: '1/day', label: 'database sync', detail: 'SQLite on mobile, daily sync to reduce VPS load' },
      { metric: 'Audio to record', label: 'session summary', detail: 'summary and next steps update the client database' },
      { metric: 'Higher trust', label: 'client relationship', detail: 'clearer explanation of what happened inside contracted hours' },
    ]
  },
  {
    id: 'sdm-rt',
    slug: 'tax-reform-delivery-model',
    featured: true,
    order: 4,
    palette: { base: '#2b2008', glow: '#FCD34D', accent: '#F59E0B', ambient: '#1a1408' },
    archetype: 'strata',
    tagline: "Brazil's largest tax reform had no ready-made delivery model. I helped build one with AI inside the workflow.",
    title: 'Tax Reform Delivery Model',
    category: 'AI Adoption',
    techTags: ['Service Design', 'AI Agents', 'Process Mapping'],
    impactMetric: '30-60% Efficiency Gain',
    painPoint: "Client demand surged around Brazil's tax reform, but the delivery methodology had to be invented while the work was already moving.",
    quote: "The old model was not broken. The problem was that Brazil had changed the tax system underneath it.",
    context: "Brazil's Tax Reform is the largest in the country's history. Inside KPMG Tax Transformation, the team had to serve a massive, high-criticality demand without a specific methodology ready for this new kind of engagement.",
    problem: "Running client workshops was already hard. The reform added new stakeholders, new information flows and a new AI layer that did not exist in the old workflow. Materials arrived through email, chat, Teams, Meet transcripts, Miro boards and individual notes. The team needed one delivery model that could turn that mess into a validated action plan.",
    solution: "I helped redesign the delivery into six phases: Business Context, Kickoff, Pre-workshop, Workshop, Operational Impact Matrix and Action Plan / Executive Summary. AI agents supported the flow where information piled up: consolidating materials for Business Context, reading stakeholder forms before workshops, updating working spreadsheets, and turning transcripts, notes and Miro outputs into the Operational Impact Matrix.",
    role: "I translated the consulting methodology into an AI-enabled delivery model, designed the agents and templates, and wrote execution materials with the team.",
    insight: "The model kept the consultants in control. AI did not replace the Tax work; it organized the information around it. Tax Transformation leadership later presented 30-60% efficiency gains on covered activities, and the team kept using the model across reform projects.",
    highlights: [
      "Six-phase delivery model for Brazil's largest tax reform",
      "AI agents for emails, Teams/Meet transcripts, forms, Miro and working spreadsheets",
      "30-60% efficiency gain presented by Tax Transformation leadership"
    ],
      constraints: [
        "No ready-made methodology existed for this reform. The team had to design the delivery model while demand was already high.",
        "Inputs came from many places: email, chat, Teams, Meet transcripts, Miro boards, stakeholder forms and individual notes.",
        "The Tax team delivered the validated mapping and action plan. Implementation moved to another practice, so the model needed a clear boundary."
      ],
      architecture: {
        overview: "The delivery model had six phases.\n\nBusiness Context mapped the client's areas, stakeholders and initial material. Kickoff aligned objectives, teams and responsibilities. Pre-workshop collected structured information from mapped stakeholders. Workshop sessions mapped the work with the client. The Operational Impact Matrix turned activities, transcripts, notes and Miro outputs into a shared working artifact. The Action Plan / Executive Summary closed the Tax Transformation engagement and prepared the handoff to implementation teams.\n\nAI agents entered where information was hardest to consolidate: gathering materials for Business Context, reading forms before workshops, updating working spreadsheets, and drafting the Operational Impact Matrix from workshop evidence.",
        decisions: [
          {
            title: "Start with Business Context",
            choice: "Map stakeholders, areas and scattered materials before the first client workshop.",
            alternatives: ["Start directly with workshops", "Collect context informally during kickoff"],
            rationale: "The workshops only worked when consultants arrived with enough context to be proactive. Business Context gave the team a common map before the client sessions began.",
          },
          {
            title: "Put agents where information piled up",
            choice: "Use AI agents for emails, chat, Teams and Meet transcripts, Miro outputs, stakeholder forms and working spreadsheets.",
            alternatives: ["One generic assistant for the whole project", "Manual consolidation by each consultant"],
            rationale: "The hard part was not generating text. It was joining many sources into a working artifact the team could validate with the client.",
          },
          {
            title: "Keep the delivery boundary clear",
            choice: "Tax Transformation delivered the impact matrix, action plan and executive summary. Implementation moved to another area.",
            alternatives: ["Extend the same model into implementation"],
            rationale: "A clear boundary kept the methodology honest. The Tax team owned diagnosis and action planning; implementation required a different delivery practice.",
          },
        ],
        tradeoffs: [
          "The AI layer had to work inside KPMG delivery artifacts, not as a separate tool consultants would forget to use.",
          "Coordinating areas and stakeholders was slower than building prompts, but it was the only way to make the model fit real delivery.",
        ],
      },
      results: [
        { metric: '30-60%', label: 'efficiency gain', detail: 'presented by Tax Transformation leadership after scout 2025' },
        { metric: '6', label: 'delivery phases', detail: 'from Business Context to Action Plan / Executive Summary' },
        { metric: "Brazil's largest", label: 'tax reform', detail: 'new work required a dedicated methodology' },
        { metric: 'Still used', label: 'by the team', detail: 'model continues across Tax Reform consulting delivery' },
      ],
  },
  {
    id: 'workshop',
    slug: 'ai-opportunity-mapping',
    featured: false,
    order: 6,
    palette: { base: '#2b1508', glow: '#FDBA74', accent: '#FB923C', ambient: '#190f08' },
    archetype: 'grid',
    tagline: 'Teams mapped real work first. Only then did they design AI into it.',
    title: 'AI Workflow Workshop',
    category: 'AI Adoption',
    techTags: ['Facilitation', 'Miro', 'Process Mapping'],
    impactMetric: '12-Hour Workshop',
    painPoint: 'Some professionals thought they knew nothing about AI. Others thought one prompt would solve everything.',
    quote: "Real AI adoption starts when people map the work, not when someone teaches prompts.",
    context: "KPMG teams in Legal, Corporate, SALT and Tax Transformation needed to understand where AI belonged in their own work cells.",
    problem: "A lecture would not change the workflow. The gap was practical: teams needed to see their own process, identify friction, and decide where AI could help without pretending every problem was a one-shot prompt.",
    solution: "I designed and facilitated a 12-hour hands-on workshop. Each group picked a real process, mapped the current workflow, broke it into steps, and translated the best opportunities into AI agents, prompts, prototypes or solution specs. Some outputs became real projects.",
    role: "I created the methodology and facilitated the sessions, with support from other consultants during group work.",
    insight: "The workshop worked because it served two audiences at once: it gave confidence to people who thought AI was beyond them, and it slowed down people who thought one prompt solved the whole job.",
    highlights: [
      "Legal, Corporate, SALT and Tax Transformation work cells",
      "12-hour hands-on format with real processes",
      "Prototypes, agents and specs from mapped workflows"
    ],
    constraints: [
      "The workshop could not be a lecture. People needed to work on their own processes, otherwise the adoption would stay abstract.",
      "The room had two opposite problems: people afraid they knew nothing about AI and people convinced a single prompt solved the whole workflow.",
      "Some outputs became real projects, but the confidential solutions themselves could not be named publicly."
    ],
    results: [
      { metric: '12h', label: 'hands-on format', detail: 'icebreaker, exposition, process mapping, group dynamics and discussion' },
      { metric: '4', label: 'work cells', detail: 'Legal, Corporate, SALT and Tax Transformation' },
      { metric: '6+', label: 'solution directions', detail: 'agents, prompts, prototypes and specs from real workflows' },
      { metric: 'Two groups', label: 'changed behavior', detail: 'confidence for beginners, more rigor for prompt-first users' },
    ]
  },
  {
    id: 'training',
    slug: 'ai-training-for-all',
    featured: false,
    order: 7,
    palette: { base: '#1f1338', glow: '#C4B5FD', accent: '#8B5CF6', ambient: '#150e24' },
    archetype: 'grid',
    tagline: '1,600 professionals. 8,000 training hours. AI taught through real business problems.',
    title: 'AI Training for ALL',
    category: 'AI Adoption',
    techTags: ['Education', 'Change Mgmt', 'CARTS'],
    impactMetric: '8,000 Training Hours',
    painPoint: 'KPMG wanted broad AI adoption, but capability varied across the Tax practice.',
    quote: "We had to keep the people online from becoming just a little photo in the event.",
    context: "From 2023/2024 onward, KPMG intensified its AI adoption agenda. The firm wanted to change how people worked over the next years, not just introduce a tool.",
    problem: "A one-off lecture would not build capability at the scale of 1,600 professionals. The program had to work for people in the room and online, and it had to connect AI to real Tax work.",
    solution: "I helped design and facilitate recurring quarterly editions. Each edition had a theme: prompts, agents, or workflow opportunity mapping. Before the event, participants submitted real business problems through a form. Those became hands-on cases during the training. A dedicated online facilitator managed polls, chat and engagement so remote participants stayed active.",
    role: "I idealized and executed the first event, built examples, forms and exercises, facilitated sessions, and organized results for leadership.",
    insight: "The program reached 1,600 people and 8,000 aggregate training hours before I left. The metric mattered, but the design mattered more: adoption only works when the training uses the work people actually do.",
    highlights: [
      "8,000 aggregate training hours",
      "Quarterly themes: prompts, agents and opportunity mapping",
      "Hybrid event design for online and in-person participants"
    ],
    constraints: [
      "The program had to work for 1,600 people with very different AI maturity levels.",
      "Hybrid delivery meant online participants needed active facilitation, not passive attendance.",
      "Exercises had to come from real business problems collected before the event, or the training would feel generic."
    ],
    results: [
      { metric: '1,600+', label: 'professionals reached', detail: 'online and in-person participants across Tax' },
      { metric: '8,000', label: 'training hours', detail: 'aggregate hours achieved before I left the program' },
      { metric: 'Quarterly', label: 'program rhythm', detail: 'themes included prompts, agents and opportunity mapping' },
      { metric: 'Real cases', label: 'hands-on exercises', detail: 'built from pre-event forms submitted by participants' },
    ]
  },
  {
    id: 'doc-analysis',
    slug: 'document-analysis-automation',
    featured: true,
    order: 2,
    palette: { base: '#161638', glow: '#818CF8', accent: '#4F46E5', ambient: '#12122a' },
    archetype: 'vault',
    tagline: "An $8 billion lawsuit's evidence sat in 50,000 scanned documents. My pipeline read every page — and lawyers validated what it found.",
    title: 'Document Analysis Automation',
    category: 'engineering',
    techTags: ['Python', 'Power Automate', 'AI Builder', 'Azure Document Intelligence'],
    impactMetric: 'Every Page of 50,000+ Docs',
    painPoint: 'An $8 billion lawsuit depended on what was inside 50,000 old documents. Nobody could read them all by hand.',
    quote: "Three AI tools had already failed on these documents. The problem wasn't reasoning — it was reading.",
    context: "An $8 billion lawsuit was running in two countries at once, the US and Brazil. It involved retroactive tax exemptions. The evidence lived in more than 50,000 documents going back to 1958 — each between 3 and 600 pages. Some were handwritten. Some were typed on typewriters. Some were printed and scanned. Only the newest were born digital. The task: find every mention of profit or dividend distributions to shareholders.",
    problem: "Reading everything by hand was off the table. The manual estimate: 5 consultants for 10 days — per batch of 500 documents, and only for the initial questions. At that pace, 50,000 documents were out of reach. Three AI tools had already been tried: an internal LLM chat, Microsoft Copilot, and a batch document tool. All three failed for the same reason: their OCR could not read the old documents. When the text extraction fails, no language model can save the answer. The project then came to the Tax AI team.",
    solution: "I built a pipeline that reads everything, in four stages. First, a Python script splits every document into single pages and tracks each one, so no page can be silently skipped. Second, each page goes through OCR. Clean pages use the standard OCR; the hard ones — handwriting, typewriter text, degraded scans — go to a custom model I trained on Azure Document Intelligence. Third, a chain of prompts interprets each page, looks for evidence and structures what it finds. Each prompt has one job, like a small agent. Power Automate orchestrates the whole flow. The output is a spreadsheet with one row per page and a column that says whether the page mentions dividends.",
    role: "Three tools had failed before I was called in. I designed the full architecture and built every stage: the Python pre-processing, the Power Automate flow, the prompt chain, and the custom OCR model. I also worked directly with KPMG's lawyers to define how the results would be validated.",
    insight: "The pipeline read every page of more than 50,000 documents with 98% accuracy — validated by KPMG lawyers on a 10% sample. Its output became one of the main pieces of evidence used in the case. Two decisions made the difference: split documents into single pages so nothing gets skipped, and fix the reading layer first — the tools that failed before failed at OCR, not at reasoning.",
    highlights: [
      "Every page of 50,000+ documents read — no sampling",
      "98% accuracy, validated by KPMG lawyers on a 10% sample",
      "Custom OCR model for handwriting, typewriter text and old scans"
    ],
    constraints: [
      "Legal context: the output had to survive scrutiny from lawyers on both sides. 'Mostly right' was not an option — every page's result had to be auditable.",
      "The documents spanned seven decades of formats: handwritten, typewritten, printed-and-scanned, born-digital. One OCR setup could not read them all.",
      "Scale: more than 50,000 documents, 3 to 600 pages each. Any manual step in the middle would break the pipeline.",
    ],
    architecture: {
      overview: "The pipeline has four stages.\n\nPre-processing: a Python script splits every document into individual pages and tracks each one, so nothing is silently dropped. Reading: standard OCR (AI Builder) handles the clean pages; the difficult ones — handwriting, typewriter text, degraded scans — go to a custom model trained on Azure Document Intelligence. Interpretation: a chain of prompts processes each page. One prompt interprets the content. One looks for evidence of dividend or profit distributions. One structures the finding into the output format. Each prompt has a single job, like a small agent, which makes failures easy to locate. Delivery: Power Automate orchestrates the flow end to end and writes the result — one row per page, with the evidence flag.\n\nWhy page-level? Because accuracy collapses when a model reads a 600-page document at once. Small inputs made the reading accurate and made every error traceable to a single page.",
      decisions: [
        {
          title: "Split everything into single pages",
          choice: "A Python script breaks every document into one-page units before anything else runs.",
          alternatives: ["Process whole documents", "Chunk by sections"],
          rationale: "Two reasons. Accuracy: a model reading one page at a time misses far less than a model reading a 600-page file. Auditability: when a lawyer questions a result, the answer points to one page, not to a whole document. Tracking pages individually also guarantees coverage — no page can be silently skipped.",
        },
        {
          title: "Train a custom OCR model for the hard documents",
          choice: "Standard OCR for clean pages. A custom Azure Document Intelligence model for handwriting, typewriter text and degraded scans.",
          alternatives: ["One generic OCR for everything — the approach the failed tools used"],
          rationale: "The three tools that failed before all failed at the same stage: reading. They reasoned fine over text they could extract, but they could not extract text from the old documents. Fixing the reading layer was the whole game. A dedicated model for the difficult formats raised extraction quality enough for the rest of the pipeline to work.",
        },
        {
          title: "A chain of single-purpose prompts, not one big prompt",
          choice: "Separate prompts to interpret, find evidence and structure the output — orchestrated like a small agent flow.",
          alternatives: ["One prompt doing everything"],
          rationale: "In a legal context, you need to know where a mistake happened. With one giant prompt, a wrong answer is a black box. With a chain, each step's output is visible — an error is traceable to the step that produced it, and fixable without touching the rest.",
        },
      ],
      tradeoffs: [
        "Power Automate orchestrates the flow instead of a pure-code pipeline. Inside KPMG's Microsoft stack, it was the fastest path to production and kept the flow readable for non-engineers — at the cost of less flexibility than code.",
        "The custom OCR model took training effort that a generic OCR would not need. The three failed attempts had already proven the generic route did not work on these documents. The effort was the price of accuracy.",
      ],
    },
    results: [
      { metric: '50,000+', label: 'documents read', detail: 'every page — 3 to 600 pages per document, no sampling' },
      { metric: '98%', label: 'validated accuracy', detail: 'checked by KPMG lawyers on a 10% sample' },
      { metric: '3', label: 'tools had failed before', detail: 'all defeated by the OCR on the old documents' },
      { metric: 'Key evidence', label: 'in the lawsuit', detail: "the pipeline's output was used throughout the case" },
    ]
  },
  {
    id: 'lei-do-bem',
    slug: 'lei-do-bem-form-analysis',
    featured: false,
    order: 8,
    palette: { base: '#0e2135', glow: '#7DD3FC', accent: '#0EA5E9', ambient: '#0a1622' },
    archetype: 'strata',
    tagline: 'R&D tax forms still needed consultants. The MVP helped them catch weak descriptions before clients saw them.',
    title: 'Tax Incentive Form Analysis — Lei do Bem',
    category: 'engineering',
    techTags: ['Copilot Studio', 'Power Automate', 'Power Apps'],
    impactMetric: '~3h Saved per Form',
    painPoint: 'Critical tax-incentive forms came back for correction when project, material or supplier descriptions missed the required standard.',
    quote: "This could not be fully automated. The point was to make expert review faster without removing the expert.",
    context: "Lei do Bem is Brazil's R&D tax incentive law. Companies submit detailed forms about innovation projects, services, technical staff, materials and third-party contracting.",
    problem: "The business team had to check whether every description met the Ministry's expected level of detail before the form went to the client. Weak descriptions created rework and risk, but the review still needed human validation.",
    solution: "I delivered an MVP review assistant in Copilot Studio and Power Automate. It checked form fields against KPMG knowledge and the Ministry's standard, then pointed consultants to descriptions that needed correction. Consultants still made the final judgment.",
    role: "I gathered requirements with the business team and built the MVP end to end.",
    insight: "The right automation was not a replacement for consultants. It was a quality layer that saved roughly three hours per form while keeping the critical review human-in-the-loop.",
    highlights: [
      "~3 hours saved per form",
      "Human-in-the-loop review for a critical tax step",
      "Checked project, service, staff, material and third-party descriptions"
    ],
    constraints: [
      "Exact client and form volumes cannot be disclosed.",
      "The review was a critical tax step, so consultants still had to validate every correction before anything went to the client.",
      "The MVP was delivered to support the workflow, but it was not presented as a fully finished production automation."
    ],
    results: [
      { metric: '~3h', label: 'saved per form', detail: 'estimated time saved for each collaborator reviewing a form' },
      { metric: 'MVP', label: 'review assistant', detail: 'delivered in Copilot Studio and Power Automate' },
      { metric: '5 fields', label: 'quality checks', detail: 'projects, services, staff, materials and third-party contracting' },
      { metric: 'Human review', label: 'kept in control', detail: 'consultants still made the final judgment on a critical step' },
    ]
  }
];
