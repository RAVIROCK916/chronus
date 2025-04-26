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
  DialogDescription,
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
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import LoaderButton from "@/components/shared/loader-button";
import Logo from "../shared/logo";
import { Box, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import type { EventColor } from "@/components";
import { colorOptions } from "@/constants/colors";

type CreateProjectDialogProps = {
  projects: Project[];
  handleAddProject: (project: any) => void;
};

const CreateProjectDialog = ({
  projects,
  handleAddProject,
}: CreateProjectDialogProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [color, setColor] = useState<EventColor>("sky");

  const [createProject, { loading }] = useMutation(gql`
    mutation CreateProject($name: String!, $description: String) {
      createProject(name: $name, description: $description) {
        id
        name
        summary
        description
        color
        created_at
      }
    }
  `);

  const form = useForm({
    resolver: zodResolver(createProjectFormSchema(projects)),
    defaultValues: {
      name: "",
      summary: "",
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
        <Button variant="outline">
          Project{" "}
          <span>
            <Plus className="!size-3" />
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent
        className="flex h-[90vh] max-w-[1000px] flex-col p-0"
        aria-describedby={undefined}
      >
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="flex items-center gap-1 text-sm font-medium text-text-tertiary">
            <Logo />
            New project
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex h-full flex-col"
          >
            <div className="flex h-full flex-col p-6 pt-0">
              <div className="mb-4">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button variant="outline" size="icon">
                      <Box size="16px" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <fieldset className="space-y-4 p-2">
                      <p className="text-sm font-medium leading-none text-text-muted">
                        Choose a color
                      </p>
                      <RadioGroup
                        className="flex gap-2"
                        defaultValue={colorOptions[0].value}
                        value={color}
                        onValueChange={(value: EventColor) => setColor(value)}
                      >
                        {colorOptions.map((colorOption) => (
                          <RadioGroupItem
                            key={colorOption.value}
                            id={`color-${colorOption.value}`}
                            value={colorOption.value}
                            aria-label={colorOption.label}
                            className={cn(
                              "size-6 shadow-none",
                              colorOption.bgClass,
                              colorOption.borderClass,
                            )}
                          />
                        ))}
                      </RadioGroup>
                    </fieldset>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    {/* <FormLabel>Name</FormLabel> */}
                    <FormControl>
                      <Input
                        placeholder="Project Name"
                        className="border-none px-0 text-2xl font-medium shadow-none focus-visible:ring-0"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="summary"
                render={({ field }) => (
                  <FormItem>
                    {/* <FormLabel>Summary</FormLabel> */}
                    <FormControl>
                      <Input
                        placeholder="Add a short summary..."
                        className="border-none px-0 shadow-none focus-visible:ring-0"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Separator />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    {/* <FormLabel>Description (optional)</FormLabel> */}
                    <FormControl>
                      <Textarea
                        placeholder="Write a description, if you want to..."
                        className="max-h-96 min-h-48 border-none px-0 shadow-none focus-visible:ring-0"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="border-t p-4">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              {loading ? (
                <LoaderButton />
              ) : (
                <Button type="submit">Create</Button>
              )}
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProjectDialog;
