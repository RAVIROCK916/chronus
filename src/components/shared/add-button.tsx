import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";

export default function AddButton({ className }: { className?: string }) {
  return (
    <Button variant="outline" className={cn("max-sm:p-0", className)}>
      <Plus
        className="opacity-60 sm:-ms-1 sm:me-2"
        size={16}
        strokeWidth={2}
        aria-hidden="true"
      />
      <span className="max-sm:sr-only">Add new</span>
    </Button>
  );
}
