export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  initials: string;
  hue: string;
  contactFocus?: string;
  contactEmail?: string;
  image?: string;
}

export const team: TeamMember[] = [
  {
    name: 'Aiko Tanaka',
    role: 'Creative Director',
    bio: 'Aiko leads the studio with a clear eye for structure, tone, and how a brand should feel across every touchpoint.',
    initials: 'AT',
    hue: '210',
    contactFocus: 'Direction & partnerships',
    contactEmail: 'aiko@northframe.studio',
  },
  {
    name: 'Marcus Webb',
    role: 'Lead Designer',
    bio: 'Marcus shapes the visual language of each project, with a focus on typography, composition, and restraint.',
    initials: 'MW',
    hue: '280',
    contactFocus: 'Design & visual systems',
    contactEmail: 'marcus@northframe.studio',
  },
  {
    name: 'Dev Patel',
    role: 'Lead Developer',
    bio: 'Dev turns ideas into fast, dependable digital products and keeps the final execution as thoughtful as the design.',
    initials: 'DP',
    hue: '30',
    contactFocus: 'Development & technical planning',
    contactEmail: 'dev@northframe.studio',
  },
];
