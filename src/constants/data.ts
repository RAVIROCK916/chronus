// import { Calendar } from "@phosphor-icons/react";
import {
  Bell,
  Calendar,
  FolderClosed,
  Home,
  LayoutIcon,
  Settings,
} from "lucide-react";

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
    name: "Calendar",
    href: "/calendar",
    icon: Calendar,
  },
  {
    id: 5,
    name: "Notifications",
    href: "/notifications",
    icon: Bell,
  },
  {
    id: 6,
    name: "Settings",
    href: "/settings",
    icon: Settings,
  },
];
