import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useState } from "react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import { gql, useMutation } from "@apollo/client";
import { CreateProjectFormSchema } from "@/lib/definitions";
import LoaderButton from "../shared/loader-button";

const CreateProjectDialog = () => {
  const [createProject, { loading }] = useMutation(gql`
    mutation CreateProject($name: String!, $description: String) {
      createProject(name: $name, description: $description) {
        id
        name
        description
        created_at
      }
    }
  `);

  const form = useForm({
    resolver: zodResolver(CreateProjectFormSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  async function handleSubmit(values: z.infer<typeof CreateProjectFormSchema>) {
    // send login request to server
    const response = await createProject({
      variables: {
        name: values.name,
        description: values.description,
      },
    });

    const project = response.data.createProject;

    // if no user is returned, show error message and return
    if (!response.data.createProject) {
      toast.error("Invalid project name or description", {
        description: "Please try again",
      });
      return;
    }

    toast.success("Project created");
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Create Project</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-medium tracking-wide">
            Create a new project
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="ex. Daily notes" {...field} />
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
                  <FormLabel>Description (optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="ex. writing what I did today"
                      className="h-24"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              {loading ? (
                <LoaderButton />
              ) : (
                <Button
                  type="submit"
                  className="flex-1 font-medium"
                  disabled={form.getValues().name === ""}
                >
                  Create
                </Button>
              )}
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProjectDialog;
