export const ROUTES = {
  HOME: "/",
  ABOUT: "/about",
  COURSES: "/courses",
  GAMES: "/games",
  CAREERS: "/careers",
  CONTACT: "/contact",
} as const;

export type Route = (typeof ROUTES)[keyof typeof ROUTES];
