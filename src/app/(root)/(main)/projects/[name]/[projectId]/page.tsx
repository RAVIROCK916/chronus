"use client";

import BreadCrumb from "@/components/shared/breadcrumb";
import { Folder } from "lucide-react";
import { createContext, useState } from "react";
import ProjectHeader from "@/components/main/project-header";
import { useMutation, useQuery } from "@apollo/client";
import { GET_PROJECT } from "@/lib/apollo/client/project";
import { Project } from "@/types";
import { DELETE_TASK, DELETE_TASKS } from "@/lib/apollo/client/task";

type ProjectPageProps = {
  params: {
    name: string;
    projectId: string;
  };
};

export const ProjectContext = createContext<{
  project: Project;
  addTask: (task: any) => void;
  updateTask: (task: any) => void;
  deleteTask: (taskId: string) => void;
  deleteTasks(taskIds: string[]): void;
} | null>(null);

export default function ProjectPage({
  params: { name, projectId },
}: ProjectPageProps) {
  name = decodeURIComponent(name);

  const [project, setProject] = useState<Project | null>(null);

  const { data, loading } = useQuery<{ project: Project }>(GET_PROJECT, {
    variables: { projectId },
  });

  const [deleteTaskFromDB] = useMutation(DELETE_TASK);
  const [deleteTasksFromDB] = useMutation(DELETE_TASKS);

  const addTask = (task: any) => {
    if (project) {
      setProject({
        ...project,
        tasks: [...project.tasks, task],
      });
    }
  };

  const updateTask = (task: any) => {
    if (project) {
      setProject({
        ...project,
        tasks: project.tasks.map((t) => {
          if (t.id === task.id) {
            return task;
          }
          return t;
        }),
      });
    }
  };

  const deleteTask = async (taskId: string) => {
    await deleteTaskFromDB({
      variables: {
        id: taskId,
      },
    });

    if (project) {
      setProject({
        ...project,
        tasks: project.tasks.filter((task) => task.id !== taskId),
      });
    }
  };

  const deleteTasks = async (taskIds: string[]) => {
    await deleteTasksFromDB({
      variables: {
        taskIds,
      },
    });

    if (project) {
      setProject({
        ...project,
        tasks: project.tasks.filter((task) => !taskIds.includes(task.id)),
      });
    }
  };

  const breadcrumbPaths = [
    { name: "Projects", url: "/projects", icon: Folder },
    { name: name, url: `/projects/${projectId}` },
  ];

  if (data?.project && !project) {
    setProject(data.project);
  }

  if (loading || !project) {
    return <div>Loading...</div>;
  }

  return (
    <ProjectContext.Provider
      value={{ project, addTask, updateTask, deleteTask, deleteTasks }}
    >
      <div className="space-y-6 py-3">
        <BreadCrumb paths={breadcrumbPaths} />
        <div className="space-y-2">
          <h1 className="text-4xl">{name}</h1>
          <p className="text-text-muted">{data?.project?.description}</p>
          {/* <AddButton text="Add task" /> */}
        </div>
        <ProjectHeader />
      </div>
    </ProjectContext.Provider>
  );
}
