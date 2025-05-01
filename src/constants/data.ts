// import { Calendar } from "@phosphor-icons/react";
import { getRandomAvatar } from "@/utils/avatar";
import { Bell, Calendar, Folder, Settings, MessageSquare } from "lucide-react";

import { PiTableFill } from "react-icons/pi";

export const sidebarItems = {
  top: [
    {
      id: 1,
      name: "Dashboard",
      href: "/dashboard",
      icon: PiTableFill,
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
      name: "Contact Us",
      href: "/contact-us",
      icon: MessageSquare,
    },
  ],
  user: {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: getRandomAvatar(),
  },
};
