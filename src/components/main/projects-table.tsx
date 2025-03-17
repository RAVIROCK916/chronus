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

type ProjectsTableProps = {
  projects: Project[];
};

export default function ProjectsTable({ projects }: ProjectsTableProps) {
  const id = useId();
  return (
    <div className="overflow-hidden rounded-md border bg-background">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Created At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((project) => (
            <TableRow key={project.id}>
              <TableCell>
                <Link
                  href={`/projects/${project.name}/${project.id}`}
                  className="hover:underline"
                >
                  {project.name}
                </Link>
              </TableCell>
              <TableCell>{project.description}</TableCell>
              <TableCell>
                {project.created_at &&
                  new Date(project.created_at).toDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
