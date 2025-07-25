export interface PortfolioData {
  header: Hero;
  about: Bio;
  experience: Exp[];
  projects: Work[];
  skills: Skill[];
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

export interface Bio {
  p1: string;
  p2: string;
}

export interface Exp {
  _id: string;
  startDate: Date;
  endDate: Date;
  role: string;
  name: string;
  location: string;
  tasks: Array<string>;
}

export interface Skill {
  _id: string;
  _type: string;
  name: string;
  icon: string;
  category: string;
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
  _updatedAt: string;
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
