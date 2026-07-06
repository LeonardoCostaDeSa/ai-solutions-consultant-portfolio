
export interface ProcessStep {
  id: string;
  title: string;
  description: string;
  decisionNote: string;
  icon: string;
}

/** Color system for a project's generative environment. */
export interface ProjectPalette {
  /** Deep tinted wash behind everything (dark, colored). */
  base: string;
  /** Light color for the volumetric light layer. */
  glow: string;
  /** Brand accent for strokes, labels and diagram theming. */
  accent: string;
  /** Near-black ambient the section settles into. */
  ambient: string;
}

/** Visual archetype driving the generative geometry of an environment. */
export type EnvironmentArchetype =
  | 'editorial' // ruled lines + one large arc — considered composition
  | 'vault'     // receding translucent planes — volumes in perspective
  | 'archive'   // tall thin columns with a light slot
  | 'grid'      // structured dot/line lattice with a highlighted cluster
  | 'field'     // nodes scattered along flowing paths
  | 'strata';   // layered horizontal bands, slightly offset

export interface ArchitectureDecision {
  title: string;
  choice: string;
  alternatives?: string[];
  rationale: string;
}

export interface ResultStat {
  metric: string;
  label: string;
  detail?: string;
}

export interface Solution {
  /** Short internal id — analytics events, diagram keys, environment seeds. */
  id: string;
  /** SEO slug for the dedicated page URL: /solutions/<slug>. */
  slug: string;
  title: string;
  category: 'engineering' | 'AI Adoption';
  techTags: string[];
  impactMetric: string;
  painPoint: string;
  /** Featured projects get full-viewport immersive sections on /solutions. */
  featured: boolean;
  /** Journey ordering (featured first) and next/prev navigation. */
  order: number;
  palette: ProjectPalette;
  archetype: EnvironmentArchetype;
  /** One-line impact statement for heroes. */
  tagline: string;
  quote: string;
  context: string;
  problem: string;
  solution: string;
  role: string;
  insight: string;
  highlights: string[];
  // Deep technical sections — filled from the technical interview; pages fall
  // back to context/problem/solution/insight until these exist.
  constraints?: string[];
  architecture?: {
    overview: string;
    decisions: ArchitectureDecision[];
    tradeoffs: string[];
  };
  results?: ResultStat[];
}
