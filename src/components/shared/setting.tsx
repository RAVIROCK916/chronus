import React, { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

function Root({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="grid grid-cols-2 gap-8 py-6">{children}</div>
      <Separator />
    </div>
  );
}

function Header({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col gap-1">{children}</div>;
}

function Title({ children }: { children: React.ReactNode }) {
  return <div className="font-semibold">{children}</div>;
}

function Description({ children }: { children: React.ReactNode }) {
  return <div className="text-sm text-muted-foreground">{children}</div>;
}

function Content({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div {...props}>{children}</div>;
}

function SettingInput({
  name,
  label,
  initialValue,
  formSchema,
  onSave,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label: string;
  initialValue: string;
  formSchema: z.ZodType<Record<string, string>>;
  onSave: (value: string) => Promise<void>;
}) {
  // const [value, setValue] = useState(initialValue);
  const [originalValue, setOriginalValue] = useState(initialValue);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  // console.log(value);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      [name]: initialValue,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    if (values[name] !== originalValue) {
      try {
        setSaving(true);

        await onSave(values[name]);

        setSaved(true);
        setTimeout(() => {
          setSaved(false);
        }, 2000);
      } catch (error) {
        console.error("Error updating value:", error);
      } finally {
        setSaving(false);
      }
    }
  }

  // Update local value if initialValue changes from parent
  useEffect(() => {
    setOriginalValue(initialValue);
  }, [initialValue]);

  return (
    <div className="space-y-1">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{label}</FormLabel>
                <div className="flex items-center gap-4">
                  <FormControl>
                    <Input
                      {...field}
                      className="w-full min-w-96"
                      onBlur={form.handleSubmit(onSubmit)}
                    />
                  </FormControl>
                  <div className="text-sm text-muted-foreground">
                    {saving && "Saving..."}
                    {saved && "Saved"}
                  </div>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
      {/* <div className="flex items-center gap-2">
        <Input
          id={props.id}
          className="w-full min-w-96"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={handleBlur}
          {...props}
        />
        <div className="text-sm text-muted-foreground">
          {saving && "Saving..."}
          {saved && "Saved"}
        </div>
      </div> */}
    </div>
  );
}

const Setting = {
  Root,
  Header,
  Title,
  Description,
  Content,
  Input: SettingInput,
};

export default Setting;
