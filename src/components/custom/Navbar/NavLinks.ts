export interface NavLink {
    label: string;
    path: string;
  }
  
  export const allLinks = [
    { label: "Home", path: "/home" },
    { label: "Designers", path: "/designers" },
    { label: "Inspiration", path: "/inspiration" },
    { label: "Contact Us", path: "/contact" },
  ];
  
  const [Home, Designers, Inspiration, ContactUs] = allLinks;
  export const initialTabs = [Home, Designers, Inspiration, ContactUs];
  
  export function getNextIngredient(
    navs: NavLink[]
  ): NavLink | undefined {
    const existing = new Set(navs);
    return allLinks.find((navlink) => !existing.has(navlink));
  }