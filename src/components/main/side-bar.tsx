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
    <div className="h-full w-72 space-y-4 p-4">
      <Logo />
      <div className="space-y-6">
        <AddButton />
        <div className="space-y-1">
          {sidebarItems.map((item) => {
            const isActive = location === item.href;
            return (
              <div
                key={item.id}
                className={cn(
                  "rounded-md px-4 py-2.5 hover:bg-opacity-20",
                  isActive && "bg-backgroundGray",
                )}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-x-3 text-sm text-textGray",
                    isActive && "text-primary",
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
