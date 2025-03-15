"use client";

import Logo from "../shared/logo";
import AddButton from "../shared/add-button";
import { sidebarItems } from "@/constants";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";

const Sidebar = () => {
  const location = usePathname();
  return (
    <div className="h-full min-w-64 space-y-4 p-4">
      <Logo />
      <div className="space-y-6">
        <div className="space-y-1">
          {sidebarItems.map((item) => {
            const isActive = location.startsWith(item.href);
            return (
              <div
                key={item.id}
                className={cn(
                  "rounded-md px-4 py-2.5 hover:bg-opacity-20",
                  isActive && "hover:bg-text-secondary bg-foreground",
                )}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "text-text-tertiary hover:text-text-secondary flex items-center gap-x-3 text-sm",
                    isActive &&
                      "hover:text-background-secondary text-background",
                  )}
                >
                  <item.icon
                    size={18}
                    className="stroke-2"
                    aria-hidden="true"
                  />
                  <span>{item.name}</span>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
