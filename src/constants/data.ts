// import { Calendar } from "@phosphor-icons/react";
import { getRandomAvatar } from "@/utils/avatar";
import {
  Bell,
  Calendar,
  Folder,
  Home,
  Settings,
  LayoutIcon,
  MessageSquare,
  LayoutDashboard,
  Sheet,
} from "lucide-react";

import {
  FaBell,
  FaCalendar,
  FaFolder,
  FaGear,
  FaHouse,
  FaMessage,
  FaTable,
} from "react-icons/fa6";

export const sidebarItems = {
  top: [
    {
      id: 1,
      name: "Dashboard",
      href: "/dashboard",
      icon: Sheet,
    },
    {
      id: 2,
      name: "Projects",
      href: "/projects",
      icon: Folder,
    },
    {
      id: 3,
      name: "Calendar",
      href: "/calendar",
      icon: Calendar,
    },
    {
      id: 4,
      name: "Notifications",
      href: "/notifications",
      icon: Bell,
    },
  ],
  bottom: [
    {
      id: 1,
      name: "Settings",
      href: "/settings",
      icon: Settings,
    },
    {
      id: 2,
      name: "Feedback",
      href: "/feedback",
      icon: MessageSquare,
    },
  ],
  user: {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: getRandomAvatar(),
  },
};
