"use client";

import { useId, useState } from "react";

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
import TaskLabelInput from "../shared/task-label-input";
import DatePicker from "../shared/date-picker";
import { useMutation } from "@apollo/client";
import { CREATE_TASK } from "@/lib/apollo/client/task";
import { useProjectContext } from "./kanban-board";

export default function CreateTaskDialog() {
  const id = useId();
  const [open, setOpen] = useState(false);

  const { project } = useProjectContext();

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
      title: "",
      description: "",
      dueDate: undefined,
      priority: "LOW",
      status: "TODO",
      labels: [],
    },
  });

  function onSubmit(values: z.infer<typeof createTaskFormSchema>) {
    console.log("values", values);

    createTask({ variables: { ...values, projectId: project.id } });

    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add Task</Button>
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
                              <SelectItem value="TODO">Todo</SelectItem>
                              <SelectItem value="IN_PROGRESS">
                                In progress
                              </SelectItem>
                              <SelectItem value="DONE">Done</SelectItem>
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
                      {/* <FormLabel htmlFor={`${id}-labels`}>Labels</FormLabel> */}
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
              <Button type="submit">Create</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
