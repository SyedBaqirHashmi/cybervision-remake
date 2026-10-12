export const company = {
  name: 'CyberVision International',
  email: 'info@cybervision.com.pk',
  phone: '+92 51 230 4878',
  phoneHref: 'tel:+92512304878',
  address: 'Plot 18–19, 1st Floor, Paradise Plaza, SCHS E-11/2, Islamabad, Pakistan',
  mapUrl: 'https://www.google.com/maps/search/?api=1&query=CyberVision+International+Paradise+Plaza+Islamabad',
  founded: 2004
};
export const navigation = [['Services', '#services'], ['Products', '#products'], ['Trainings', '#trainings'], ['Startups', '#startups'], ['Company', '#company'], ['Contact', '#contact']] as const;
export const projects = [{
  id: 'fao',
  tag: 'DATA & INTELLIGENCE',
  client: 'FAO',
  title: 'Better information. More informed decisions.',
  description: 'A food security and nutrition information system that makes statistical and graphical information easier to explore.',
  category: 'Food Security & Nutrition System',
  image: '/images/fao.svg',
  alt: 'Illustrative food security dashboard with data panels and an abstract map; not actual project data.',
  source: 'https://cybervision.com.pk/software-development-services/',
  capabilities: ['Data visualisation', 'Information systems', 'Statistical analysis']
}, {
  id: 'lums',
  tag: 'CONNECTED EDUCATION',
  client: 'LUMS',
  title: 'One institution. A connected digital presence.',
  description: 'A multi-domain web portal supporting the digital presence of a leading academic institution.',
  category: 'Multi-Domain Web Portal',
  image: '/images/lums.svg',
  alt: 'Illustrative academic portal with a stylised campus and programme navigation.',
  source: 'https://cybervision.com.pk/web-development/',
  capabilities: ['Web architecture', 'Content experience', 'Multi-domain portal']
}, {
  id: 'agri',
  tag: 'CONNECTED OPERATIONS',
  client: 'Agri Smart',
  title: 'Connecting technology to the land.',
  description: 'An IoT-enabled farm machinery solution built around a shared economy model for farmers in Pakistan.',
  category: 'Agri Smart Solution',
  image: '/images/agri.svg',
  alt: 'Illustration of connected agricultural fields with sensor nodes.',
  source: 'https://cybervision.com.pk/products/',
  capabilities: ['Internet of Things', 'Connected machinery', 'Agriculture']
}, {
  id: 'warehouse',
  tag: 'ENTERPRISE SYSTEMS',
  client: 'Warehouse',
  title: 'Bring your operations into focus.',
  description: 'An end-to-end product for managing warehouse processes and making operational workflows easier to coordinate.',
  category: 'Warehouse Management System',
  image: '/images/warehouse.svg',
  alt: 'Illustrative warehouse operations interface with storage zones and inventory rows.',
  source: 'https://cybervision.com.pk/products/',
  capabilities: ['Warehouse processes', 'Enterprise software', 'Operations']
}] as const;
export const metrics = [{
  value: 40000,
  suffix: '+',
  label: 'Youth trained',
  detail: 'Building digital capability'
}, {
  value: 850,
  suffix: '+',
  label: 'Projects',
  detail: 'Ideas turned into solutions'
}, {
  value: 4,
  suffix: '',
  label: 'Incubators / accelerators',
  detail: 'Supporting entrepreneurship'
}, {
  value: 20,
  suffix: '+',
  label: 'Years of experience',
  detail: 'Established in 2004'
}] as const;
