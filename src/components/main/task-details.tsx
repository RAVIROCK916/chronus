"use client";

import { Task } from "@/types";

type TaskDetailsProps = {
  task: Task;
};

export default function TaskDetails({ task }: TaskDetailsProps) {
  return (
    <div>
      <h3 className="text-2xl font-semibold">{task.title}</h3>
      <p>{task.description}</p>
    </div>
  );
}
