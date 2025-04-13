import { createContext, useContext } from "react";
import { Project, Task } from "@/types";

export const ProjectsContext = createContext<Project[]>([]);
export const TasksContext = createContext<Task[]>([]);

export const useProjectsContext = () => {
  const context = useContext(ProjectsContext);
  if (!context) {
    throw new Error("useProjects must be used within a ProjectsProvider");
  }
  return context;
};

export const useTasksContext = () => {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error("useTasks must be used within a TasksProvider");
  }
  return context;
};
