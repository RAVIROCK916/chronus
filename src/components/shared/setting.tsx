import React, { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
      <SettingsPaddingContainer>
        <div className="grid grid-cols-[40%_60%] gap-8">{children}</div>
      </SettingsPaddingContainer>
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
              <FormItem className="space-y-1">
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
    </div>
  );
}

type SettingSelectProps = {
  label: string;
  options: string[];
  initialValue: string;
  onSave?: (newValue: string) => Promise<void>;
};

function SettingSelect({
  label,
  options,
  initialValue,
  onSave,
}: SettingSelectProps) {
  const [value, setValue] = useState(initialValue);
  const [originalValue, setOriginalValue] = useState(initialValue);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setValue(initialValue);
    setOriginalValue(initialValue);
  }, [initialValue]);

  const handleBlur = async () => {
    if (value !== originalValue) {
      try {
        setSaving(true);
        // await onSave(value);
        setOriginalValue(value);
        setSaved(true);
        setTimeout(() => setSaved(false), 1500);
      } finally {
        setSaving(false);
      }
    }
  };

  return (
    <div className="flex flex-col space-y-1">
      <Label className="text-sm font-medium">{label}</Label>
      <Select
        value={value}
        onValueChange={setValue}
        // onBlur={handleBlur}
      >
        <SelectTrigger className="w-96">
          <SelectValue placeholder={label}>{value}</SelectValue>
        </SelectTrigger>
        <SelectContent className="flex gap-4">
          <SelectGroup>
            {options.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectGroup>
          <div className="h-4 text-xs text-muted-foreground">
            {saving && "Saving..."}
            {saved && "Saved!"}
          </div>
        </SelectContent>
      </Select>
    </div>
  );
}

function SettingsPaddingContainer({ children }: { children: React.ReactNode }) {
  return <div className="px-10 py-6">{children}</div>;
}

const Setting = {
  Root,
  Header,
  Title,
  Description,
  Content,
  Input: SettingInput,
  Select: SettingSelect,
};

export default Setting;
