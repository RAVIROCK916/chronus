import { EventColor } from "@/components";

export const TODO_COLOR = "amber-400";
export const IN_PROGRESS_COLOR = "sky-400";
export const DONE_COLOR = "emerald-400";

export const colorOptions: Array<{
  value: EventColor;
  label: string;
  textClass: string;
  bgClass: string;
  borderClass: string;
}> = [
  {
    value: "sky",
    label: "Sky",
    textClass: "text-sky-400",
    bgClass: "bg-sky-400 data-[state=checked]:bg-sky-400",
    borderClass: "border-sky-400 data-[state=checked]:border-sky-400",
  },
  {
    value: "amber",
    label: "Amber",
    textClass: "text-amber-400",
    bgClass: "bg-amber-400 data-[state=checked]:bg-amber-400",
    borderClass: "border-amber-400 data-[state=checked]:border-amber-400",
  },
  {
    value: "violet",
    label: "Violet",
    textClass: "text-violet-400",
    bgClass: "bg-violet-400 data-[state=checked]:bg-violet-400",
    borderClass: "border-violet-400 data-[state=checked]:border-violet-400",
  },
  {
    value: "rose",
    label: "Rose",
    textClass: "text-rose-400",
    bgClass: "bg-rose-400 data-[state=checked]:bg-rose-400",
    borderClass: "border-rose-400 data-[state=checked]:border-rose-400",
  },
  {
    value: "emerald",
    label: "Emerald",
    textClass: "text-emerald-400",
    bgClass: "bg-emerald-400 data-[state=checked]:bg-emerald-400",
    borderClass: "border-emerald-400 data-[state=checked]:border-emerald-400",
  },
  {
    value: "orange",
    label: "Orange",
    textClass: "text-orange-400",
    bgClass: "bg-orange-400 data-[state=checked]:bg-orange-400",
    borderClass: "border-orange-400 data-[state=checked]:border-orange-400",
  },
];
