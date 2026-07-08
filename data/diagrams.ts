
import type { FlowDiagramData } from '../components/diagrams/FlowDiagram';

/**
 * Architecture diagrams per project id. Skeleton versions drawn from the
 * published case-study material — refined with real detail after the
 * technical interview (PR D). Projects without an entry simply don't render
 * a diagram section.
 */
export const diagrams: Record<string, FlowDiagramData> = {
  revisa: {
    title: 'Revisa Express — 8-agent review pipeline (sequential)',
    nodes: [
      { id: 'manuscript', label: 'Manuscript', sublabel: 'client upload', kind: 'input', col: 0, row: 2 },
      { id: 'triage', label: 'Triage', sublabel: 'nano · go/no-go', kind: 'process', col: 1, row: 2 },
      { id: 'clarity', label: 'Clarity', sublabel: 'P1 agent', kind: 'agent', col: 2, row: 0 },
      { id: 'methodology', label: 'Methodology', sublabel: 'P2 agent', kind: 'agent', col: 2, row: 1 },
      { id: 'relevance', label: 'Relevance', sublabel: 'P3 agent', kind: 'agent', col: 2, row: 2 },
      { id: 'technical', label: 'Technical Writing', sublabel: 'P4 agent', kind: 'agent', col: 2, row: 3 },
      { id: 'norms', label: 'Norms', sublabel: 'P5 agent', kind: 'agent', col: 2, row: 4 },
      { id: 'edital', label: 'Brief Fit', sublabel: 'EA · if attached', kind: 'agent', col: 2, row: 5 },
      { id: 'writer', label: 'Writer', sublabel: 'A6 · consolidation', kind: 'agent', col: 3, row: 2 },
      { id: 'copyeditor', label: 'Copy Editor', sublabel: 'P6 · drift guard', kind: 'process', col: 4, row: 2 },
      { id: 'validator', label: 'Validator', sublabel: 'A7 · QA gate', kind: 'agent', col: 5, row: 2 },
      { id: 'report', label: 'Diagnostic Report', sublabel: 'WeasyPrint PDF', kind: 'output', col: 6, row: 2 },
    ],
    edges: [
      { from: 'manuscript', to: 'triage' },
      { from: 'triage', to: 'clarity' },
      { from: 'triage', to: 'methodology' },
      { from: 'triage', to: 'relevance' },
      { from: 'triage', to: 'technical' },
      { from: 'triage', to: 'norms' },
      { from: 'triage', to: 'edital' },
      { from: 'clarity', to: 'writer' },
      { from: 'methodology', to: 'writer' },
      { from: 'relevance', to: 'writer' },
      { from: 'technical', to: 'writer' },
      { from: 'norms', to: 'writer' },
      { from: 'edital', to: 'writer' },
      { from: 'writer', to: 'copyeditor' },
      { from: 'copyeditor', to: 'validator' },
      { from: 'validator', to: 'report' },
    ],
  },

  'doc-analysis': {
    title: 'Document Analysis — page-level pipeline, orchestrated in Power Automate',
    nodes: [
      { id: 'docs', label: '50,000+ docs', sublabel: '1958–present · 3–600 pages', kind: 'input', col: 0, row: 1 },
      { id: 'splitter', label: 'Page splitter', sublabel: 'Python · tracks every page', kind: 'process', col: 1, row: 1 },
      { id: 'ocr', label: 'Standard OCR', sublabel: 'AI Builder', kind: 'process', col: 2, row: 0 },
      { id: 'di', label: 'Custom OCR model', sublabel: 'Azure Document Intelligence', kind: 'agent', col: 2, row: 2 },
      { id: 'prompts', label: 'Prompt chain', sublabel: 'interpret · find · structure', kind: 'agent', col: 3, row: 1 },
      { id: 'sheet', label: 'Evidence sheet', sublabel: 'one row per page', kind: 'output', col: 4, row: 1 },
    ],
    edges: [
      { from: 'docs', to: 'splitter' },
      { from: 'splitter', to: 'ocr', label: 'clean pages' },
      { from: 'splitter', to: 'di', label: 'hard pages' },
      { from: 'ocr', to: 'prompts' },
      { from: 'di', to: 'prompts' },
      { from: 'prompts', to: 'sheet' },
    ],
  },

  kbse: {
    title: 'KBSE — four-stage RAG pipeline with source-linked answers',
    nodes: [
      { id: 'question', label: 'Legal question', kind: 'input', col: 0, row: 0 },
      { id: 'retrieval', label: 'Retrieval', sublabel: 'vector search', kind: 'agent', col: 1, row: 0 },
      { id: 'vstore', label: 'ChromaDB', sublabel: 'Azure OpenAI embeddings', kind: 'store', col: 1, row: 1 },
      { id: 'consolidation', label: 'Consolidation', sublabel: 'merge evidence', kind: 'agent', col: 2, row: 0 },
      { id: 'validation', label: 'Validation', sublabel: 'consistency check', kind: 'agent', col: 3, row: 0 },
      { id: 'answer', label: 'Answer', sublabel: 'legislation · source links', kind: 'output', col: 4, row: 0 },
      { id: 'feedback', label: 'User feedback', sublabel: 'Supabase', kind: 'store', col: 5, row: 1 },
    ],
    edges: [
      { from: 'question', to: 'retrieval' },
      { from: 'vstore', to: 'retrieval' },
      { from: 'retrieval', to: 'consolidation' },
      { from: 'consolidation', to: 'validation' },
      { from: 'validation', to: 'answer' },
      { from: 'validation', to: 'retrieval', label: 're-query', kind: 'feedback' },
      { from: 'answer', to: 'feedback', label: 'ratings', kind: 'feedback' },
    ],
  },
};
