
import type { FlowDiagramData } from '../components/diagrams/FlowDiagram';

/**
 * Architecture diagrams per project id. Skeleton versions drawn from the
 * published case-study material — refined with real detail after the
 * technical interview (PR D). Projects without an entry simply don't render
 * a diagram section.
 */
export const diagrams: Record<string, FlowDiagramData> = {
  revisa: {
    title: 'Revisa Express — multi-agent review pipeline',
    nodes: [
      { id: 'manuscript', label: 'Manuscript', sublabel: 'client upload', kind: 'input', col: 0, row: 2 },
      { id: 'pipeline', label: 'Ingestion', sublabel: 'Celery · chunk + embed', kind: 'process', col: 1, row: 2 },
      { id: 'pgvector', label: 'pgvector', sublabel: 'PostgreSQL', kind: 'store', col: 1, row: 4 },
      { id: 'clarity', label: 'Clarity', sublabel: 'agent', kind: 'agent', col: 2, row: 0 },
      { id: 'methodology', label: 'Methodology', sublabel: 'agent', kind: 'agent', col: 2, row: 1 },
      { id: 'relevance', label: 'Relevance', sublabel: 'agent', kind: 'agent', col: 2, row: 2 },
      { id: 'technical', label: 'Technical Quality', sublabel: 'agent', kind: 'agent', col: 2, row: 3 },
      { id: 'norms', label: 'Norms', sublabel: 'agent', kind: 'agent', col: 2, row: 4 },
      { id: 'redactor', label: 'Redactor', sublabel: 'consolidation agent', kind: 'agent', col: 3, row: 2 },
      { id: 'report', label: 'Diagnostic report', sublabel: 'branded PDF', kind: 'output', col: 4, row: 2 },
    ],
    edges: [
      { from: 'manuscript', to: 'pipeline' },
      { from: 'pipeline', to: 'pgvector', label: 'embeddings' },
      { from: 'pipeline', to: 'clarity' },
      { from: 'pipeline', to: 'methodology' },
      { from: 'pipeline', to: 'relevance' },
      { from: 'pipeline', to: 'technical' },
      { from: 'pipeline', to: 'norms' },
      { from: 'clarity', to: 'redactor' },
      { from: 'methodology', to: 'redactor' },
      { from: 'relevance', to: 'redactor' },
      { from: 'technical', to: 'redactor' },
      { from: 'norms', to: 'redactor' },
      { from: 'redactor', to: 'report' },
    ],
  },

  'doc-analysis': {
    title: 'Document Analysis — end-to-end automation pipeline',
    nodes: [
      { id: 'docs', label: '50,000 docs', sublabel: 'scanned · 1958–present', kind: 'input', col: 0, row: 0 },
      { id: 'splitter', label: 'Page splitter', sublabel: 'Python', kind: 'process', col: 1, row: 0 },
      { id: 'queue', label: 'SharePoint', sublabel: 'processing queue', kind: 'store', col: 2, row: 0 },
      { id: 'orchestrator', label: 'Power Automate', sublabel: 'orchestration', kind: 'process', col: 3, row: 0 },
      { id: 'ai', label: 'AI Builder', sublabel: '+ Copilot Studio', kind: 'agent', col: 4, row: 0 },
      { id: 'sheet', label: 'Evidence sheet', sublabel: 'one row per page', kind: 'output', col: 5, row: 0 },
    ],
    edges: [
      { from: 'docs', to: 'splitter' },
      { from: 'splitter', to: 'queue', label: 'pages' },
      { from: 'queue', to: 'orchestrator' },
      { from: 'orchestrator', to: 'ai' },
      { from: 'ai', to: 'sheet' },
    ],
  },

  kbse: {
    title: 'KBSE — multi-agent semantic search with citation validation',
    nodes: [
      { id: 'question', label: 'Legal question', kind: 'input', col: 0, row: 0 },
      { id: 'retrieval', label: 'Semantic retrieval', sublabel: 'agent', kind: 'agent', col: 1, row: 0 },
      { id: 'vstore', label: 'Vector store', sublabel: 'legislation · memos', kind: 'store', col: 1, row: 1 },
      { id: 'consolidation', label: 'Consolidation', sublabel: 'cross-document agent', kind: 'agent', col: 2, row: 0 },
      { id: 'validation', label: 'Validation / audit', sublabel: 'agent', kind: 'agent', col: 3, row: 0 },
      { id: 'answer', label: 'Answer', sublabel: 'with explicit citations', kind: 'output', col: 4, row: 0 },
    ],
    edges: [
      { from: 'question', to: 'retrieval' },
      { from: 'vstore', to: 'retrieval' },
      { from: 'retrieval', to: 'consolidation' },
      { from: 'consolidation', to: 'validation' },
      { from: 'validation', to: 'answer' },
      { from: 'validation', to: 'retrieval', label: 're-query', kind: 'feedback' },
    ],
  },
};
