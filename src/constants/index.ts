import { FolderClosed, Home, LayoutIcon, Settings } from "lucide-react";

export const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export const publicRoutes = ["/login", "/signup", "/"];

export const sidebarItems = [
  {
    id: 1,
    name: "Overview",
    href: "/overview",
    icon: Home,
  },
  {
    id: 2,
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutIcon,
  },
  {
    id: 3,
    name: "Projects",
    href: "/projects",

    icon: FolderClosed,
  },
  {
    id: 4,
    name: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export const IMAGE_PLACEHOLDER_URL = "https://github.com/shadcn.png";
