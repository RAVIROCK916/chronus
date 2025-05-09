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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useProjectPageContext } from "@/state/context";
import { colorOptions } from "@/constants/colors";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

export default function ProjectSettings() {
  const id = useId();
  const { project } = useProjectPageContext();

  const ProjectSettingsSchema = z.object({
    name: z.string().min(1, "Name is required"),
    summary: z
      .string()
      .min(1, "Summary is required")
      .max(200, "Summary is too long"),
    description: z
      .string()
      .min(1, "Description is required")
      .max(1000, "Description is too long"),
    color: z.string(),
  });

  const form = useForm({
    resolver: zodResolver(ProjectSettingsSchema),
    defaultValues: {
      name: project.name,
      summary: project.summary,
      description: project.description,
      color: project.color,
    },
  });

  console.log(form.watch("color"));

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
        className="mx-auto my-8 max-w-md space-y-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="overflow-y-auto px-4">
          <div className="flex flex-col items-center gap-4">
            <div className="space-y-1">
              <Avatar className="size-16">
                <AvatarImage src={project.picture} />
                <AvatarFallback>CN</AvatarFallback>
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
              name="summary"
              render={({ field }) => (
                <FormItem className="w-full space-y-1">
                  <FormLabel htmlFor={`${id}-summary`}>
                    Summary <span>*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      id={`${id}-summary`}
                      placeholder="Project summary"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="color"
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-full space-y-1">
                  <FormLabel htmlFor={`${id}-color`}>Color</FormLabel>
                  <FormControl>
                    <RadioGroup
                      className="flex flex-wrap gap-1.5"
                      defaultValue={field.value}
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      {colorOptions.map((colorOption) => (
                        <RadioGroupItem
                          value={colorOption.value}
                          id={`${id}-color-${colorOption}`}
                          className={cn(
                            "size-6 shadow-none",
                            colorOption.bgClass,
                            colorOption.borderClass,
                          )}
                        ></RadioGroupItem>
                      ))}
                    </RadioGroup>
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
                      className="max-h-96 min-h-64"
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
        <div className="flex justify-end">
          <Button>Save</Button>
        </div>
      </form>
    </Form>
  );
}
