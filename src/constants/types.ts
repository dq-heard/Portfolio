export interface IconType {
  title: string;
  icon: React.ElementType;
  classname?: string;
  url?: string;
}

export interface NavType {
  onClick?: () => void;
  showIcons?: boolean;
  activeSection: string;
  setActiveSection: React.Dispatch<React.SetStateAction<string>>;
}

export interface ProjectType {
  _id: string;
  _type: string;
  title: string;
  description: string;
  demoLink: string;
  codeLink: string;
  imgUrl: string;
  projectType: string;
  _updatedAt: string;
}
