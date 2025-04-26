import { cn } from "@/lib/utils";

export default function MarginContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("-mx-8 -my-4", className)}>{children}</div>;
}
