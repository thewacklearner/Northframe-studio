export interface Service {
  id: string;
  title: string;
  description: string;
  includes: string[];
}

export const services: Service[] = [
  {
    id: 'website-development',
    title: 'Website Design & Development',
    description:
      'Custom marketing sites and company websites built with a focus on clarity, speed, and maintainable front-end architecture.',
    includes: ['Company Websites', 'Landing Pages', 'Responsive UI'],
  },
  {
    id: 'seo-optimization',
    title: 'SEO Optimization',
    description:
      'Technical and on-page improvements that help search engines understand your site better and help the right people find it.',
    includes: ['Technical SEO', 'Metadata', 'Site Structure'],
  },
  {
    id: 'automation-systems',
    title: 'Automation Systems',
    description:
      'Practical internal systems that reduce repetitive work, connect tools, and keep routine tasks moving without manual follow-up.',
    includes: ['Lead Routing', 'Form Workflows', 'Tool Integrations'],
  },
  {
    id: 'performance-cleanup',
    title: 'Performance & Technical Cleanup',
    description:
      'Front-end improvements that make sites faster, smoother, and easier to use across modern devices and slower connections.',
    includes: ['Core Web Vitals', 'Accessibility', 'Code Cleanup'],
  },
  {
    id: 'cms-content-systems',
    title: 'CMS & Content Systems',
    description:
      'Content structures that make publishing easier for your team without turning the editing experience into a mess.',
    includes: ['CMS Setup', 'Content Modeling', 'Editor Workflows'],
  },
  {
    id: 'maintenance-support',
    title: 'Maintenance & Ongoing Support',
    description:
      'Ongoing updates, content changes, quality checks, and technical support for teams that need a dependable partner after launch.',
    includes: ['Content Updates', 'Bug Fixes', 'Monitoring'],
  },
];
