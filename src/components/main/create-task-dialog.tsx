"use client";

import { useId, useState, useEffect, useRef } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { createTaskFormSchema } from "@/lib/definitions";

import { useCharacterLimit } from "@/hooks/use-character-limit";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import TaskLabelInput from "@/components/shared/task-label-input";
import DatePicker from "@/components/shared/date-picker";
import { useMutation } from "@apollo/client";
import { CREATE_TASK, UPDATE_TASK } from "@/lib/apollo/client/task";
import { useProjectContext } from "./kanban-board";
import { Task } from "@/types";
import Loader from "@/components/shared/loader";

type CreateTaskDialogProps = {
  task?: Task;
  children?: React.ReactNode;
};

function StatusDot({ className }: { className?: string }) {
  return (
    <svg
      width="8"
      height="8"
      fill="currentColor"
      viewBox="0 0 8 8"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle cx="4" cy="4" r="4" />
    </svg>
  );
}

export default function CreateTaskDialog({
  task,
  children,
}: CreateTaskDialogProps) {
  const id = useId();
  const [open, setOpen] = useState(false);

  const { project, addTask } = useProjectContext();

  const [createTask, { loading }] = useMutation(CREATE_TASK);

  const maxLength = 500;
  const {
    value,
    characterCount,
    handleChange,
    maxLength: limit,
  } = useCharacterLimit({
    maxLength,
    initialValue: "",
  });

  const form = useForm({
    resolver: zodResolver(createTaskFormSchema),
    defaultValues: {
      title: task?.title || "",
      description: task?.description || "",
      dueDate: task?.dueDate ? new Date(task?.dueDate) : undefined,
      priority: task?.priority || "LOW",
      status: task?.status || "TODO",
      labels: task?.labels || [],
    },
  });

  async function onSubmit(values: z.infer<typeof createTaskFormSchema>) {
    console.log("values", values);

    const createdTask = await createTask({
      variables: { ...values, projectId: project.id },
    });

    addTask(createdTask.data.createTask as Task);

    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || <Button variant="outline">Add Task</Button>}
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-0 overflow-y-visible p-0 sm:max-w-lg [&>button:last-child]:top-3.5">
        <DialogHeader className="contents space-y-0 text-left">
          <DialogTitle className="border-b px-6 py-4 text-base">
            Create a new task
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="sr-only">
          Add a new task to your list.
        </DialogDescription>
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="overflow-y-auto">
              <div className="space-y-4 px-6 pb-6 pt-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor={`${id}-title`}>
                        Title <span>*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          id={`${id}-title`}
                          placeholder="Task title"
                          type="text"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor={`${id}-description`}>
                        Description{" "}
                        <span className="text-xs text-text-muted">
                          (optional)
                        </span>
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          id={`${id}-description`}
                          placeholder="Task description"
                          className="h-32"
                          maxLength={maxLength}
                          value={field.value}
                          onChange={(event) => {
                            field.onChange(event);
                            handleChange(event);
                          }}
                          aria-describedby={`${id}-description`}
                        />
                      </FormControl>
                      <p
                        id={`${id}-description`}
                        className="mt-2 text-right text-xs text-muted-foreground"
                        role="status"
                        aria-live="polite"
                      >
                        <span className="tabular-nums">
                          {limit - characterCount}
                        </span>{" "}
                        characters left
                      </p>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex gap-4 *:flex-1">
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor={`${id}-status`}>
                          Status <span>*</span>
                        </FormLabel>
                        <FormControl>
                          <Select
                            defaultValue={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger id={`${id}-status`}>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="TODO">
                                <span className="flex items-center gap-2">
                                  <StatusDot className="text-amber-500" />
                                  <span className="truncate">Pending</span>
                                </span>
                              </SelectItem>
                              <SelectItem value="IN_PROGRESS">
                                <span className="flex items-center gap-2">
                                  <StatusDot className="text-blue-500" />
                                  <span className="truncate">In Progress</span>
                                </span>
                              </SelectItem>
                              <SelectItem value="DONE">
                                <span className="flex items-center gap-2">
                                  <StatusDot className="text-emerald-600" />
                                  <span className="truncate">Done</span>
                                </span>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="priority"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor={`${id}-priority`}>
                          Priority <span>*</span>
                        </FormLabel>
                        <FormControl>
                          <Select
                            defaultValue={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger id={`${id}-priority`}>
                              <SelectValue placeholder="Select priority" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="LOW">Low</SelectItem>
                              <SelectItem value="MEDIUM">Medium</SelectItem>
                              <SelectItem value="HIGH">High</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="dueDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel htmlFor={`${id}-due-date`}>
                        Due date{" "}
                        <span className="text-xs text-text-muted">
                          (optional)
                        </span>
                      </FormLabel>
                      <FormControl>
                        <DatePicker
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="labels"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor={`${id}-labels`}>Labels</FormLabel>
                      <FormControl>
                        <TaskLabelInput labels={[]} onChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <DialogFooter className="border-t px-6 py-4">
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="submit"
                className="flex w-20 items-center justify-center"
                disabled={loading}
              >
                {loading ? <Loader /> : "Create"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

type EditTaskDialogProps = {
  task: Task;
  handleClose: () => void;
};

export const EditTaskDialog = ({ task, handleClose }: EditTaskDialogProps) => {
  const id = useId();

  const titleInputRef = useRef<HTMLInputElement>(null);

  const { project, updateTask } = useProjectContext();

  const [updateTaskInDB, { loading }] = useMutation(UPDATE_TASK);

  const maxLength = 500;
  const {
    value,
    characterCount,
    handleChange,
    maxLength: limit,
  } = useCharacterLimit({
    maxLength,
    initialValue: "",
  });

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

  useEffect(() => {
    // Small timeout to ensure the dialog is fully rendered
    const timeoutId = setTimeout(() => {
      if (titleInputRef.current) {
        titleInputRef.current.focus();
      }
    }, 100);

    return () => clearTimeout(timeoutId);
  }, []);

  async function onSubmit(values: z.infer<typeof createTaskFormSchema>) {
    console.log("values", values);

    const updatedTask = await updateTaskInDB({
      variables: { id: task.id, ...values },
    });
    updateTask({ ...values, id: task.id });

    handleClose();
  }

  return (
    <AlertDialogContent className="flex flex-col gap-0 overflow-y-visible p-0 sm:max-w-lg [&>button:last-child]:top-3.5">
      <AlertDialogHeader className="contents space-y-0 text-left">
        <AlertDialogTitle className="border-b px-6 py-4 text-base">
          Edit task
        </AlertDialogTitle>
      </AlertDialogHeader>
      <AlertDialogDescription className="sr-only">
        Edit the task.
      </AlertDialogDescription>
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="overflow-y-auto">
            <div className="space-y-4 px-6 pb-6 pt-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor={`${id}-title`}>
                      Title <span>*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        id={`${id}-title`}
                        placeholder="Task title"
                        type="text"
                        {...field}
                        ref={titleInputRef}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor={`${id}-description`}>
                      Description{" "}
                      <span className="text-xs text-text-muted">
                        (optional)
                      </span>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        id={`${id}-description`}
                        placeholder="Task description"
                        className="h-32"
                        maxLength={maxLength}
                        value={field.value}
                        onChange={(event) => {
                          field.onChange(event);
                          handleChange(event);
                        }}
                        aria-describedby={`${id}-description`}
                      />
                    </FormControl>
                    <p
                      id={`${id}-description`}
                      className="mt-2 text-right text-xs text-muted-foreground"
                      role="status"
                      aria-live="polite"
                    >
                      <span className="tabular-nums">
                        {limit - characterCount}
                      </span>{" "}
                      characters left
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-4 *:flex-1">
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor={`${id}-status`}>
                        Status <span>*</span>
                      </FormLabel>
                      <FormControl>
                        <Select
                          defaultValue={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger id={`${id}-status`}>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="TODO">
                              <span className="flex items-center gap-2">
                                <StatusDot className="text-amber-500" />
                                <span className="truncate">Pending</span>
                              </span>
                            </SelectItem>
                            <SelectItem value="IN_PROGRESS">
                              <span className="flex items-center gap-2">
                                <StatusDot className="text-blue-500" />
                                <span className="truncate">In Progress</span>
                              </span>
                            </SelectItem>
                            <SelectItem value="DONE">
                              <span className="flex items-center gap-2">
                                <StatusDot className="text-emerald-600" />
                                <span className="truncate">Done</span>
                              </span>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="priority"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor={`${id}-priority`}>
                        Priority <span>*</span>
                      </FormLabel>
                      <FormControl>
                        <Select
                          defaultValue={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger id={`${id}-priority`}>
                            <SelectValue placeholder="Select priority" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="LOW">Low</SelectItem>
                            <SelectItem value="MEDIUM">Medium</SelectItem>
                            <SelectItem value="HIGH">High</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="dueDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel htmlFor={`${id}-due-date`}>
                      Due date{" "}
                      <span className="text-xs text-text-muted">
                        (optional)
                      </span>
                    </FormLabel>
                    <FormControl>
                      <DatePicker
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="labels"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor={`${id}-labels`}>Labels</FormLabel>
                    <FormControl>
                      <TaskLabelInput
                        labels={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <AlertDialogFooter className="border-t px-6 py-4">
            <AlertDialogCancel asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </AlertDialogCancel>
            <Button type="submit">Save</Button>
          </AlertDialogFooter>
        </form>
      </Form>
    </AlertDialogContent>
  );
};
