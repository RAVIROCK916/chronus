"use client";

import { useState, useOptimistic, startTransition, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";

import { Project } from "@/types";

import BreadCrumb from "@/components/shared/breadcrumb";
import UserProjects from "@/components/main/user-projects";
import CreateProjectDialog from "@/components/main/create-project-dialog";
import ProjectsTable from "@/components/main/projects-table";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [optimisticProjects, setOptimisticProjects] = useOptimistic(
    projects,
    (projects, project) => [...projects, project],
  );

  const { data, error } = useQuery(gql`
    query {
      projects {
        id
        name
        description
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
    <div className="space-y-4 p-4">
      <h1 className="text-4xl font-medium">Projects</h1>
      {/* <BreadCrumb /> */}
      <CreateProjectDialog
        projects={projects}
        handleAddProject={handleAddProject}
      />
      {/* <UserProjects
        projects={optimisticProjects}
        handleRemoveProject={handleRemoveProject}
      /> */}
      {projects.length > 0 && <ProjectsTable projects={optimisticProjects} />}
    </div>
  );
}
