import { useProjectContext } from "@/components/main/kanban-board";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { useCharacterLimit } from "@/hooks/use-character-limit";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useId } from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

export default function ProjectSettings() {
  const id = useId();
  const { project } = useProjectContext();

  const ProjectSettingsSchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().min(1, "Description is required"),
  });

  const form = useForm({
    resolver: zodResolver(ProjectSettingsSchema),
    defaultValues: {
      name: project.name,
      description: project.description,
    },
  });

  // const { limit, remaining, overLimit } = useCharacterLimit(
  // 	form.watch("description"),
  // 	1000
  // );

  const onSubmit = (values: z.infer<typeof ProjectSettingsSchema>) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form
        className="mx-auto my-8 max-w-96 space-y-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="overflow-y-auto">
          <div className="flex flex-col items-center gap-4">
            <div className="space-y-1">
              <Avatar className="size-16">
                <AvatarImage src={project.picture} />
              </Avatar>
            </div>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full space-y-1">
                  <FormLabel htmlFor={`${id}-name`}>
                    Name <span>*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      id={`${id}-name`}
                      placeholder="Project name"
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
                <FormItem className="w-full space-y-1">
                  <FormLabel htmlFor={`${id}-description`}>
                    Description{" "}
                    <span className="text-xs text-text-muted">(optional)</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      id={`${id}-description`}
                      placeholder="Project description"
                      className="h-32"
                      // maxLength={maxLength}
                      value={field.value}
                      // onChange={(event) => {
                      // 	field.onChange(event);
                      // 	handleChange(event);
                      // }}
                      aria-describedby={`${id}-description`}
                    />
                  </FormControl>
                  {/* <p
										id={`${id}-description`}
										className="mt-2 text-right text-xs text-muted-foreground"
										role="status"
										aria-live="polite"
									>
										<span className="tabular-nums">
											{limit - characterCount}
										</span>{" "}
										characters left
									</p> */}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div>
          <Button variant="outline">Save</Button>
        </div>
      </form>
    </Form>
  );
}
