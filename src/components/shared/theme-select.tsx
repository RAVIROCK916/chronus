"use client";

import { useId } from "react";
import { CheckIcon, MinusIcon } from "lucide-react";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useTheme } from "next-themes";
import Image from "next/image";

const items = [
  { value: "light", label: "Light", image: "/ui-light.png" },
  { value: "dark", label: "Dark", image: "/ui-dark.png" },
  { value: "system", label: "System", image: "/ui-system.png" },
];

export default function ThemeSelect() {
  const id = useId();
  const { theme, setTheme } = useTheme();
  console.log("theme", theme);
  return (
    <fieldset className="space-y-4">
      <legend className="font-medium leading-none text-foreground">
        Choose a theme
      </legend>
      <RadioGroup
        className="flex gap-6"
        defaultValue="1"
        value={theme}
        onValueChange={(value) => {
          setTheme(value);
          console.log("value", value);
        }}
      >
        {items.map((item) => (
          <label key={`${id}-${item.value}`}>
            <RadioGroupItem
              id={`${id}-${item.value}`}
              value={item.value}
              className="peer sr-only after:absolute after:inset-0"
            />
            <Image
              src={item.image}
              alt={item.label}
              width={120}
              height={100}
              className="shadow-xs peer-data-disabled:cursor-not-allowed peer-data-disabled:opacity-50 relative h-48 w-64 cursor-pointer overflow-hidden rounded-md border-[3px] border-input outline-none transition-[color,border,box-shadow] peer-focus-visible:ring-[3px] peer-focus-visible:ring-ring/50 peer-data-[state=checked]:border-ring peer-data-[state=checked]:bg-accent"
            />
            <span className="group mt-2 flex items-center gap-1 peer-data-[state=unchecked]:text-muted-foreground/70">
              <CheckIcon
                size={16}
                className="group-peer-data-[state=unchecked]:hidden"
                aria-hidden="true"
              />
              <MinusIcon
                size={16}
                className="group-peer-data-[state=checked]:hidden"
                aria-hidden="true"
              />
              <span className="text-sm font-medium">{item.label}</span>
            </span>
          </label>
        ))}
      </RadioGroup>
    </fieldset>
  );
}
