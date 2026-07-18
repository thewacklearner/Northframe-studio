export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export const services: Service[] = [
  { id: '1', title: 'Web Development', description: 'Building fast websites.', icon: 'web' },
];
