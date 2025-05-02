import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Project } from "@/types";
import Link from "next/link";
import { useId } from "react";
import MarginContainer from "@/components/shared/margin-container";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

type ProjectsTableProps = {
  projects: Project[];
};

export default function ProjectsTable({ projects }: ProjectsTableProps) {
  const id = useId();
  return (
    <MarginContainer className="overflow-hidden bg-background">
      <Table className="border-t">
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="pl-8">Name</TableHead>
            <TableHead>Summary</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Created At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="[&_td:first-child]:rounded-l-lg [&_td:last-child]:rounded-r-lg">
          {projects.map((project, idx) => (
            <TableRow
              key={`${project.name}-${idx}`}
              className="border-none *:py-2.5"
            >
              <TableCell className="flex items-center gap-2 pl-8">
                <span
                  className={cn(
                    "inline-block size-4 rounded-full",
                    `bg-${project.color}-400`,
                  )}
                ></span>
                <Link href={`/projects/${project.name}/${project.id}`}>
                  {project.name}
                </Link>
              </TableCell>
              <TableCell>
                <p className="line-clamp-1">{project.summary}</p>
              </TableCell>
              <TableCell>
                <p className="line-clamp-1 max-w-96">{project.description}</p>
              </TableCell>
              <TableCell>
                {new Date(Number(project.created_at)).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </MarginContainer>
  );
}

export const ProjectsTableSkeleton = () => {
  const loadingRows = Array(5).fill(null);

  return (
    <MarginContainer className="overflow-hidden bg-background">
      <Table className="border-t">
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="pl-8">Name</TableHead>
            <TableHead>Summary</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Created At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="[&_td:first-child]:rounded-l-lg [&_td:last-child]:rounded-r-lg">
          {loadingRows.map((_, idx) => (
            <TableRow key={idx} className="border-none *:py-2.5">
              <TableCell className="flex items-center gap-2 pl-8">
                <Skeleton className="size-4 rounded-full" />
                <Skeleton className="h-5 w-32" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-5 w-48" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-5 w-64 max-w-96" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-5 w-24" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </MarginContainer>
  );
};
