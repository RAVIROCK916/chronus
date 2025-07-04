import { buttonVariants } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import {
  ArrowRightIcon,
  CalendarIcon,
  Link2Icon,
  SearchIcon,
  WaypointsIcon,
} from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Integrations } from "@/components/main/integrations";
import { Label } from "@/components/ui/label";

export const CARDS = [
  {
    Icon: Link2Icon,
    name: "Organize Tasks",
    description: "Create, track, and organize all your tasks in one place.",
    href: "#",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-1 bg-background",
    background: (
      <Card className="absolute left-10 top-10 origin-top rounded-none rounded-tl-md border border-r-0 border-border transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_0%,#000_100%)] group-hover:scale-105">
        <CardHeader>
          <CardTitle>Create a Task</CardTitle>
          <CardDescription>Add a new task to your list.</CardDescription>
        </CardHeader>
        <CardContent className="-mt-4">
          <Label>Title</Label>
          <Input
            type="text"
            placeholder="Enter a title..."
            className="w-full focus-visible:ring-0 focus-visible:ring-transparent"
          />
        </CardContent>
      </Card>
    ),
  },
  {
    Icon: SearchIcon,
    name: "Search your tasks",
    description: "Quickly find the tasks you need with AI-powered search.",
    href: "#",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-2 bg-background",
    background: (
      <Command className="origin-to absolute right-10 top-10 w-[70%] translate-x-0 border border-border p-2 transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] group-hover:-translate-x-10">
        <Input placeholder="Type to search..." />
        <div className="mt-1 cursor-pointer">
          <div className="rounded-md px-4 py-2 hover:bg-muted">Do laundry</div>
          <div className="rounded-md px-4 py-2 hover:bg-muted">
            Exercise for 30 minutes
          </div>
          <div className="rounded-md px-4 py-2 hover:bg-muted">
            Buy groceries
          </div>
          <div className="rounded-md px-4 py-2 hover:bg-muted">
            Schedule a meeting with John
          </div>
        </div>
      </Command>
    ),
  },
  {
    Icon: WaypointsIcon,
    name: "Connect your apps",
    description: "Integrate with your favorite apps and services.",
    href: "#",
    cta: "Learn more",
    className:
      "col-span-3 lg:col-span-2 max-w-full overflow-hidden bg-background",
    background: (
      <Integrations className="absolute right-2 top-4 h-[300px] w-[600px] border-none pl-28 transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105 md:pl-0" />
    ),
  },
  {
    Icon: CalendarIcon,
    name: "Calendar",
    description: "Keep track of your tasks with our calendar view.",
    className: "col-span-3 lg:col-span-1 bg-background",
    href: "#",
    cta: "Learn more",
    background: (
      <Calendar
        mode="single"
        selected={new Date(2022, 4, 11, 0, 0, 0)}
        className="absolute right-0 top-10 origin-top rounded-md border border-border transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] group-hover:scale-105"
      />
    ),
  },
];

const BentoGrid = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[22rem] grid-cols-3 gap-4",
        className,
      )}
    >
      {children}
    </div>
  );
};

const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
}: {
  name: string;
  className: string;
  background: ReactNode;
  Icon: any;
  description: string;
  href: string;
  cta: string;
}) => (
  <div
    key={name}
    className={cn(
      "group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-xl border border-border/60",
      "bg-black [box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
      className,
    )}
  >
    <div>{background}</div>
    <div className="pointer-events-none z-10 flex flex-col gap-1 p-6 transition-all duration-300 group-hover:-translate-y-10">
      <Icon className="h-12 w-12 origin-left text-neutral-700 transition-all duration-300 ease-in-out group-hover:scale-75" />
      <h3 className="text-xl font-semibold text-neutral-300">{name}</h3>
      <p className="max-w-lg text-neutral-400">{description}</p>
    </div>

    <div
      className={cn(
        "absolute bottom-0 flex w-full translate-y-10 flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100",
      )}
    >
      <Link
        href={href}
        className={buttonVariants({
          size: "sm",
          variant: "ghost",
          className: "cursor-pointer",
        })}
      >
        {cta}
        <ArrowRightIcon className="ml-2 h-4 w-4" />
      </Link>
    </div>
    <div className="pointer-events-none absolute inset-0 transition-all duration-300 group-hover:bg-black/[.03] group-hover:dark:bg-neutral-800/10" />
  </div>
);

export { BentoCard, BentoGrid };
