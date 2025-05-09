"use client";

import { useState, useOptimistic, startTransition, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";

import { Project } from "@/types";

import BreadCrumb from "@/components/shared/breadcrumb";
import UserProjects from "@/components/main/user-projects";
import CreateProjectDialog from "@/components/main/create-project-dialog";
import ProjectsTable, {
  ProjectsTableSkeleton,
} from "@/components/main/projects-table";
import PaddingContainer from "@/components/shared/padding-container";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardHeader } from "@/components/ui/card";
import { File, Folder, Plus } from "lucide-react";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [optimisticProjects, setOptimisticProjects] = useOptimistic(
    projects,
    (projects, project) => [...projects, project],
  );

  const { data, loading, error } = useQuery(gql`
    query {
      projects {
        id
        name
        summary
        description
        color
        created_at
      }
    }
  `);

  useEffect(() => {
    setProjects(data?.projects || []);
  }, [data]);

  const handleAddProject = (project: Project) => {
    startTransition(() =>
      setOptimisticProjects((prev: Project[]) => [...prev]),
    );
    setProjects((prev: Project[]) => [...prev, project]);
  };

  const handleRemoveProject = async (id: string) => {
    startTransition(() =>
      setOptimisticProjects((prev: Project[]) =>
        prev.filter((p) => p.id !== id),
      ),
    );
    setProjects((prev: Project[]) => prev.filter((p) => p.id !== id));
  };

  return (
    <PaddingContainer className="space-y-4">
      <div className="flex items-center justify-between">
        <h6 className="">Projects</h6>
        <CreateProjectDialog
          projects={projects}
          handleAddProject={handleAddProject}
        />
      </div>
      <div className="grid grid-cols-4 gap-4">
        {new Array(4).fill(0).map((_, index) => (
          <Card className="cursor-pointer transition-colors hover:bg-background-secondary dark:hover:bg-background-tertiary">
            <CardHeader className="p-4">
              <div className="flex justify-between">
                <div className="flex flex-col items-start gap-1">
                  <div className="rounded-lg bg-background-quaternary p-2">
                    <Folder className="h-4 w-4" />
                  </div>
                  <h3 className="font-medium">Projects</h3>
                </div>
                <Plus className="h-4 w-4" />
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
      {/* <BreadCrumb /> */}
      {loading ? (
        <ProjectsTableSkeleton />
      ) : projects.length > 0 ? (
        // <UserProjects
        //   projects={optimisticProjects}
        //   handleRemoveProject={handleRemoveProject}
        // />
        <ProjectsTable projects={optimisticProjects} />
      ) : (
        <div className="flex h-48 items-center justify-center">
          <div className="flex flex-col items-center justify-center gap-2">
            <h3 className="text-2xl font-bold">No projects!</h3>
            <p className="text-sm text-muted-foreground">
              Let&apos;s get started by creating a new project.
            </p>
            <CreateProjectDialog
              projects={projects}
              handleAddProject={handleAddProject}
            />
          </div>
        </div>
      )}
    </PaddingContainer>
  );
}
