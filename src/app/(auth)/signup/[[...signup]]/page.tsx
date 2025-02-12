import Link from "next/link";
import SignupForm from "@/components/signup-form";
import Logo from "@/components/logo";

export default function SignupPage() {
  return (
    <div className="mx-auto flex h-dvh max-w-sm flex-col items-start pt-4 md:pt-20">
      <div className="flex w-full items-center border-b border-border/80 py-8">
        <Link href="/#home" className="flex items-center gap-x-2">
          <Logo />
          <h1 className="text-lg font-medium">Chronus</h1>
        </Link>
      </div>

      <SignupForm />

      <div className="flex w-full flex-col items-start">
        <p className="text-sm text-muted-foreground">
          By signing up, you agree to our{" "}
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
          Already have an account?{" "}
          <Link href="/login" className="text-primary">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
