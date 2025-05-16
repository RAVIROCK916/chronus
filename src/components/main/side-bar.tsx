"use client";

import Logo from "@/components/shared/logo";
import AddButton from "@/components/shared/add-button";
import { Separator } from "@/components/ui/separator";
import Searchbar from "@/components/main/search-bar";
import { sidebarItems } from "@/constants/data";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Command, LucideIcon, PanelLeft, Settings } from "lucide-react";
import { IconType } from "react-icons/lib";
import { NavUser } from "@/components/shared/nav-user";
import { useSidebar } from "@/components/ui/sidebar";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { HighlightNotificationCard } from "@/components/main/highlight-notification-card";

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
        "rounded transition-colors hover:bg-background-secondary dark:hover:bg-background-tertiary",
        isActive &&
          "hover:bg-current/90 bg-background-tertiary dark:bg-foreground dark:hover:bg-foreground/90",
      )}
    >
      <Link
        href={href}
        className={cn(
          "flex items-center gap-x-2.5 px-2.5 py-2 text-sm text-text-secondary transition-colors lg:px-3",
          isActive && "text-primary dark:text-background",
        )}
      >
        <Icon size={18} aria-hidden="true" />
        <span className="hidden lg:block">{name}</span>
      </Link>
    </div>
  );
};

const Sidebar = () => {
  const { state, toggleSidebar } = useSidebar();
  const profile = useSelector((state: RootState) => state.profile);

  return (
    <div
      className={cn(
        "sticky top-0 hidden h-screen space-y-4 border-r bg-background-hover py-4 transition-transform duration-500 sm:block lg:w-64",
        state === "expanded" ? "translate-x-0" : "-translate-x-full",
      )}
    >
      <div className="flex h-full flex-col justify-between gap-y-4">
        <div className="space-y-4">
          {/* <Logo /> */}
          <SideBarContainer>
            <div className="relative flex items-center justify-center lg:justify-between">
              <div className="flex gap-x-2">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="hidden flex-1 text-left text-sm leading-tight lg:grid">
                  <span className="truncate font-semibold">Acme Inc</span>
                  <span className="truncate text-xs">Enterprise</span>
                </div>
              </div>
              <div
                className={cn(
                  "hidden cursor-pointer rounded-lg p-2 transition-opacity duration-500 hover:bg-background-secondary lg:block",
                  state !== "expanded"
                    ? "pointer-events-none opacity-0"
                    : "opacity-100",
                )}
                onClick={toggleSidebar}
              >
                <PanelLeft className="size-4" />
              </div>
            </div>
          </SideBarContainer>
          <Separator />
          {/* Sidebar items */}
          <SideBarContainer>
            <div className="space-y-3 lg:space-y-1">
              {sidebarItems.top.map((item) => (
                <SidebarItem
                  key={item.name}
                  name={item.name}
                  href={item.href}
                  Icon={item.icon}
                />
              ))}
            </div>
          </SideBarContainer>
        </div>
        <SideBarContainer className="space-y-4">
          <div className="space-y-3 lg:space-y-1">
            {sidebarItems.bottom.map((item) => (
              <SidebarItem
                key={item.name}
                name={item.name}
                href={item.href}
                Icon={item.icon}
              />
            ))}
          </div>
          <HighlightNotificationCard />
          <Separator />
          <NavUser user={profile} />
        </SideBarContainer>
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
