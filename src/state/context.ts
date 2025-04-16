import { createContext, useContext } from "react";
import { User, Project, Task } from "@/types";

export const UserContext = createContext<User | null>(null);
export const ProjectContext = createContext<Project | null>(null);
export const TasksContext = createContext<Task[]>([]);

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export const useProjectContext = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error("useProject must be used within a ProjectProvider");
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
