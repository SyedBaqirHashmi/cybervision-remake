# CyberVision detailed content migration map

Checked 13 October 2026. This document maps the discovered source pages to the implemented remake. Adapted copy is in `data/catalog.json`; original prose is not reproduced verbatim.

## Crawl scope and evidence

- 28 discovered content routes: the original 27 plus the subsequently recovered SEO page.
- All 4,253 reader text lines across the 30-, 34- and 160-page PDFs were traversed. Image-only content and visual reading order are not fully captured by the text reader.
- The latest sequential HTML pass returned complete reader text for 27 routes. Training returned an intermittent timeout; its earlier 204-line successful snapshot supplies the training facts.
- Homepage search content is available, but a direct homepage request still times out.
- Robots, sitemap and WordPress API enumeration failed. Unlinked pages may remain undiscovered.
- This is not a loss-free raw website archive. Reader titles are not verified HTML title tags; meta descriptions, canonicals, CSS media and active navigation styles remain unknown.
- The site uses adapted factual copy, preserves the discovered routes and links original documents. No invented project-detail paths, metrics or client testimonials were added.

## Global navigation migration

| Source group | Rebuild destination |
| --- | --- |
| Services | /software-development-services |
| Products | /products |
| Trainings | /training |
| Company | /company |
| Consulting | /business-consulting, linked from startup hub |
| Portfolio | /case-studies and /clients |
| Contact | /contactus |
| Startup content | /startup-innovation |
| Three PDF links | /resources and /case-studies |

## Source-specific decisions

- Retained original service/product/training slugs to avoid discarding the existing URL structure.
- Removed duplicate carousel/navigation text from adapted pages.
- Excluded the Revolution Slider dummy PNG from imagery. Selected real source images are lazy loaded without cropping and link to their originals.
- Training metrics remain distinct from enterprise project metrics. They are attributed to the company rather than represented as independently audited.
- Source counters that show zero in the reader are animation initial states, not replacement statistics.
- Huawei intake dates are not inferred. Visitors are directed to the verified NAVTTC registration destination.
- KPITB proposals are identified as requirements dated 18 May 2021, not verified completed features.
- Historical PDF economic figures are not presented as current company performance.
- The contact page and footer differ on Plot 18 versus Plot 18–19. The remake follows the contact page.
- The original legal disclaimer is linked; the remake does not silently substitute newly drafted corporate legal terms.

## Services — /software-development-services

- Source: https://cybervision.com.pk/software-development-services/
- Reader title: Services
- Original SEO meta description / canonical: not exposed by the reader; not inferred.
- Retrieval: 170/170 reader lines.
- Rebuild hero: Expertise, connected.
- Page purpose: Bring business processes, digital products and connected devices together with a team that understands the whole system.
- Adapted section structure:
  - A connected service portfolio: Business automation; Web and mobile engineering; Connected devices; Digital marketing; Learning content; Remote delivery teams
  - From challenge to delivery
- Related local routes: /business-process-automation, /digital-services, /internet-of-things, /app-development, /digital-training-content-creation, /blockchain, /dedicated-virtual-assistants.
- Primary action: Consultation link to /contactus#contact.

## Products — /products

- Source: https://cybervision.com.pk/products/
- Reader title: Products
- Original SEO meta description / canonical: not exposed by the reader; not inferred.
- Retrieval: 171/171 reader lines.
- Rebuild hero: Built around the way you work.
- Page purpose: Six enterprise products address operations, customer relationships, people and connected agriculture.
- Adapted section structure:
  - Choose your operating system: Enterprise planning; Customer management; HR collaboration; Warehouse operations; Volunteer coordination; Agricultural machinery
- Related local routes: /enterprise-resource-planning-system, /customer-relationship-management-system, /hr-management-system, /warehouse-management-system, /volunteer-management-system, /agri-smart-solution.
- Primary action: Consultation link to /contactus#contact.

## Business process automation — /business-process-automation

- Source: https://cybervision.com.pk/business-process-automation/
- Reader title: Business Process Automation | CyberVision International | AI, Digital Transformation, Training & Software Development
- Original SEO meta description / canonical: not exposed by the reader; not inferred.
- Retrieval: 196/196 reader lines.
- Rebuild hero: Less friction. More progress.
- Page purpose: Connect business applications and routine processes through a coordinated approach to automation.
- Adapted section structure:
  - Understand before automating: Process assessment; Solution architecture
  - Delivery and continuity: Application integration; Team enablement; Maintenance and support
- Related local routes: /enterprise-resource-planning-system, /customer-relationship-management-system, /web-development.
- Primary action: Consultation link to /contactus#contact.

## Digital services — /digital-services

- Source: https://cybervision.com.pk/digital-services/
- Reader title: Digital Marketing Services | Grow your Online Presence | CyberVision
- Original SEO meta description / canonical: not exposed by the reader; not inferred.
- Retrieval: 284/284 reader lines.
- Rebuild hero: Make every digital interaction count.
- Page purpose: Connect your website, search visibility and brand communications into a coherent digital presence.
- Adapted section structure:
  - Build your presence: Web development; Search optimisation; Social campaigns; Online reputation
  - Relevant experience
- Related local routes: /web-development, /seo-company-pakistan, /social-media-marketing, /online-reputation-management.
- Primary action: Consultation link to /contactus#contact.

## Web development — /web-development

- Source: https://cybervision.com.pk/web-development/
- Reader title: Web Development | CyberVision International | AI, Digital Transformation, Training & Software Development
- Original SEO meta description / canonical: not exposed by the reader; not inferred.
- Retrieval: 235/235 reader lines.
- Rebuild hero: Your next chapter, online.
- Page purpose: Plan and build web experiences around your organisation, its content and the people it serves.
- Adapted section structure:
  - Platforms with purpose: CMS implementation; E-commerce platforms; Bespoke web applications
  - A considered process: Requirements and planning; Interface prototypes; Reporting and documentation; Post-launch support
- Related local routes: /app-development, /case-studies, /dedicated-virtual-assistants.
- Primary action: Consultation link to /contactus#contact.

## Mobile app development — /app-development

- Source: https://cybervision.com.pk/app-development/
- Reader title: Mobile App | CyberVision International | AI, Digital Transformation, Training & Software Development
- Original SEO meta description / canonical: not exposed by the reader; not inferred.
- Retrieval: 262/262 reader lines.
- Rebuild hero: Useful experiences. Wherever life happens.
- Page purpose: Develop mobile products for customers, employees and enterprise operations, with support for iOS and Android.
- Adapted section structure:
  - From research to release: Flutter; React Native; Ionic; Angular; Node.js
  - Across industries
- Related local routes: /web-development, /internet-of-things, /case-studies.
- Primary action: Consultation link to /contactus#contact.

## Internet of Things — /internet-of-things

- Source: https://cybervision.com.pk/internet-of-things/
- Reader title: IOT | CyberVision International | AI, Digital Transformation, Training & Software Development
- Original SEO meta description / canonical: not exposed by the reader; not inferred.
- Retrieval: 203/203 reader lines.
- Rebuild hero: Connect the physical to the possible.
- Page purpose: Bring device data into the systems people use to understand and manage their operations.
- Adapted section structure:
  - End-to-end expertise: Cloud integration; Connected applications; Monitoring systems
  - Applied intelligence
- Related local routes: /agri-smart-solution, /business-process-automation.
- Primary action: Consultation link to /contactus#contact.

## Blockchain development — /blockchain

- Source: https://cybervision.com.pk/blockchain/
- Reader title: Worldclass Blockchain Development Services by CyberVision International
- Original SEO meta description / canonical: not exposed by the reader; not inferred.
- Retrieval: 119/119 reader lines.
- Rebuild hero: A shared record. A clearer history.
- Page purpose: Explore distributed records for business information, document authenticity and cross-organisation processes.
- Adapted section structure:
  - Evaluate the fit: Technical consulting; Development; Integration and testing
  - Applications
- Related local routes: /business-process-automation, /web-development.
- Primary action: Consultation link to /contactus#contact.

## Dedicated teams — /dedicated-virtual-assistants

- Source: https://cybervision.com.pk/dedicated-virtual-assistants/
- Reader title: Dedicated Virtual Assistants | CyberVision International | AI, Digital Transformation, Training & Software Development
- Original SEO meta description / canonical: not exposed by the reader; not inferred.
- Retrieval: 139/139 reader lines.
- Rebuild hero: The expertise your next stage needs.
- Page purpose: Extend delivery capacity with remote specialists across technology, design, analysis and operations.
- Adapted section structure:
  - Build the right team: Business analysts; Project managers; Product and graphic designers; Software developers; Digital marketers; Quality assurance engineers
  - A managed engagement
- Related local routes: /web-development, /app-development, /business-consulting.
- Primary action: Consultation link to /contactus#contact.

## Digital learning content — /digital-training-content-creation

- Source: https://cybervision.com.pk/digital-training-content-creation/
- Reader title: Digital Training Content Creation | CyberVision International | AI, Digital Transformation, Training & Software Development
- Original SEO meta description / canonical: not exposed by the reader; not inferred.
- Retrieval: 158/158 reader lines.
- Rebuild hero: Knowledge people can use.
- Page purpose: Turn complex subjects into accessible learning experiences for vocational, educational and workplace audiences.
- Adapted section structure:
  - Formats that work together: Instructional video; Animation and narration; Interactive assessments; Practical toolkits; Learning games
  - Published work
- Related local routes: /training, /case-studies.
- Primary action: Consultation link to /contactus#contact.

## Search engine optimisation — /seo-company-pakistan

- Source: https://cybervision.com.pk/seo-company-pakistan/
- Reader title: Search engine optimisation
- Original SEO meta description / canonical: not exposed by the reader; not inferred.
- Retrieval: 165/165 reader lines.
- Rebuild hero: Help the right audience find you.
- Page purpose: Build a search strategy around relevant queries, sound technical foundations and useful content.
- Adapted section structure:
  - Areas of focus: Keyword research; Technical site improvements; Content planning; Internal linking; External authority
  - Measure the opportunity
- Related local routes: /digital-services, /web-development, /social-media-marketing.
- Primary action: Consultation link to /contactus#contact.

## Social media marketing — /social-media-marketing

- Source: https://cybervision.com.pk/social-media-marketing/
- Reader title: Social Media Marketing | CyberVision International | AI, Digital Transformation, Training & Software Development
- Original SEO meta description / canonical: not exposed by the reader; not inferred.
- Retrieval: 123/123 reader lines.
- Rebuild hero: Turn attention into connection.
- Page purpose: Plan content, community activity and paid campaigns around the audiences that matter to your organisation.
- Adapted section structure:
  - Purposeful communication: Facebook; LinkedIn; Instagram; Twitter; Google
  - Published examples
- Related local routes: /digital-services, /online-reputation-management.
- Primary action: Consultation link to /contactus#contact.

## Online reputation — /online-reputation-management

- Source: https://cybervision.com.pk/online-reputation-management/
- Reader title: Online Reputation Management | CyberVision International | AI, Digital Transformation, Training & Software Development
- Original SEO meta description / canonical: not exposed by the reader; not inferred.
- Retrieval: 114/114 reader lines.
- Rebuild hero: Build confidence in your digital presence.
- Page purpose: Coordinate public relations, content and social communication around the way your organisation is perceived.
- Adapted section structure:
  - A continuous process: Audience and channel analysis; Messaging and content; Campaign delivery; Performance review
- Related local routes: /social-media-marketing, /digital-services.
- Primary action: Consultation link to /contactus#contact.

## Agri Smart Solution — /agri-smart-solution

- Source: https://cybervision.com.pk/agri-smart-solution/
- Reader title: Our Agri Smart Solution for Innovative Agriculture - CyberVision
- Original SEO meta description / canonical: not exposed by the reader; not inferred.
- Retrieval: 155/155 reader lines.
- Rebuild hero: Better use of the machinery already here.
- Page purpose: Connect farmers and machinery owners through booking tools, IoT telemetry and a shared agricultural service model.
- Adapted section structure:
  - A coordinated journey: Reservation requests and history; Provider registration; Machinery details
  - From field to information: Temperature, pressure and humidity; Motion sensing; Cloud data and AI integration
- Related local routes: /internet-of-things, /case-studies.
- Primary action: Consultation link to /contactus#contact.

## Customer relationship management — /customer-relationship-management-system

- Source: https://cybervision.com.pk/customer-relationship-management-system/
- Reader title: CRM System in Pakistan - Customer Relationship Management
- Original SEO meta description / canonical: not exposed by the reader; not inferred.
- Retrieval: 171/171 reader lines.
- Rebuild hero: Keep relationships at the centre.
- Page purpose: Bring customer information, sales activity and day-to-day follow-up into a shared working view.
- Adapted section structure:
  - A connected customer record: Prospect tracking; Sales activity; Task coordination; Email campaigns
  - See the bigger picture: Customer profiles; Performance analysis; Reporting
- Related local routes: /enterprise-resource-planning-system, /business-process-automation.
- Primary action: Consultation link to /contactus#contact.

## Enterprise resource planning — /enterprise-resource-planning-system

- Source: https://cybervision.com.pk/enterprise-resource-planning-system/
- Reader title: ERP | CyberVision International | AI, Digital Transformation, Training & Software Development
- Original SEO meta description / canonical: not exposed by the reader; not inferred.
- Retrieval: 180/180 reader lines.
- Rebuild hero: One foundation for essential operations.
- Page purpose: A web-based management platform connects core business functions and supports coordinated workflows.
- Adapted section structure:
  - Core capabilities: Accounts and ledger reporting; HR and payroll; Procurement
  - Designed around the organisation
- Related local routes: /customer-relationship-management-system, /hr-management-system, /warehouse-management-system.
- Primary action: Consultation link to /contactus#contact.

## HR intranet — /hr-management-system

- Source: https://cybervision.com.pk/hr-management-system/
- Reader title: HR Intranet | CyberVision International | AI, Digital Transformation, Training & Software Development
- Original SEO meta description / canonical: not exposed by the reader; not inferred.
- Retrieval: 101/101 reader lines.
- Rebuild hero: A more connected workplace.
- Page purpose: Give people a shared place for information, learning and everyday HR processes.
- Adapted section structure:
  - Information within reach: Employee information; HR documents and templates; Process automation
  - Support people and decisions
- Related local routes: /enterprise-resource-planning-system, /training.
- Primary action: Consultation link to /contactus#contact.

## Volunteer management — /volunteer-management-system

- Source: https://cybervision.com.pk/volunteer-management-system/
- Reader title: Volunteer Management System | CyberVision International | AI, Digital Transformation, Training & Software Development
- Original SEO meta description / canonical: not exposed by the reader; not inferred.
- Retrieval: 144/144 reader lines.
- Rebuild hero: Make participation easier.
- Page purpose: Coordinate volunteer records, events and communication through a common system.
- Adapted section structure:
  - From registration to participation: Event registration; Group profiles; Volunteer communication
  - Coordinate the work
- Related local routes: /case-studies, /warehouse-management-system.
- Primary action: Consultation link to /contactus#contact.

## Warehouse management — /warehouse-management-system

- Source: https://cybervision.com.pk/warehouse-management-system/
- Reader title: CV WMS - Top Notch Warehouse Management System | Inventory Software
- Original SEO meta description / canonical: not exposed by the reader; not inferred.
- Retrieval: 143/143 reader lines.
- Rebuild hero: Know what is where.
- Page purpose: Coordinate stock, movement and fulfilment with visibility across warehouse locations.
- Adapted section structure:
  - Operational coverage: Inventory control; Order fulfilment; Shipping; Transport coordination; Administration
  - Connected operations
- Related local routes: /enterprise-resource-planning-system, /case-studies.
- Primary action: Consultation link to /contactus#contact.

## Training & EdTech — /training

- Source: https://cybervision.com.pk/training/
- Reader title: Trainings | CyberVision International | AI, Digital Transformation, Training & Software Development
- Original SEO meta description / canonical: not exposed by the reader; not inferred.
- Retrieval: Earlier successful snapshot; latest request intermittent.
- Rebuild hero: Capability changes futures.
- Page purpose: Connect educational technology, practical learning and programme delivery to help people build useful skills.
- Adapted section structure:
  - Learning infrastructure: Adaptive learning; LMS deployment; Blended programmes; Assessment and evaluation
  - Training domains: AI, data and software; Cybersecurity and cloud; Communication and teamwork; Specialist expertise; Leadership and mentoring
  - Published programmes
- Related local routes: /digital-training-content-creation, /free-huawei-ai-cloud-certification-training-cybervision-x-navttc-centre-of-excellence, /case-studies.
- Primary action: Consultation link to /contactus#contact.
- Selected image: https://cybervision.com.pk/wp-content/uploads/2024/12/CVI-UNDP.png
- Rebuild image description: CyberVision’s published image for its UNDP training programme. Original alt attribute is unverified.

## Startup & innovation — /startup-innovation

- Source: https://cybervision.com.pk/startup-innovation/
- Reader title: Startup & Innovation | CyberVision International | AI, Digital Transformation, Training & Software Development
- Original SEO meta description / canonical: not exposed by the reader; not inferred.
- Retrieval: 109/109 reader lines.
- Rebuild hero: Build something that matters.
- Page purpose: Support for entrepreneurs connects product thinking, technical expertise, mentors and investor networks.
- Adapted section structure:
  - NIC Faisalabad: 12-month programme described by the source; Founder Institute curriculum; Agritech and textile technology
  - Support along the journey
- Related local routes: /business-consulting, /agri-smart-solution.
- Primary action: Consultation link to /contactus#contact.

## Business consulting — /business-consulting

- Source: https://cybervision.com.pk/business-consulting/
- Reader title: Business Consulting | CyberVision International | AI, Digital Transformation, Training & Software Development
- Original SEO meta description / canonical: not exposed by the reader; not inferred.
- Retrieval: 99/99 reader lines.
- Rebuild hero: Give your ambition a practical plan.
- Page purpose: Work through the business model, product and investment questions that shape a growing venture.
- Adapted section structure:
  - Shape the business: Business model design; Prototypes and MVPs; Technology planning
  - Build your network
- Related local routes: /startup-innovation, /web-development.
- Primary action: Consultation link to /contactus#contact.

## Our company — /company

- Source: https://cybervision.com.pk/company/
- Reader title: Company | CyberVision International | AI, Digital Transformation, Training & Software Development
- Original SEO meta description / canonical: not exposed by the reader; not inferred.
- Retrieval: 248/248 reader lines.
- Rebuild hero: Built in Islamabad. Working beyond borders.
- Page purpose: CyberVision International has delivered software and digital transformation services since 2004.
- Adapted section structure:
  - People and technology: Software delivery; Digital transformation; Workforce development
  - A history of applied work
- Related local routes: /clients, /case-studies, /startup-innovation, /contactus.
- Primary action: Consultation link to /contactus#contact.

## Our clients — /clients

- Source: https://cybervision.com.pk/clients/
- Reader title: Clients | CyberVision International | AI, Digital Transformation, Training & Software Development
- Original SEO meta description / canonical: not exposed by the reader; not inferred.
- Retrieval: 224/224 reader lines.
- Rebuild hero: Progress is a shared endeavour.
- Page purpose: A cross-sector portfolio brings together public institutions, development organisations, education and enterprise.
- Adapted section structure:
  - Selected relationships
- Related local routes: /case-studies, /company.
- Primary action: Consultation link to /contactus#contact.

## Selected work — /case-studies

- Source: https://cybervision.com.pk/case-studies/
- Reader title: Case Studies | CyberVision International | AI, Digital Transformation, Training & Software Development
- Original SEO meta description / canonical: not exposed by the reader; not inferred.
- Retrieval: 312/312 reader lines.
- Rebuild hero: Technology, put to work.
- Page purpose: Explore published projects spanning public services, learning, enterprise operations and digital platforms.
- Adapted section structure:
  - Across sectors
- Related local routes: /clients, /products, /resources.
- Primary action: Consultation link to /contactus#contact.

## Contact — /contactus

- Source: https://cybervision.com.pk/contactus/
- Reader title: Contact Us
- Original SEO meta description / canonical: not exposed by the reader; not inferred.
- Retrieval: 50/50 reader lines.
- Rebuild hero: Let’s work on what comes next.
- Page purpose: Tell us what you are building, the challenge you are facing and where you want to go.
- Adapted section structure:
  - Islamabad office: info@cybervision.com.pk; +92 51 230 4878; +92 51 230 4863; +92 309 7774441
- Related local routes: /company.
- Primary action: Validated consultation form and direct contact channels.

## Huawei AI & cloud programme — /free-huawei-ai-cloud-certification-training-cybervision-x-navttc-centre-of-excellence

- Source: https://cybervision.com.pk/free-huawei-ai-cloud-certification-training-cybervision-x-navttc-centre-of-excellence/
- Reader title: Free Huawei AI & Cloud Certification Training | CyberVision x NAVTTC Centre of Excellence | CyberVision International | AI, Digital Transformation, Training & Software Development
- Original SEO meta description / canonical: not exposed by the reader; not inferred.
- Retrieval: 105/105 reader lines.
- Rebuild hero: Build practical technology skills.
- Page purpose: CyberVision’s published announcement describes free Huawei certification training with NAVTTC under the Prime Minister’s Youth Programme.
- Adapted section structure:
  - Programme at a glance: No training fee advertised; Three months of learning; Huawei certification pathway
  - Check the current intake
- Related local routes: /training, /contactus.
- Primary action: Consultation link to /contactus#contact.

## Website information — /disclaimer

- Source: https://cybervision.com.pk/disclaimer/
- Reader title: Disclaimer | CyberVision International | AI, Digital Transformation, Training & Software Development
- Original SEO meta description / canonical: not exposed by the reader; not inferred.
- Retrieval: 97/97 reader lines.
- Rebuild hero: Clear information. Responsible use.
- Page purpose: This remake presents an adapted overview of CyberVision’s published services, products and portfolio.
- Adapted section structure:
  - Original company policies
  - Third-party resources
- Related local routes: /company, /contactus.
- Primary action: Original disclaimer and remake privacy links.

## PDF resource map

### Pakistan textile sector

- URL: https://cybervision.com.pk/wp-content/uploads/2024/05/Textile.pdf
- Length: 30 pages.
- Date/context: Historical sector briefing.
- Overview: An industry overview covering production, exports, the supply chain, investment considerations and technical textiles.
- Topic map: Sector context and exports; Investment and incentives; Raw materials and weaving; Finished and technical textiles.
- Publication treatment: Contains FY2022–23 figures and projections; these are not current market data.
- UI: labelled PDF links; no automatic embedded viewer or preloading of the full document.

### Tourism & hospitality

- URL: https://cybervision.com.pk/wp-content/uploads/2024/05/Tourism-hospitality.pdf
- Length: 34 pages.
- Date/context: Historical sector briefing.
- Overview: A sector presentation exploring destinations, tourism economics, hotels, travel services and regional opportunities.
- Topic map: Heritage and visitor economy; Domestic and overseas demand; Hospitality and travel services; Regional destinations.
- Publication treatment: Includes 2022 figures and later forecasts; consult current sources for investment decisions.
- UI: labelled PDF links; no automatic embedded viewer or preloading of the full document.

### KPITB one-window platform

- URL: https://cybervision.com.pk/wp-content/uploads/2024/05/CV-DP-BPR-Study-KPITB-One-Window-v1.3.pdf
- Length: 160 pages.
- Date/context: 18 May 2021.
- Overview: A requirements study examining government processes and proposed integration into a common business-services portal.
- Topic map: Departmental process assessment; Registration and utility workflows; Proposed integration and dashboards; Regulatory recommendations and appendices.
- Publication treatment: A requirements document: proposed features are not evidence of completed deployment.
- UI: labelled PDF links; no automatic embedded viewer or preloading of the full document.

## Selected media inventory

- https://cybervision.com.pk/wp-content/plugins/revslider/admin/assets/images/dummy.png — excluded placeholder
- https://cybervision.com.pk/wp-content/uploads/2020/11/LUMS_490x366.jpeg — source link retained
- https://cybervision.com.pk/wp-content/uploads/2020/12/FAO.jpg — source link retained
- https://cybervision.com.pk/wp-content/uploads/2020/12/PSDF.jpg — source link retained
- https://cybervision.com.pk/wp-content/uploads/2020/11/1-1-e1606980703354.png — source link retained
- https://cybervision.com.pk/wp-content/uploads/2024/12/CVI-UNDP.png — source link retained

## Verification boundaries

Complete available reader text does not establish complete DOM or media capture. Original source availability is intermittent. Sitemap/WordPress discovery, raw HTML SEO metadata, exhaustive outbound URLs, video/background media and a visual/OCR pass over all PDF pages remain unresolved. Full source prose is not republished in this map.

Source data: `crawl-2026-10-13.json`, `detailed-crawl-coverage.json`. Implementation: `data/catalog.json`, `lib/catalog.ts`, `app/[slug]/page.tsx`.
