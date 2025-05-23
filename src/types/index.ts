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
  due_date: string;
  created_at: string;
  user: User;
  tasks: Task[];
};

export type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE";
export type TaskPriority = "LOW" | "MEDIUM" | "HIGH";
export type TaskComment = {
  id: string;
  content: string;
  created_at: string;
  user: User;
};

export type Task = {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  labels?: string[];
  due_date?: string;
  comments?: TaskComment[];
  project: Project;
  user: User;
  created_at: string;
  updated_at: string;
  completed_at?: string;
};

export type Event = {
  id: string;
  title: string;
  start: string;
  end: string;
  all_day: boolean;
  created_at: string;
  updated_at: string;
};

export type NotificationCategory = "general" | "reminder";

export type Notification = {
  id: string;
  title: string;
  message: string;
  category: NotificationCategory;
  is_read: boolean;
  created_at: string;
};
