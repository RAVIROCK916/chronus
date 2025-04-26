export type User = {
  id: string;
  name: string;
  email: string;
  profile_picture: string;
  created_at: string;
  projects: Project[];
  tasks: Task[];
};

export type Project = {
  id: string;
  name: string;
  summary: string;
  description: string;
  color: string;
  picture: string;
  created_at: string;
  user: User;
  tasks: Task[];
};

export type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE";
export type TaskPriority = "LOW" | "MEDIUM" | "HIGH";

export type Task = {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  labels?: string[];
  dueDate?: string;
  project: Project;
  user: User;
  created_at: string;
  updated_at: string;
  completed_at?: string;
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
  created_at: string;
  updated_at: string;
};

export type NotificationCategory = "general" | "reminder";

export type Notification = {
  id: string;
  title: string;
  message: string;
  category: string;
  isRead: boolean;
  created_at: string;
};
