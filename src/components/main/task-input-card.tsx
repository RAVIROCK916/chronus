import { forwardRef } from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { createTaskFormSchema } from "@/lib/definitions";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { TaskStatus } from "@/types";
import { gql, useMutation } from "@apollo/client";
import { useProject } from "./kanban-board";

type TaskInputCardProps = {
  status: TaskStatus;
  createTask: (status: TaskStatus, title: string, description?: string) => void;
};

export default forwardRef<HTMLDivElement, TaskInputCardProps>(
  function TaskInputCard({ status, createTask }, ref) {
    const { project } = useProject();

    const form = useForm({
      resolver: zodResolver(createTaskFormSchema),
      defaultValues: {
        title: "",
        description: "",
      },
    });

    const ADD_TASK = gql`
      mutation addTask(
        $title: String!
        $description: String
        $status: String!
        $projectId: ID!
      ) {
        addTask(
          status: $status
          title: $title
          description: $description
          projectId: $projectId
        ) {
          id
          title
          description
          status
        }
      }
    `;

    const [addTask] = useMutation(ADD_TASK);

    async function onSubmit(values: z.infer<typeof createTaskFormSchema>) {
      addTask({
        variables: {
          title: values.title,
          description: values.description,
          status,
          projectId: project.id,
        },
      });
      createTask(status, values.title, values.description);
      form.reset();
    }

    return (
      <div
        ref={ref}
        className="space-y-2 rounded-md bg-background-secondary p-3 px-4"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel>Title</FormLabel> */}
                  <FormControl>
                    <Input
                      placeholder="What to do?"
                      className="focus-visible:ring-0"
                      autoFocus
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe about it..."
                    className="h-16"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}
            <Button className="w-full">Add Task</Button>
          </form>
        </Form>
      </div>
    );
  },
);
