import React, { useRef, useState } from "react";

import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

function Root({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="grid grid-cols-2 gap-8 py-4">{children}</div>
      <Separator />
    </div>
  );
}

function Header({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col gap-1">{children}</div>;
}

function Title({ children }: { children: React.ReactNode }) {
  return <div className="font-semibold">{children}</div>;
}

function Description({ children }: { children: React.ReactNode }) {
  return <div className="text-sm text-muted-foreground">{children}</div>;
}

function Content({ children }: { children: React.ReactNode }) {
  return <div className="">{children}</div>;
}

function SettingInput({
  children,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  const [value, setValue] = useState(props.value);
  const inputRef = useRef<string>(props.value as string);
  console.log(value);
  return (
    <Input
      {...props}
      className="w-full"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}

const Setting = {
  Root,
  Header,
  Title,
  Description,
  Content,
  Input: SettingInput,
};

export default Setting;
