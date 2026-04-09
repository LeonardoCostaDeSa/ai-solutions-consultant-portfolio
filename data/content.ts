
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
    title: 'KBSE: Knoweledge Base Search Engine',
    category: 'engineering',
    techTags: ['Python', 'CrewAI', 'RAG', 'Azure'],
    impactMetric: '94% Answer Accuracy',
    image: '/img/CardKBSE.png',
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
    title: 'Revisa Express',
    category: 'engineering',
    techTags: ['Python', 'Django', 'CrewAI', 'Postgres'],
    impactMetric: '80% Less Analysis Time',
    image: '/img/CardRevisaExpress.jpg',
    quote: "High-quality academic evaluation is not intuition — it’s structure. Once expert judgment is made explicit, it can be scaled.",
    context: "Academic consulting teams spend a disproportionate amount of time on first-level readings: understanding a client’s paper, diagnosing structural/methodological issues, and assessing quality before deep revision begins.",
    problem: "This initial diagnostic phase was time-consuming, costly, and highly dependent on senior reviewers’ availability. The problem wasn’t writing alone — it was the lack of a fast, structured, and repeatable way to apply academic judgment at scale.",
    solution: "A multi-agent academic analysis system structured around the 5 pillars of academic writing (Clarity, Methodology, Relevance, Technical Quality, Norms). Each pillar is implemented as a specialized AI agent that produces structured evaluations. A Redactor agent then consolidates all analyses into a single, standardized diagnostic report exported as a branded PDF.",
    role: "Translated tacit academic evaluation criteria into explicit, modular AI agents. Designed and implemented the multi-agent orchestration and backend architecture (Python/Django/CrewAI).",
    insight: "Reduced analysis time by ~80%. High-quality academic evaluation is not intuition—it is structure. By codifying tacit expert criteria into 5 distinct agents, we proved that complex intellectual critique can be scaled without sacrificing rigor.",
    highlights: [
      "5 specialized agents mirroring academic evaluation",
      "Automated PDF diagnostic report generation",
      "Scalable architecture replacing manual triage"
    ]
  },
  {
    id: 'saving-time',
    title: 'Saving Time App',
    category: 'engineering',
    techTags: ['React Native', 'OpenAI API', 'SQLite'],
    impactMetric: 'Zero Manual Reporting',
    image: 'https://images.unsplash.com/photo-1555421689-d68471e189f2?q=80&w=2070&auto=format&fit=crop',
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
    title: 'Tax Reform Delivery Model',
    category: 'AI Adoption',
    techTags: ['Service Design', 'AI Personas', 'Ops'],
    impactMetric: 'Scalable AI Adoption',
    image: '/img/CardTaxReform.png',
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
    title: 'AI Opportunity Mapping',
    category: 'AI Adoption',
    techTags: ['Facilitation', 'Miro', 'Process Mapping'],
    impactMetric: '6+ Deployed Solutions',
    image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=2070&auto=format&fit=crop',
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
    title: 'AI Training for ALL',
    category: 'AI Adoption',
    techTags: ['Education', 'Change Mgmt', 'CARTS'],
    impactMetric: '1,600+ Professionals',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop',
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
    title: 'Document Analysis Automation',
    category: 'engineering',
    techTags: ['Copilot Studio', 'Power Automate', 'AI Builder', 'Python'],
    impactMetric: '50,000 Docs in 6 Hours',
    image: 'https://images.unsplash.com/photo-1568667256549-094345857637?q=80&w=2070&auto=format&fit=crop',
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
    title: 'Tax Incentive Form Analysis — Lei do Bem',
    category: 'engineering',
    techTags: ['Copilot Studio', 'Power Automate', 'Power Apps'],
    impactMetric: 'From Sample to Full Analysis',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2070&auto=format&fit=crop',
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
