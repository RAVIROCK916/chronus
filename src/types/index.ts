export type User = {
  id: string;
  name: string;
  email: string;
  created_at: string;
  projects: Project[];
  tasks: Task[];
};

export type Project = {
  id: string;
  name: string;
  description: string;
	created_at: string;
  user: User;
  tasks: Task[];
};

export type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE";
export type TaskPriority = "LOW" | "MEDIUM" | "HIGH";

export type Task = {
  id: string;
  title: string;
  description: string | undefined;
  status: TaskStatus;
  priority: TaskPriority;
  labels: string[];
  project: Project;
  user: User;
  created_at: string;
};

export type Column = {
  id: TaskStatus;
  title: string;
};

export type Event = {
  id: string;
  title: string;
  start: string;
  end: string;
  allDay: boolean;
};
