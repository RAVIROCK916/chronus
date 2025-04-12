import { createContext, useContext } from "react";

import { GET_TASK, UPDATE_TASK } from "@/lib/apollo/client/task";
import { useMutation, useQuery } from "@apollo/client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { createTaskFormSchema } from "@/lib/definitions";

type EditTaskDialogProps = {
  taskId: string;
  children: React.ReactNode;
};

const TaskFormContext = createContext<any>(null);

function useTaskFormContext() {
  const context = useContext(TaskFormContext);
  if (!context) {
    throw new Error(
      "TaskForm components must be used within TaskForm.Root components",
    );
  }
  return context;
}

function Root({ taskId, children }: EditTaskDialogProps) {
  const { data: task } = useQuery(GET_TASK, {
    variables: { id: taskId },
  });
  const [updateTaskInDB, { loading }] = useMutation(UPDATE_TASK);

  const form = useForm({
    resolver: zodResolver(createTaskFormSchema),
    defaultValues: {
      title: task.title || "",
      description: task.description || "",
      dueDate: task.dueDate ? new Date(task.dueDate) : undefined,
      priority: task.priority || "LOW",
      status: task.status || "TODO",
      labels: task.labels || [],
    },
  });

  async function onSubmit(values: z.infer<typeof createTaskFormSchema>) {
    console.log("values", values);

    const updatedTask = await updateTaskInDB({
      variables: { id: task.id, ...values },
    });
  }

  const value = {
    form,
    loading,
    onSubmit,
  };

  return (
    <TaskFormContext.Provider value={value}>
      {children}
    </TaskFormContext.Provider>
  );
}
