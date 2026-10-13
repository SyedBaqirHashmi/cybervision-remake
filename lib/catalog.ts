import content from '@/data/catalog.json';

export type ContentSection = { title: string; text?: string; items?: string[] };
export type ContentPage = {
  slug: string;
  title: string;
  category: string;
  headline: string;
  summary: string;
  sections: ContentSection[];
  related: string[];
  source: string;
  image?: string;
  imageAlt?: string;
};
export const pages: ContentPage[] = content.pages;
export const resources = content.resources;
export const trainingMetrics = content.trainingMetrics;
export const clients = content.clients;
export const caseStudies = content.caseStudies;
export const pageBySlug = (slug: string) => pages.find(page => page.slug === slug);
