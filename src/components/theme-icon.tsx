"use client";

import Icon from "./Icon";
import { useTheme } from "next-themes";
import { Moon, Sun } from "@phosphor-icons/react/dist/ssr";
import { Button } from "./ui/button";

const ThemeIcon = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      size="icon"
      onClick={() => {
        setTheme(theme === "dark" ? "light" : "dark");
      }}
    >
      <Sun className="dark:hidden" />
      <Moon className="hidden dark:block" />
    </Button>
  );
};
export default ThemeIcon;
