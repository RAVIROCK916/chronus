"use client";

import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";
import { Icon } from "@phosphor-icons/react";

import { usePathname } from "next/navigation";
import React from "react";

type BreadCrumbProps = {
  paths: {
    name: string;
    url: string;
    icon?: Icon;
  }[];
};

export default function BreadCrumb({ paths }: BreadCrumbProps) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem key="home">
          <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {paths.map((path, index) => {
          const isLast = index === paths.length - 1;
          return (
            <React.Fragment key={path.name}>
              <BreadcrumbItem className={cn(isLast && "text-foreground")}>
                <BreadcrumbLink
                  href={!isLast ? path.url : undefined}
                  className="flex items-center gap-x-2"
                >
                  {path.icon && <path.icon size={16} />}
                  {path.name}
                </BreadcrumbLink>
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator />}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
