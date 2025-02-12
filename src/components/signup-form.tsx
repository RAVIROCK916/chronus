"use client";

import { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

import { Eye, EyeSlash } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import LoaderButton from "./loader-button";

const formSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(4, "Password must be at least 8 characters"),
    confirmPassword: z
      .string()
      .min(4, "Password must be at least 8 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const SignupForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [createUser, { data, loading, error }] = useMutation(gql`
    mutation user($email: String!, $password: String!) {
      createUser(email: $email, password: $password) {
        id
        name
        email
      }
    }
  `);

  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function handleSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    createUser({
      variables: {
        email: values.email,
        password: values.password,
      },
    })
      .then((res) => {
        router.push("/onboarding");
      })
      .catch((err) => console.log(err));
    // console.log(res);
  }

  return (
    <div className="flex w-full flex-col items-start gap-y-6 py-8">
      <h2 className="text-2xl font-semibold">Create an account</h2>
      <div className="w-full space-y-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="johndoe@example.com"
                      className="tracking-wider placeholder:font-light"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="********"
                        className="tracking-wider"
                        {...field}
                      />
                      <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        className="absolute right-0 top-2/4 -translate-y-[52%] text-muted-foreground/80 hover:bg-transparent hover:text-foreground"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeSlash size={16} />
                        ) : (
                          <Eye size={16} />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="********"
                      className="tracking-wider"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {loading ? (
              <LoaderButton />
            ) : (
              <Button type="submit" className="w-full">
                Sign up
              </Button>
            )}
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SignupForm;
