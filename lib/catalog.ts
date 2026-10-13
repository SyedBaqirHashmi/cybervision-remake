import catalogData from '@/data/catalog.json';

export interface CatalogSection {
  heading: string;
  items: string[];
}

export interface CatalogEntry {
  slug: string;
  sourceUrl?: string;
  heroHeading: string;
  purpose: string;
  sections: CatalogSection[];
  relatedRoutes: string[];
  variant?: 'default' | 'training' | 'company' | 'clients' | 'case-studies' | 'contact' | 'disclaimer' | 'resources';
  primaryAction?: { label: string; href: string };
  image?: { src: string; caption: string };
}

export const catalog = catalogData as CatalogEntry[];

export function getCatalogEntry(slug: string): CatalogEntry | undefined {
  return catalog.find(entry => entry.slug === slug);
}

export function getCatalogSlugs(): string[] {
  return catalog.map(entry => entry.slug);
}

/** Verified against the live sitemap / page crawl — see the extraction doc, not invented. */
export const clients = [
  'UN', 'NADRA', 'Khyber Pakhtunkhwa Government', 'KPITB', 'LUMS', 'UNDP', 'Asia Foundation',
  'SECP', 'UNIDO', 'Oxfam', 'National Assembly (Parliament)', 'UNEP', 'ILO', 'President of Pakistan',
  'USAID', 'RMI', 'Karandaaz', 'OGDCL', 'PSDF', 'NAVTTC', 'NDMA', 'IBA', 'WSSP', 'P&G', 'PIA', 'Plan',
  'JS Group', 'Hashoo', 'Preston', 'SUPARCO', 'NRSP', 'Dicotech', 'TransPeshawar', 'Enercon',
  'FFC Energy', 'UNICEF', 'Johns Hopkins', 'Khushhali Microfinance Bank'
];

export interface CaseStudyEntry {
  title: string;
  summary: string;
  pdfUrl?: string;
}

/** The 25 published stories listed on /case-studies. Most "Read more" links on the
 * source are placeholder (#), so only 3 resolve to an actual document. */
export const caseStudies: CaseStudyEntry[] = [
  { title: 'Agri Smart Solution', summary: 'Software for smarter use of farm machinery to boost agricultural output.' },
  { title: 'Asaan Karobar', summary: "Khyber Pakhtunkhwa's first one-window platform for investors and businesses." },
  { title: 'eKasib', summary: "Pakistan's first government-sponsored online freelance marketplace." },
  { title: "President's Sponsorship GIS-Based Portal", summary: "A web application for the President's earthquake relief sponsorship programme, built with SUPARCO and NADRA." },
  { title: 'Multi-Domain Web Portal (LUMS)', summary: 'A complete portal for a respected educational institute.' },
  { title: 'A Ride for Health Application', summary: 'An app for Mercy Corps to help collect patient specimens on time and connect patients to health services.' },
  { title: 'Digital Training Content Creation (PSDF)', summary: 'Blended learning courses for Punjab Skills Development Fund covering entrepreneurship, professional cooking and mobile repair.' },
  { title: 'UNFAO Food Security and Nutrition System', summary: 'A food security information system for UN FAO, with statistical and graphical data displays.' },
  { title: 'NDMA Warehouse Management System', summary: "Work with WFP to strengthen NDMA's system for distributing disaster supplies nationwide." },
  { title: 'Volunteer Management System', summary: 'A system with WFP to support Pakistan Red Crescent Society volunteers in youth programmes.' },
  { title: 'Jamapunji Web Portal and Application', summary: "Support and maintenance for SECP's MIS, web portal and mobile apps." },
  { title: 'Web Portal for Pakistan Legislative Strengthening Project', summary: 'A British Council-funded revamp of National Assembly websites with communication portals.' },
  { title: 'Official Web Portal (RMI Hospital)', summary: 'A portal showcasing the educational and healthcare departments of a Peshawar hospital and medical institute.' },
  { title: 'OGDCL Official Web Portal', summary: "An interactive site showcasing services and tender management for Pakistan's oil and gas company." },
  { title: 'Common Partners Database (UN RCO)', summary: 'A web application for managing UN partner profiles for assessment, risk mitigation and reporting.' },
  { title: 'Official Web Portal (Karandaaz)', summary: 'A portal to share startup and financial inclusion work.' },
  { title: 'Interactive Web Portal (IRC Masawat)', summary: "An interactive portal teaching about the International Rescue Committee's gender equality gaming initiative." },
  { title: 'Knowledge Portal (USAID)', summary: "An online portal listing departments, institutions and organisations in Pakistan's education sector." },
  { title: 'Official Web Portal (Khushhali Microfinance Bank)', summary: "Development and maintenance of the bank's website." },
  { title: 'EnMS Reporting Portal (UNIDO)', summary: 'A shared platform for monitoring and evaluation across EnMS consortia.' },
  { title: 'ERP Solution for TransPeshawar', summary: 'End-to-end business automation through an ERP system.' },
  { title: 'Project Management and Monitoring System (NAVTTC)', summary: "Implementation and monitoring for the Prime Minister's Youth Skill Development Programme." },
  { title: 'Textile', summary: "Covers 18 textile and apparel companies in Pakistan's first net-zero coalition, targeting zero net carbon emissions by 2050. A 30-page historical sector briefing (FY2022–23 figures); not current market data.", pdfUrl: 'https://cybervision.com.pk/wp-content/uploads/2024/05/Textile.pdf' },
  { title: 'Tourism & Hospitality', summary: 'Covers destinations from the Karakoram mountains in the north to the Indus River delta in the south. A 34-page historical sector briefing (2022 figures and later forecasts); consult current sources for investment decisions.', pdfUrl: 'https://cybervision.com.pk/wp-content/uploads/2024/05/Tourism-hospitality.pdf' },
  { title: 'One-Window Facilitation Platform (KPITB)', summary: 'Feasibility and framework consultancy for a one-window platform. A 160-page requirements study dated 18 May 2021; proposed features are not evidence of completed deployment.', pdfUrl: 'https://cybervision.com.pk/wp-content/uploads/2024/05/CV-DP-BPR-Study-KPITB-One-Window-v1.3.pdf' }
];

export const resourceDocuments = caseStudies.filter(study => study.pdfUrl);

/** Training is a company-published figure, not an independently audited statistic. */
export const trainingStats = [
  { value: 40000, suffix: '+', label: 'Youth trained' },
  { value: 20000, suffix: '+', label: 'Jobs created' },
  { value: 24000, suffix: '+', label: 'Women included' },
  { value: 50000, suffix: '+', label: 'Industry linkage and mentoring hours' },
  { value: 1500, suffix: '+', label: 'Lesson plans, assessments and training manuals' },
  { value: 200, suffix: '+', label: 'Curricula developed' }
];

export const companyTechStack = {
  'Web development': ['AngularJS', 'Drupal', 'React Native', 'PHP', '.NET'],
  'Mobile app development': ['AngularJS', 'React Native', 'Flutter', 'Ionic', 'Node.js'],
  'Enterprise software development': ['AngularJS', 'Python', '.NET', 'PHP', 'Node.js']
};
