"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Toggle from "./Toggle";
import Image from "next/image";

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
    <div className="flex gap-4">
      {theme === "dark" ? (
        <Image
          src="/images/icon-sun-light.svg"
          width={20}
          height={20}
          alt="sun-dark"
        />
      ) : (
        <Image
          src="/images/icon-sun-dark.svg"
          width={20}
          height={20}
          alt="sun-light"
        />
      )}
      <Toggle
        value={theme === "dark"}
        onChange={() => setTheme(theme === "light" ? "dark" : "light")}
      />
      {theme === "dark" ? (
        <Image
          src="/images/icon-moon-light.svg"
          width={20}
          height={20}
          alt="moon-dark"
        />
      ) : (
        <Image src="/images/icon-moon-dark.svg" width={20} height={20} alt="moon-light" />
      )}
    </div>
  );
};

export default ThemeSwitcher;
