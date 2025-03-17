"use client";

import * as React from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "../ui/label";
import DatePicker from "../shared/date-picker";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import TimeField from "../shared/time-field";

const formSchema = z.object({
  title: z.string().min(2).max(50),
  startDate: z.string().min(1),
  startTime: z.string().min(1),
  endDate: z.string().min(1),
  endTime: z.string().min(1),
});

type CreateEventModalProps = {
  isCreateEventModalOpen: boolean;
  setIsCreateEventModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function CreateEventModal({
  isCreateEventModalOpen,
  setIsCreateEventModalOpen,
}: CreateEventModalProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      startDate: "",
      startTime: "",
      endDate: "",
      endTime: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Dialog
      open={isCreateEventModalOpen}
      onOpenChange={setIsCreateEventModalOpen}
    >
      <DialogContent className="flex flex-col gap-0 p-0 sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="border-b border-border px-6 py-4 text-lg">
            Create a new event
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-6 overflow-y-auto p-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Drinks with friends..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-4 *:flex-1">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <DatePicker />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="startTime">Start Time</Label>
                  <TimeField />
                </div>
              </div>
              <div className="flex gap-4 *:flex-1">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <DatePicker />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="endTime">End Time</Label>
                  <TimeField />
                </div>
              </div>
            </div>
            <div className="flex gap-2 border-t border-border px-6 py-4">
              <Button type="submit" className="w-full">
                Start
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
