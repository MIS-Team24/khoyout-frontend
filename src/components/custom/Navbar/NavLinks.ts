export interface NavLink {
  label: string;
  path: string;
}

export const allLinks = [
  { label: "Home", path: "/home" },
  { label: "Designers", path: "/designers" },
  { label: "Wishlist", path: "/wishlist" },
  { label: "Subscription", path: "/subscription/" },
];

const [Home, Designers, Wishlist, Subscription] = allLinks;
export const initialTabs = [Home, Designers, Wishlist, Subscription];

export function getNextIngredient(navs: NavLink[]): NavLink | undefined {
  const existing = new Set(navs);
  return allLinks.find((navlink) => !existing.has(navlink));
}
