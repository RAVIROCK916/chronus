"use client";

import { useState, useOptimistic, startTransition, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";

import { Project } from "@/types";

import CreateProjectDialog from "@/components/main/create-project-dialog";
import ProjectsTable, {
  ProjectsTableSkeleton,
} from "@/components/main/projects-table";
import PaddingContainer from "@/components/shared/padding-container";
import { Card, CardHeader } from "@/components/ui/card";
import { Calendar, Check, Folder, Plus } from "lucide-react";
import Loader from "@/components/shared/loader";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [optimisticProjects, setOptimisticProjects] = useOptimistic(
    projects,
    (projects, project) => [...projects, project],
  );

  const creators = [
    {
      id: "1",
      name: "Project",
      icon: Folder,
    },
    {
      id: "2",
      name: "Task",
      icon: Check,
    },
    {
      id: "3",
      name: "Event",
      icon: Calendar,
    },
    {
      id: "4",
      name: "Create",
      icon: Plus,
    },
  ];

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
      {/* <div className="flex items-center justify-between">
        <h6 className="">Projects</h6>
        <CreateProjectDialog
          projects={projects}
          handleAddProject={handleAddProject}
        />
      </div> */}
      <div className="grid grid-cols-4 gap-4">
        {creators.map((item) => (
          <Card
            key={item.id}
            className="cursor-pointer transition-colors hover:bg-background-secondary dark:hover:bg-background-tertiary"
          >
            <CardHeader className="p-4">
              <div className="flex justify-between">
                <div className="flex flex-col items-start gap-2">
                  <div className="rounded-md bg-foreground p-1.5">
                    <item.icon className="h-4 w-4 stroke-background" />
                  </div>
                  <h3 className="font-medium">New {item.name}</h3>
                </div>
                <Plus className="h-4 w-4" />
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
      {/* <BreadCrumb /> */}
      {loading ? (
        <div className="flex h-[75vh] items-center justify-center">
          <Loader />
        </div>
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
