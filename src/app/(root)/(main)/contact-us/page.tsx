"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useId } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MailIcon } from "lucide-react";

const contactUsFormSchema = z.object({
  name: z.string().min(3, "Name should be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(1, "Message is required"),
});

export default function ContactUsPage() {
  const id = useId();
  const form = useForm({
    resolver: zodResolver(contactUsFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = (values: z.infer<typeof contactUsFormSchema>) => {
    console.log(values);
  };

  return (
    <div>
      <div className="flex h-screen justify-center p-10">
        <div className="flex flex-col items-center gap-y-6">
          <div className="flex flex-col items-center space-y-2">
            <h1 className="text-4xl font-semibold">Contact Us</h1>
            <p className="text-[14px] text-muted">
              If you have any questions or need assistance, please reach out to
              us. We&apos;re here to help!
            </p>
          </div>
          <Form {...form}>
            <form
              className="w-96 space-y-6"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor={`${id}-name`}>
                            Name <span>*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              id={`${id}-name`}
                              placeholder="Your name"
                              type="text"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </FormItem>
                )}
              />
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor={`${id}-email`}>
                            Email <span>*</span>
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                id={`${id}-email`}
                                placeholder="Your email"
                                {...field}
                              />
                              <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-muted-foreground/80 peer-disabled:opacity-50">
                                <MailIcon size={16} aria-hidden="true" />
                              </div>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </FormItem>
                )}
              />
              <FormField
                name="message"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor={`${id}-message`}>
                            Message <span>*</span>
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              id={`${id}-message`}
                              placeholder="Your message"
                              className="h-48"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </FormItem>
                )}
              />
              <Button type="submit" className="mx-auto block">
                Submit
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
