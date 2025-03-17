export type Project = {
  id: string;
  name: string;
  description: string;
  user_id: string;
  created_at: string;
};

export type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE";
export type TaskPriority = "LOW" | "MEDIUM" | "HIGH";

export type Task = {
  id: string;
  title: string;
  description: string | undefined;
  status: TaskStatus;
  priority: TaskPriority;
  project_id: string;
  user_id: string;
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
