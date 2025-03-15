"use server";

import { redirect } from "next/navigation";
import { verifyAuth } from "@/lib/auth";

export async function AuthGuard({ children }: { children: React.ReactNode }) {
  const session = await verifyAuth();

  if (!session) {
    redirect("/login");
  }

  return <>{children}</>;
}
