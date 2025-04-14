import { createContext, useContext } from "react";
import { User, Project, Task } from "@/types";

export const UserContext = createContext<User | null>(null);
export const ProjectsContext = createContext<Project[]>([]);
export const TasksContext = createContext<Task[]>([]);

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

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
