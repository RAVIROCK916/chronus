import { useState } from "react";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { gql, useMutation } from "@apollo/client";

import { Project } from "@/types";
import { createProjectFormSchema } from "@/lib/definitions";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import LoaderButton from "../shared/loader-button";

type CreateProjectDialogProps = {
  projects: Project[];
  handleAddProject: (project: any) => void;
};

const CreateProjectDialog = ({
  projects,
  handleAddProject,
}: CreateProjectDialogProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
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
    resolver: zodResolver(createProjectFormSchema(projects)),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  async function handleSubmit(
    values: z.infer<ReturnType<typeof createProjectFormSchema>>,
  ) {
    setIsDialogOpen(false);
    // send login request to server
    const response = await createProject({
      variables: {
        name: values.name,
        description: values.description,
      },
    });

    const project = response.data.createProject;

    handleAddProject(project);

    // if project is not created properly, show error message and return
    if (!response.data.createProject) {
      toast.error("Invalid project name or description", {
        description: "Please try again",
      });
      return;
    }

    toast.success("Project created");
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button>Create Project</Button>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined}>
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
                    <Input placeholder="ex. Diary" {...field} />
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
                <Button type="submit" className="flex-1 font-medium">
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
