export interface PortfolioData {
  header: Hero;
  skills: Skill[];
  about: Bio;
  experience: Exp[];
  projects: Work[];
  education: Edu[];
  contact: {
    contact: Chat;
    resume: Resume;
  };
}

export interface Hero {
  avatar: SanityImage;
  title: string;
  role: string;
  desc: string;
  socials: Social[];
}

export interface Skill {
  _id: string;
  _type: string;
  name: string;
  icon: string;
  category: string;
}

export interface Bio {
  p1: string;
  p2: string;
}

export interface Exp {
  _id: string;
  role: string;
  company: string;
  period: string; // e.g., "2023 — Present"
  order?: number;
  summary: string;
  highlights?: string[];
  keyDeliverable?: string;
  techStack?: string[];
  demoUrl?: string;
  githubUrl?: string;
}

export interface Edu {
  name: string;
  certs: Cert[];
}

export interface Cert {
  issuer: string;
  course: string;
  focus: Topics[];
}

export interface Topics {
  topics: string;
}

export interface Work {
  _id: string;
  _type: string;
  title: string;
  desc: string;
  demo: string;
  code?: string;
  imgUrl: typeof Image;
  tech: string[];
  slug?: { current: string };
  category: "web-admin" | "front-end" | "email-dev";
  emailTemplates?: EmailTemplate[];
}

export interface EmailTemplate {
  label: string;
  fileName: string; // e.g. "welcome.html"
}

interface Item {
  label: string;
  value: string;
  icon: string;
}

export interface Chat {
  heading1: string;
  heading2: string;
  info: Item[];
}

export interface Resume {
  name: string;
  prompt: string;
  icon: string;
  file: {
    asset: {
      url: string;
      originalFilename?: string;
    };
  };
}

export interface Social {
  icon: string;
  slug: string;
  link: string;
}

export interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
}

export type SectionProps<T> = {
  data: T;
  onContentLoaded: () => void;
};

export type BurstOptions = {
  x: number;
  y: number;
  quantity?: number;
};

export type BurstFunction = (options: BurstOptions) => void;
