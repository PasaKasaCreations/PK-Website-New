export interface BaseEntity {
  id: string;
  created_at: string;
  updated_at: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  name: string;
  href: string;
  icon: string;
}
