export interface Frontmatter {
  title: string;
  description: string;
  createdAt: Date;
  hero_image?: string;
  id: string;
}

export interface BlogFrontmatter extends Frontmatter {
  from: string;
  author: string;
}

export interface ProjectFrontmatter extends Frontmatter {
  stack: string;
  viewLink?: string;
  gitLink?: string;
}

export const EmptyTemplate = {
  data: {title: "",
  description: "",
  createdAt: new Date(),
  id: "DEBUG",
  from: "",
  author: "",
  stack: ""},
  content: ''
};
