export interface FAQItem {
  question: string;
  answer: string;
}

export interface Step {
  title: string;
  details: string;
}

export interface LinkItem {
  label: string;
  url: string;
}

export interface Guide {
  title: string;
  slug: string;
  excerpt: string;
  updatedAt: string;
  readingTime: number;
  tldr: string[];
  requirements: string[];
  links: LinkItem[];
  steps: Step[];
  faq: FAQItem[];
  callout: {
    type: 'info' | 'warning' | 'tip';
    text: string;
  } | null;
}
