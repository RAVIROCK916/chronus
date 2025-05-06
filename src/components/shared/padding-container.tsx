import { cn } from "@/lib/utils";

export function HorizontalPaddingContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("px-8", className)}>{children}</div>;
}

export function VerticalPaddingContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("py-8", className)}>{children}</div>;
}

export default function PaddingContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("px-8 py-4", className)}>{children}</div>;
}
