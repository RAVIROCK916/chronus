"use client";

import { cn, getTimeOfDay } from "@/lib/utils";
import { useSidebar } from "@/components/ui/sidebar";
import Sidebar from "@/components/main/side-bar";
import Header from "@/components/main/header";
import { usePathname } from "next/navigation";

export default function MainContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const { state } = useSidebar();
  const location = usePathname();

  return (
    <div className="flex w-screen">
      <Sidebar />
      <div
        className={cn(
          "flex flex-1 flex-col transition-all duration-500",
          state === "expanded" ? "xl:ml-0" : "xl:ml-[-16rem]", // 16rem = 64 (w-64 of sidebar)
        )}
      >
        {/* //?: Render different content based on the page */}
        <Header>
          {/* {location === "/dashboard" ? (
            <p className="text-sm uppercase text-text-muted">
              Good{" "}
              <span className="text-3xl tracking-wider text-foreground">
                {getTimeOfDay()}
              </span>
            </p>
          ) : null} */}
        </Header>
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
