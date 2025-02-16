import LoginForm from "@/components/main/login-form";
import Logo from "@/components/shared/logo";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="mx-auto flex h-dvh max-w-sm flex-col items-start pt-4 md:pt-20">
      <div className="flex w-full items-center border-b border-border/80 py-8">
        <Link href="/#home" className="flex items-center gap-x-2">
          <Logo />
          <h1 className="text-lg font-medium">Chronus </h1>
        </Link>
      </div>

      <LoginForm />

      <div className="flex w-full flex-col items-start">
        <p className="text-sm text-muted-foreground">
          By signing in, you agree to our{" "}
          <Link href="/terms" className="text-primary">
            Terms of Service{" "}
          </Link>
          and{" "}
          <Link href="/privacy" className="text-primary">
            Privacy Policy
          </Link>
        </p>
      </div>
      <div className="mt-auto flex w-full items-start border-t border-border/80 py-6">
        <p className="text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-primary">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
