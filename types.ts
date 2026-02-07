
export interface ProcessStep {
  id: string;
  title: string;
  description: string;
  decisionNote: string;
  icon: string;
}

export interface Solution {
  id: string;
  title: string;
  category: 'engineering' | 'strategy';
  techTags: string[];
  impactMetric: string;
  image: string;
  quote: string;
  context: string;
  problem: string;
  solution: string;
  role: string;
  insight: string;
  highlights: string[];
}
