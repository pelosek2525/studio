export interface GuideMetadata {
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  updatedAt: string;
  readingTime: number;
}

export interface TocEntry {
  level: number;
  text: string;
  id: string;
}

export interface Guide {
  meta: GuideMetadata;
  content: string;
  toc: TocEntry[];
}

export interface GuideCategory {
  name: string;
  slug: string;
  guides: GuideMetadata[];
}

export interface GlossaryEntry {
  term: string;
  definition: string;
}

export type Glossary = Record<string, GlossaryEntry>;
