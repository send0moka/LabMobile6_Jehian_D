export interface Hero {
  name: string;
  codename: string;
  level: number;
  experience: number;
  avatar: string;
  github: string;
  linkedin: string;
  instagram: string;
  twitter: string;
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  category: string;
  experience: number;
  completed: boolean;
  streak: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
}