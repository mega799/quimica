
export interface ChemicalExample {
  name: string;
  formula: string;
  structure?: string;
  smiles?: string;
  description: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface SectionContent {
  type: 'text' | 'table' | 'list' | 'strategy';
  content: string | string[] | { [key: string]: string }[];
  title?: string;
}

export interface Module {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  sections: SectionContent[];
  examples: ChemicalExample[];
  quiz: QuizQuestion[];
}
