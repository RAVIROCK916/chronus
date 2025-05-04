import { cn } from "@/lib/utils";

export default function MarginContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("-m-4", className)}>{children}</div>;
}
