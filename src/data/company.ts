export interface SocialLink {
  platform: string;
  handle: string;
  href?: string;
}

export interface Company {
  name: string;
  email: string;
  phone: string;
  address: string;
  socials: SocialLink[];
}

export const company: Company = {
  name: 'Northframe Studio',
  email: 'hello@northframe.studio',
  phone: '+1 234 567 890',
  address: '123 Studio St, Creative City',
  socials: [
    {
      platform: 'Instagram',
      handle: '@northframe.studio',
    },
    {
      platform: 'LinkedIn',
      handle: 'Northframe Studio',
    },
    {
      platform: 'X / Twitter',
      handle: '@northframe_studio',
    },
  ],
};
