"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Toggle from "./Toggle";

const ThemeSwitcher = (): JSX.Element | null => {
  const [mounted, setMounted] = useState<boolean>(false);
  const { theme, setTheme } = useTheme();
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Toggle
      value={theme === "light"}
      onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
    />
  );
};

export default ThemeSwitcher;
