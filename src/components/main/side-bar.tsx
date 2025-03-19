"use client";

import Logo from "../shared/logo";
import AddButton from "../shared/add-button";
import { sidebarItems } from "@/constants/data";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";

const Sidebar = () => {
  const location = usePathname();
  return (
    <div className="sticky top-0 h-full min-w-64 space-y-4 p-4">
      <Logo />
      <div className="space-y-6">
        <div className="space-y-1">
          {sidebarItems.map((item) => {
            const isActive = location.startsWith(item.href);
            return (
              <div
                key={item.id}
                className={cn(
                  "rounded-md transition-colors hover:bg-background-secondary",
                  isActive && "bg-foreground hover:bg-text-secondary",
                )}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-x-3 px-4 py-2.5 text-sm text-text-tertiary transition-colors hover:text-text-secondary",
                    isActive &&
                      "text-background hover:text-background-secondary",
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
