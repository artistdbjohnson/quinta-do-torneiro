export type LinkItem = { text: string; href: string };

export type Block = {
  t: string;
  text?: string;
  href?: string;
  links?: LinkItem[];
  bold?: boolean;
  id?: string;
  alt?: string;
};

export type PageDoc = {
  url: string;
  title: string;
  description: string;
  blocks: Block[];
};

export type NavChild = { label: string; href: string };
export type NavGroup = { label: string; href: string | null; children: NavChild[] };
