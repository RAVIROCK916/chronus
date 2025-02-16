"use client";

import { useState } from "react";
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
import { Button } from "../ui/button";
import { Input } from "../ui/input";

import { Eye, EyeSlash } from "@phosphor-icons/react";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import LoaderButton from "../shared/loader-button";
import { setProfile } from "@/state/features/profile/profileSlice";
import { toast } from "sonner";
import { createSession } from "@/lib/session";
import { useDispatch } from "react-redux";
import { LoginFormSchema } from "@/lib/definitions";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loginUser, { loading }] = useMutation(gql`
    mutation LoginUser($email: String!, $password: String!) {
      loginUser(email: $email, password: $password) {
        id
        name
        email
        password_hash
        created_at
      }
    }
  `);

  const router = useRouter();
  const dispatch = useDispatch();

  const form = useForm({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function handleSubmit(values: z.infer<typeof LoginFormSchema>) {
    // send login request to server
    const response = await loginUser({
      variables: {
        email: values.email,
        password: values.password,
      },
    });

    const user = response.data.loginUser;

    // if no user is returned, show error message and return
    if (!response.data.loginUser) {
      toast.error("Invalid email or password", {
        description: "Please try again",
      });
      return;
    }

    const loggedInUser = response.data.loginUser;

    // set user profile in state and redirect to dashboard
    dispatch(setProfile(loggedInUser));
    toast.success("Login successful");

    await createSession(loggedInUser.id);
    router.push("/dashboard");
  }

  return (
    <div className="flex w-full flex-col items-start gap-y-6 py-8">
      <h2 className="text-2xl font-semibold">Login to your account</h2>
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
                      className="tracking-wider"
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
                        className="absolute right-1 top-2/4 size-7 -translate-y-[52%]"
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

            {loading ? (
              <LoaderButton />
            ) : (
              <Button type="submit" className="w-full">
                Login
              </Button>
            )}
          </form>
        </Form>
      </div>
    </div>
  );
};
export default LoginForm;
