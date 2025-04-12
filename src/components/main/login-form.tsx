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
import { Label } from "../ui/label";

import { Eye, EyeSlash } from "@phosphor-icons/react";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import LoaderButton from "../shared/loader-button";
import { setProfile } from "@/state/features/profile/profileSlice";
import { toast } from "sonner";
import { createSession } from "@/lib/session";
import { useDispatch } from "react-redux";
import { LoginFormSchema } from "@/lib/definitions";
import Link from "next/link";
import { getGoogleOAuthUrl } from "@/utils/google-oauth";

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
    try {
      // send login request to server
      const response = await loginUser({
        variables: {
          email: values.email,
          password: values.password,
        },
      });

      const loggedInUser = response.data.loginUser;

      // if no user is returned, show error message and return
      if (!loggedInUser) {
        toast.error("Invalid email or password", {
          description: "Please try again",
        });
        return;
      }

      const url = new URL(window.location.href);
      const redirect_url = url.searchParams.get("from");

      // set user profile in state and redirect to dashboard
      dispatch(setProfile(loggedInUser));
      toast.success("Login successful");

      await createSession(loggedInUser.id);
      router.push(redirect_url || "/dashboard");
    } catch (error: any) {
      console.error("Login error:", error);
      toast.error(error.message, {
        description: "Please try again later",
      });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col gap-6"
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Login to your account</h1>
          <p className="text-balance text-sm text-muted-foreground">
            Enter your email below to login to your account
          </p>
        </div>
        <div className="grid gap-6">
          <div className="grid gap-4">
            <div className="grid gap-2">
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
            </div>
            <div className="grid gap-2">
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
            </div>
          </div>
          {loading ? (
            <LoaderButton />
          ) : (
            <Button type="submit" className="w-full">
              Login
            </Button>
          )}
          <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
            <span className="relative z-10 bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
          <Link href={getGoogleOAuthUrl()} className="w-full">
            <Button variant="outline" className="w-full">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path
                  d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                  fill="currentColor"
                />
              </svg>
              Login with Google
            </Button>
          </Link>
        </div>
        <div className="text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="underline underline-offset-4">
            Sign up
          </Link>
        </div>
      </form>
    </Form>
  );
};
export default LoginForm;
