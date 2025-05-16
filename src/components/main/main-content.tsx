"use client";

import { cn } from "@/lib/utils";
import { getTimeOfDay } from "@/utils/date";
import { useSidebar } from "@/components/ui/sidebar";
import Sidebar from "@/components/main/side-bar";
import Header from "@/components/main/header";
import { usePathname } from "next/navigation";
import BreadCrumb from "@/components/shared/breadcrumb";
import { Icon } from "@phosphor-icons/react";

export default function MainContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const { state } = useSidebar();
  const location = usePathname();

  const breadcrumbs: { name: string; url: string; icon?: Icon }[] = [];

  function getHeaderContent() {
    // Handle root routes
    if (location === "/dashboard") {
      return (
        // <p className="text-sm uppercase text-text-muted">
        //   Good{" "}
        //   <span className="text-3xl tracking-wider text-foreground">
        //     {getTimeOfDay()}
        //   </span>
        // </p>
        <h1 className="text-4xl">Dashboard</h1>
      );
    }

    // Handle tasks routes
    if (location === "/tasks") {
      return <BreadCrumb paths={breadcrumbs} />;
    }

    // Handle projects routes
    if (location === "/projects") {
      return <p className="text-xl">Projects</p>;
    }

    if (location.match(/^\/projects\/[^/]+\/[^/]+$/)) {
      const projectName = decodeURIComponent(location.split("/")[2]);
      breadcrumbs.push({
        name: "Projects",
        url: "/projects",
      });
      breadcrumbs.push({
        name: projectName,
        url: `/projects/${projectName}`,
      });
      return <BreadCrumb paths={breadcrumbs} />;
    }

    if (location.match(/^\/projects\/[^/]+\/[^/]+\/tasks\/[^/]+\/[^/]+$/)) {
      const projectName = decodeURIComponent(location.split("/")[2]);
      const projectId = decodeURIComponent(location.split("/")[3]);
      const taskName = decodeURIComponent(location.split("/")[5]);
      const taskId = decodeURIComponent(location.split("/")[6]);

      breadcrumbs.push({
        name: projectName,
        url: `/projects/${projectName}/${projectId}`,
      });
      breadcrumbs.push({
        name: taskName,
        url: `/projects/${projectName}/tasks/${taskName}/${taskId}`,
      });
      return <BreadCrumb paths={breadcrumbs} />;
    }

    // Handle notifications route
    if (location === "/notifications") {
      return <p className="text-xl font-medium">Notifications</p>;
    }

    // Handle calendar route
    // if (location === "/calendar") {
    //   return <p className="text-lg font-semibold">Calendar</p>;
    // }

    // Handle settings route
    // if (location === "/settings") {
    //   return <p className="text-lg font-semibold">Settings</p>;
    // }

    // Default case
    return null;
  }

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
        <Header>{getHeaderContent()}</Header>
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
