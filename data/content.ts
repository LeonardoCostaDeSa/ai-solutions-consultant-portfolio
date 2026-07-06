
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
    tagline: 'Legal answers that cite their sources — 94% validated accuracy.',
    title: 'KBSE: Knowledge Base Search Engine',
    category: 'engineering',
    techTags: ['Python', 'CrewAI', 'RAG', 'Azure'],
    impactMetric: '94% Answer Accuracy',
    painPoint: 'Legal teams couldn\'t trust AI answers — no citations, no audit trail.',
    quote: "In regulated environments, accuracy alone is insufficient — trust emerges from traceability. Designing AI systems that can justify themselves is what turns experimentation into adoption.",
    context: "Corporate tax and legal teams operate on massive, fragmented knowledge bases: legislation, regulatory guidance, internal memos, and technical opinions spread across dozens of documents.",
    problem: "Traditional keyword search fails in this context — it lacks semantic understanding, provides no reasoning trace, and offers poor traceability. The core challenge was retrieving accurate legal-tax answers while preserving explainability and source traceability — not just 'what is the answer,' but where it comes from and why it is valid.",
    solution: "KBSE is a web-based multi-agent semantic search engine built with Python and CrewAI. Instead of relying on a single LLM response, the system decomposes reasoning into specialized stages: semantic retrieval from a vector store, cross-document consolidation, validation/auditing of retrieved excerpts, and final answer generation with explicit citations. Every response includes the synthesized answer and the exact legal text used as evidence.",
    role: "Led the solution architecture and reasoning design. Implemented the multi-agent workflow using CrewAI (retrieval, consolidation, validation, redaction) and designed the RAG pipeline with citation validation logic.",
    insight: "Achieved 94% accuracy in validation tests. In regulated sectors, trust is not about magic; it is about traceability. By validating every output against source documents, we turned 'hallucination risks' into an auditable compliance asset.",
    highlights: [
      "Multi-agent reasoning decomposition (Retrieval -> Audit)",
      "Vector-based RAG with explicit citation trails",
      "Sequential validation to eliminate hallucinations"
    ]
  },
  {
    id: 'revisa',
    slug: 'revisa-master-express',
    featured: true,
    order: 1,
    palette: { base: '#2a1608', glow: '#FDBA74', accent: '#F97316', ambient: '#1a120c' },
    archetype: 'editorial',
    tagline: 'A six-hour expert review, delivered in fifteen minutes — in production, every day.',
    title: 'Revisa Express',
    category: 'engineering',
    techTags: ['Python', 'Django', 'CrewAI', 'ChromaDB'],
    impactMetric: '80% Less Analysis Time',
    painPoint: 'Senior reviewers stuck on first-pass diagnosis instead of high-value work.',
    quote: "High-quality academic evaluation is not intuition — it’s structure. Once expert judgment is made explicit, it can be scaled.",
    context: "Academic consulting teams spend a disproportionate amount of time on first-level readings: understanding a client’s paper, diagnosing structural/methodological issues, and assessing quality before deep revision begins.",
    problem: "This initial diagnostic phase was time-consuming, costly, and highly dependent on senior reviewers’ availability. The problem wasn’t writing alone — it was the lack of a fast, structured, and repeatable way to apply academic judgment at scale.",
    solution: "A cheap triage pass screens every upload before the expensive pipeline runs. Five pillar agents (clarity, methodology, relevance, technical quality, norms) then evaluate the manuscript against a 52-question rubric grounded in a ChromaDB knowledge base of writing references — never the student's own text, which is extracted as plain text and never embedded. A writer agent drafts the consolidated report, a copy-editing pass corrects it under a drift guard, and a validator agent audits it before publication. Output is a branded PDF via WeasyPrint. Runs in production with end-to-end Langfuse tracing.",
    role: "Co-founder and sole engineer. Translated tacit academic evaluation criteria into explicit, modular AI agents. Designed, implemented and operate the multi-agent orchestration and backend architecture (Python/Django/CrewAI/ChromaDB/Celery/Docker) — a system my own business depends on daily.",
    insight: "Real production average: ~13.7 minutes per report at ~$1.78 in model cost, with zero failed LLM calls across 210 traced calls. High-quality academic evaluation isn't intuition, it's structure — codify the tacit rubric into agents with clear contracts, and rigor scales without becoming a bottleneck.",
    highlights: [
      "8-agent pipeline — 5 pillar reviewers, a writer, a copy editor and a validator",
      "RAG grounded in a curated knowledge base, not the student's own text",
      "Zero failed LLM calls across 210 traced production calls"
    ],
    constraints: [
      "Runs on a 2 vCPU / 8GB production VPS — the worker deliberately caps at concurrency=1 so one analysis's agent fan-out never competes with a concurrent user's pipeline for memory.",
      "The student's manuscript is never embedded or indexed — only extracted as text, cached briefly, and passed inline inside a sanitized prompt envelope. What's indexed is the reference knowledge base: writing norms, the grading rubric, style guidelines.",
      "Every finding in the final report has to trace back to one of the 52 rubric questions — no agent output is accepted as an unattributed claim.",
    ],
    architecture: {
      overview: "A cheap triage pass (a low-cost model) screens every upload before the expensive pipeline commits, rejecting non-academic or malformed submissions early. Five pillar agents then evaluate the manuscript against a 52-question rubric — clarity & alignment, methodological rigor, relevance & contribution, technical writing, and norms & structure — each grounded in a ChromaDB knowledge base of academic-writing references. A sixth agent checks alignment against the submission brief when one is attached. A writer agent consolidates every finding into a six-section report; a copy-editing pass corrects it under a drift guard that discards the correction if it changes the report's length by more than 25%; a validator agent audits the final report before it's allowed to publish.\n\nOrchestration is a single sequential Celery chain, not a parallel fan-out — deliberately. The five pillars have no API-side reason to stay sequential now that the account runs on higher-tier rate limits, but the production VPS has 2 vCPUs, and the CrewAI + LiteLLM + ChromaDB import cost alone is heavy enough that raising intra-analysis concurrency would risk memory contention with a concurrent user's pipeline. The constraint is protected at the infrastructure layer, not worked around at the prompt layer.",
      decisions: [
        {
          title: "Sequential, not parallel, agent execution",
          choice: "A single Celery chain() — the five pillar agents run one after another, not as a parallel group.",
          alternatives: ["Parallel fan-out via Celery group/chord", "An explicit graph (e.g. LangGraph) with a fan-in node"],
          rationale: "The real constraint isn't API rate limits — the account has since moved to a tier with headroom to run pillars concurrently. It's the 2 vCPU production VPS: every Celery execution carries a heavy CrewAI + LiteLLM + ChromaDB import, and raising concurrency inside one analysis would risk contending for memory with a second user's analysis. Concurrency stays capped at 1 until the VPS is resized — a deliberate trade-off, not an oversight.",
        },
        {
          title: "RAG indexes the rubric, not the student's work",
          choice: "ChromaDB stores the reference knowledge base — writing norms, the grading rubric, style guidelines. The manuscript is extracted as plain text, cached briefly, and passed inline inside a sanitized prompt envelope.",
          rationale: "Embedding a student's unpublished academic work would be a data-handling liability with no upside — the agents don't need semantic retrieval over the student's own text, they need to look up institutional grading criteria and apply it to what's in front of them.",
        },
        {
          title: "Eight narrow agents, not one long prompt",
          choice: "Five pillar-specific reviewers plus a writer, a copy editor and a validator — each with its own role, backstory and temperature.",
          alternatives: ["One large prompt covering every evaluation criterion"],
          rationale: "The grading rubric has 52 discrete questions, and every finding in the final report has to trace back to the one that raised it — that granularity doesn't survive collapsing into a single prompt. Splitting by pillar also lets each agent run at the temperature its task needs (a deterministic 0.0 for norms-checking, a looser 0.3 for clarity feedback) and isolates failure: one pillar erroring doesn't take down the other four.",
        },
      ],
      tradeoffs: [
        "Migrated model providers in production (Anthropic → OpenAI) without touching business logic — an LLM abstraction layer keeps the provider behind an environment variable, so the switch that solved a hard rate-limit ceiling was a config change, not a rewrite.",
        "Consciously pinned to an older CrewAI release rather than force an upgrade — the next major version needs a dependency bump that isn't compatible with the rest of the stack yet. Tracked as deliberate technical debt, not an oversight.",
        "No explicit graph orchestration, even though the pipeline now has a conditional branch and a fan-in step that a graph would model more natively than a linear chain — the original role/goal/backstory abstraction fit the pipeline when it was simpler, and hasn't been revisited since it grew.",
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
    painPoint: 'Consulting value lost in the gap between doing the work and documenting it.',
    quote: "In consulting, value isn’t just delivered — it’s tracked and remembered. Systems that preserve context are what turn sessions into progress.",
    context: "Consulting work lives in conversations: meetings, sessions, calls. But what reaches clients is often fragmented, delayed, or inconsistently documented.",
    problem: "Consultants faced manual time tracking, inconsistent documentation, and limited client visibility into progress. This created unnecessary administrative overhead and reduced transparency.",
    solution: "A mobile-first consulting support app based on 'capture once, reuse everywhere'. Consultants track time and record audio notes directly in the app. Audio is automatically transcribed and summarized using AI to generate a standardized session report (changes made, time spent, next steps). It follows an offline-first architecture for reliability.",
    role: "Designed the end-to-end workflow, implemented AI-assisted transcription and structured summarization, and built the mobile application architecture and local persistence layer.",
    insight: "Eliminated 100% of manual reporting. Value in consulting is often lost in the gap between doing and documenting. By automating the capture layer, we recovered billable focus and ensured zero information loss.",
    highlights: [
      "Offline-first mobile architecture",
      "Auto-transcription & structured summarization",
      "Automated client-facing report generation"
    ]
  },
  {
    id: 'sdm-rt',
    slug: 'tax-reform-delivery-model',
    featured: false,
    order: 5,
    palette: { base: '#2b2008', glow: '#FCD34D', accent: '#F59E0B', ambient: '#1a1408' },
    archetype: 'strata',
    tagline: 'A delivery model that made AI adoption repeatable under pressure.',
    title: 'Tax Reform Delivery Model',
    category: 'AI Adoption',
    techTags: ['Service Design', 'AI Personas', 'Ops'],
    impactMetric: 'Scalable AI Adoption',
    painPoint: 'Brazil\'s biggest tax reform vs. a delivery model that wouldn\'t scale.',
    quote: "AI creates value in consulting only when it is embedded into the delivery model. Without structure, intelligence doesn’t scale.",
    context: "Brazil’s Tax Reform represents one of the most complex regulatory transformations in history, creating an exponential increase in client demand for KPMG.",
    problem: "The existing delivery approach was not designed to scale under this pressure. Teams needed to deliver complex projects with efficiency and consistency, while effectively adopting AI as an accelerator, not a parallel experiment.",
    solution: "Redesigned the Service Delivery Model (SDM) into six structured phases (Business Context, Kick-off, Pre-Workshop, Workshops, Impact Matrix, Action Plan). To operationalize this, I created role-based AI accelerators (personas, prompt banks, templates) embedded directly into consultants' workflows for each phase.",
    role: "Redesigned the end-to-end Service Delivery Model. Translated consulting methodology into structured, AI-enabled workflows. Developed AI accelerators and authored practical execution manuals.",
    insight: "Drove 30-80% efficiency gains in specific workflow tasks. AI alone does not solve scale; process does. By embedding AI into a rigid 6-phase delivery model, we turned a regulatory crisis into a standardized, repeatable operation.",
    highlights: [
      "6-phase AI-enabled delivery lifecycle",
      "Role-based AI personas (e.g., Impact Analyst)",
      "Standardized prompt banks & execution templates"
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
    quote: "AI adoption doesn’t start with tools — it starts with shared understanding. When people map their own work, automation stops being threatening and starts being obvious.",
    context: "Corporate Tax teams dealt with highly regulated, repetitive activities but faced challenges translating AI potential into practical, day-to-day solutions.",
    problem: "There was a clear gap between knowing AI exists and using it meaningfully. Delivery models evolved organically, limiting visibility on automation opportunities.",
    solution: "Designed and delivered an immersive, 12-hour hands-on workshop. Teams collaboratively mapped 'as-is' delivery models, identified opportunities using Impact x Effort analysis, and generated implementable solutions (AI personas, templates, workflows).",
    role: "Co-designed workshop methodology and facilitation flow. Guided teams in mapping delivery models and translating abstract AI concepts into concrete use cases aligned with Corporate Tax reality.",
    insight: "Produced 6+ deployable solutions in 12 hours. Adoption doesn't happen in lectures; it happens in the trenches. When teams map their own friction points, they identify high-impact automation opportunities that top-down strategy misses.",
    highlights: [
      "Collaborative 'As-Is' vs 'To-Be' mapping",
      "Impact x Effort prioritization matrix",
      "Translation of abstract needs to technical specs"
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
    painPoint: '1,600 professionals, fragmented AI literacy, no shared vocabulary.',
    quote: "AI adoption at scale is not about teaching tools — it’s about reshaping how people think about their work.",
    context: "As AI capabilities expanded within KPMG, the Tax area faced uneven knowledge, fragmented adoption, and usage disconnected from real business problems.",
    problem: "Without a unified approach, AI risked being underutilized or misused. The challenge was capability building at scale to ensure the entire practice could apply AI responsibly.",
    solution: "A large-scale, hybrid enablement program combining conceptual grounding, hands-on challenges, and real business applications. Structured around how work actually happens in Tax, covering opportunity identification, prompt engineering (CARTS framework), and solution architecture.",
    role: "Led the end-to-end design of the training program. Defined the pedagogical structure, challenges, and learning journey. Created all core content, frameworks, and exercises.",
    insight: "Upskilled ~1,600 professionals. The bottleneck was not technology, but literacy. By establishing a shared 'AI vocabulary' and architectural understanding, we shifted the firm from isolated experiments to enterprise-grade capability.",
    highlights: [
      "Hybrid pedagogical model (Concepts + Hands-on)",
      "CARTS framework for professional prompting",
      "Real business cases transformed into workflows"
    ]
  },
  {
    id: 'doc-analysis',
    slug: 'document-analysis-automation',
    featured: true,
    order: 2,
    palette: { base: '#161638', glow: '#818CF8', accent: '#4F46E5', ambient: '#12122a' },
    archetype: 'vault',
    tagline: '50,000 documents read in six hours for an $8B dispute.',
    title: 'Document Analysis Automation',
    category: 'engineering',
    techTags: ['Copilot Studio', 'Power Automate', 'AI Builder', 'Python'],
    impactMetric: '50,000 Docs in 6 Hours',
    painPoint: 'An $8B legal case riding on 50,000 docs — sample-only review wasn\'t enough.',
    quote: "When the stakes are measured in billions, AI must do more than assist — it must deliver certainty at scale. Turning 50,000 legacy documents into structured evidence is where automation meets accountability.",
    context: "A major legal dispute worth $8 billion was running in parallel between the US and Brazil. The case involved retroactive tax exemptions with significant financial impact for the end client. The analysis required searching through 50,000 scanned documents — dating back to 1958 — of various types (board minutes, commercial registry records) for terms indicating profit and dividend distributions to shareholders.",
    problem: "The initial estimate required a team of 5 consultants working for 10 days, and even then, only a sample-based review would be feasible. The volume, variety, and age of documents made comprehensive manual analysis impractical, leaving critical evidence potentially undiscovered.",
    solution: "Built an end-to-end automation pipeline: a Python script split documents into individual pages (dramatically improving analysis quality), which were then routed to a SharePoint processing folder. A Power Automate flow orchestrated the analysis using AI Builder and Copilot Studio. The deliverable was a spreadsheet with one row per page, including a column indicating whether the page mentioned dividends.",
    role: "Called in after multiple failed attempts by the business team to solve this with existing AI platforms. Designed the full solution architecture: Python page-splitting script, SharePoint integration, Power Automate orchestration with AI Builder and Copilot Studio. Delivered the end-to-end pipeline that produced auditable, page-level results.",
    insight: "Processed 50,000 documents in 6 hours with 98% accuracy (validated by the business team's sample audit). What would have taken 5 consultants 10 days — and still only covered a sample — became a complete, page-level analysis. The key was decomposing documents into pages before AI processing, which dramatically improved granularity and accuracy.",
    highlights: [
      "50,000 documents analyzed in 6 hours",
      "+400 hours of manual work saved",
      "98% accuracy validated by business team"
    ]
  },
  {
    id: 'lei-do-bem',
    slug: 'lei-do-bem-form-analysis',
    featured: false,
    order: 8,
    palette: { base: '#0e2135', glow: '#7DD3FC', accent: '#0EA5E9', ambient: '#0a1622' },
    archetype: 'strata',
    tagline: 'From sample-based review to full coverage.',
    title: 'Tax Incentive Form Analysis — Lei do Bem',
    category: 'engineering',
    techTags: ['Copilot Studio', 'Power Automate', 'Power Apps'],
    impactMetric: 'From Sample to Full Analysis',
    painPoint: 'R&D tax forms reviewed by sample — overlooked inconsistencies meant client losses.',
    quote: "When regulatory complexity meets limited capacity, AI doesn't replace expertise — it extends its reach. Turning sample-based review into full-scope analysis is how you protect clients at scale.",
    context: "The project supports the analysis of Lei do Bem (Brazil's R&D tax incentive law) forms linked to Research, Development, and Innovation (RD&I) initiatives. These forms are lengthy, highly detailed, and require specialized technical evaluation — covering innovative projects, R&D staffing, material procurement, and third-party service contracts.",
    problem: "With growing form volume and the Ministry of Science and Technology adopting AI to support responses, a significant bottleneck emerged. The small, highly specialized review team could only perform sample-based analysis rather than comprehensive review, increasing the risk of financial losses from undetected inconsistencies.",
    solution: "Designed and developed an automation solution using Copilot Studio and Power Automate to transform the review process from sample-based to full-scope analysis. The system enables faster, more consistent evaluation of every submitted form, reducing risk and expanding the team's review capacity across the entire client portfolio.",
    role: "Acted as the solution developer, participating in both requirements analysis with the business team and the design and development of the automation. Delivered end-to-end, connecting business understanding with technical implementation.",
    insight: "Transformed a bottleneck into a scalable process. By automating what was previously a manual, sample-based review, we enabled full-form analysis — giving consultants complete visibility into client submissions and significantly reducing the risk of financial impact from overlooked inconsistencies.",
    highlights: [
      "Transformed sample-based into full-form analysis",
      "Reduced operational bottlenecks in specialized review",
      "Expanded consultant visibility over entire client scope",
      "Mitigated financial risks from analysis gaps",
      "End-to-end delivery connecting business and technical layers"
    ]
  }
];
