"use client";

import { useSidebar } from "@/components/ui/sidebar";
import { Bell, PanelLeft, SettingsIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import Searchbar from "./search-bar";
import Link from "next/link";
import PaddingContainer from "../shared/padding-container";
import ThemeIcon from "../shared/theme-icon";
import { Button } from "../ui/button";

type HeaderProps = {
  children?: React.ReactNode;
};

const Header = ({ children }: HeaderProps) => {
  const { state, toggleSidebar } = useSidebar();
  const isCollapsed = state !== "expanded";

  return (
    <header className="sticky top-0 z-10 bg-background/50 backdrop-blur">
      <PaddingContainer className="flex items-center">
        <div
          className={cn(
            "mr-4 transition-all",
            isCollapsed
              ? "block translate-x-0 opacity-100"
              : "hidden -translate-x-4 opacity-0 xl:pointer-events-none",
          )}
        >
          <button
            onClick={toggleSidebar}
            className="rounded-lg p-2 hover:bg-background-secondary"
          >
            <PanelLeft className={cn("size-4", isCollapsed && "rotate-180")} />
          </button>
        </div>

        <div className="flex flex-1 flex-row-reverse items-center justify-between transition-all">
          <div className="flex items-center gap-x-8">
            <Searchbar className="w-80" />
            <div className="flex items-center gap-x-3 *:cursor-pointer *:rounded">
              <ThemeIcon />
              {/* // TODO: Add a popup when clicked on the notifications icon */}
              <Button size="icon" variant="ghost">
                <Link href="/notifications">
                  <Bell
                    size={18}
                    className="transition-colors hover:text-foreground"
                  />
                </Link>
              </Button>
              <Button size="icon" variant="ghost">
                <Link href="/settings">
                  <SettingsIcon
                    size={18}
                    className="transition-colors hover:text-foreground"
                  />
                </Link>
              </Button>
            </div>
          </div>
          {children}
        </div>
      </PaddingContainer>
    </header>
  );
};

export default Header;
