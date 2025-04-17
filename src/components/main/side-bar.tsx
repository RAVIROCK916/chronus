"use client";

import Logo from "../shared/logo";
import AddButton from "../shared/add-button";
import { Separator } from "@/components/ui/separator";
import { sidebarItems } from "@/constants/data";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Command, LucideIcon, PanelLeft, Settings } from "lucide-react";
import { IconType } from "react-icons/lib";
import { NavUser } from "../shared/nav-user";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";

type SidebarItemProps = {
  name: string;
  href: string;
  Icon: IconType;
};

const SidebarItem = ({ name, href, Icon }: SidebarItemProps) => {
  const location = usePathname();
  const isActive = location.startsWith(href);
  return (
    <div
      className={cn(
        "rounded-md transition-colors hover:bg-background-secondary",
        isActive && "bg-text-primary hover:bg-text-primary/90",
      )}
    >
      <Link
        href={href}
        className={cn(
          "flex items-center gap-x-2.5 px-3 py-2 text-sm text-primary transition-colors",
          isActive && "text-background-secondary",
        )}
      >
        <Icon size={18} aria-hidden="true" />
        <span>{name}</span>
      </Link>
    </div>
  );
};

const Sidebar = () => {
  const location = usePathname();
  const [isExpanded, setIsExpanded] = useState(true);

  const profile = useSelector((state: RootState) => state.profile);

  return (
    <div
      className={cn(
        "sticky top-0 hidden h-screen w-64 space-y-4 border-r py-4 transition-transform duration-500 xl:block",
        isExpanded ? "translate-x-0" : "-translate-x-full",
      )}
    >
      <div className="flex h-full flex-col justify-between gap-y-4">
        <div className="space-y-4">
          {/* <Logo /> */}
          <SideBarContainer>
            <div className="relative flex items-center justify-between">
              <div className="flex gap-x-2">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Acme Inc</span>
                  <span className="truncate text-xs">Enterprise</span>
                </div>
              </div>
              <div
                className={cn(
                  "cursor-pointer rounded-lg p-2 transition-all duration-500 hover:bg-background-secondary",
                  !isExpanded && "translate-x-[200%] rotate-180",
                )}
                onClick={() => setIsExpanded(!isExpanded)}
              >
                <PanelLeft className="size-4" />
              </div>
            </div>
          </SideBarContainer>
          <Separator />
          {/* Sidebar items */}
          <div className="space-y-6 px-3">
            <div className="space-y-1">
              {sidebarItems.top.map((item) => (
                <SidebarItem
                  key={item.name}
                  name={item.name}
                  href={item.href}
                  Icon={item.icon}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <SideBarContainer className="space-y-1">
            {sidebarItems.bottom.map((item) => (
              <SidebarItem
                key={item.name}
                name={item.name}
                href={item.href}
                Icon={item.icon}
              />
            ))}
          </SideBarContainer>
          <Separator />
          <SideBarContainer>
            <NavUser user={profile} />
          </SideBarContainer>
        </div>
      </div>
    </div>
  );
};

function SideBarContainer({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={cn("px-3", className)}>{children}</div>;
}

export default Sidebar;
