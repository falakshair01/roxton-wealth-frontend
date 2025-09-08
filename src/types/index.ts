// import { Icons } from '@/components/icons';

// export interface NavItem {
//   title: string;
//   url: string;
//   disabled?: boolean;
//   external?: boolean;
//   shortcut?: [string, string];
//   icon?: keyof typeof Icons;
//   label?: string;
//   description?: string;
//   isActive?: boolean;
//   items?: NavItem[];
// }

// export interface NavItemWithChildren extends NavItem {
//   items: NavItemWithChildren[];
// }

// export interface NavItemWithOptionalChildren extends NavItem {
//   items?: NavItemWithChildren[];
// }

// export interface FooterItem {
//   title: string;
//   items: {
//     title: string;
//     href: string;
//     external?: boolean;
//   }[];
// }

// export type MainNavItem = NavItemWithOptionalChildren;

// export type SidebarNavItem = NavItemWithChildren;

import { Icons } from '@/components/icons';

export interface NavItem {
  title: string;
  url: string;
  disabled?: boolean;

  // ✅ NEW: sirf specific UI context me disable karne ke liye
  // e.g. disableIn: ['sidebar']  → sidebar me disabled, baqi jaga pe enabled
  disableIn?: Array<'sidebar' | 'cmdk' | 'header'>;

  external?: boolean;
  shortcut?: [string, string];
  icon?: keyof typeof Icons;
  label?: string;
  description?: string;
  isActive?: boolean;
  items?: NavItem[];
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[];
}

export interface NavItemWithOptionalChildren extends NavItem {
  items?: NavItemWithChildren[];
}

export interface FooterItem {
  title: string;
  items: {
    title: string;
    href: string;
    external?: boolean;
  }[];
}

export type MainNavItem = NavItemWithOptionalChildren;

export type SidebarNavItem = NavItemWithChildren;
