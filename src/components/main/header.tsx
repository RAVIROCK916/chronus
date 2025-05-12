"use client";

import { useSidebar } from "@/components/ui/sidebar";
import { Bell, PanelLeft, SettingsIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import Searchbar from "./search-bar";
import Link from "next/link";
import PaddingContainer from "../shared/padding-container";

type HeaderProps = {
  children?: React.ReactNode;
};

const Header = ({ children }: HeaderProps) => {
  const { state, toggleSidebar } = useSidebar();
  const isCollapsed = state !== "expanded";

  return (
    <header className="sticky top-0 z-10 h-16 bg-background/80 backdrop-blur-md">
      <PaddingContainer className="flex items-center">
        <div>
          <button
            onClick={toggleSidebar}
            className={cn(
              "mr-4 rounded-lg p-2 transition-opacity duration-300 hover:bg-background-secondary",
              isCollapsed ? "opacity-100" : "opacity-0 xl:pointer-events-none",
            )}
          >
            <PanelLeft className={cn("size-4", isCollapsed && "rotate-180")} />
          </button>
        </div>

        <div className="flex flex-1 flex-row-reverse items-center justify-between">
          <div className="flex items-center gap-x-8">
            <Searchbar className="w-80" />
            <div className="flex gap-x-6 *:cursor-pointer *:rounded">
              {/* // TODO: Add a popup when clicked on the notifications icon */}
              <Link href="/notifications">
                <Bell
                  size={18}
                  className="text-text-muted transition-colors hover:text-foreground"
                />
              </Link>
              <Link href="/settings">
                <SettingsIcon
                  size={18}
                  className="text-text-muted transition-colors hover:text-foreground"
                />
              </Link>
            </div>
          </div>
          {children}
        </div>
      </PaddingContainer>
    </header>
  );
};

export default Header;
