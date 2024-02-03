"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Toggle from "./Toggle";
import Image from "next/image";
import moonDarkIcon from "../../assets/images/icon-moon-dark.svg";
import moonLightIcon from "../../assets/images/icon-moon-light.svg";
import sunDarkIcon from "../../assets/images/icon-sun-dark.svg";
import sunLightIcon from "../../assets/images/icon-sun-light.svg";

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
    <div className="flex justify-center gap-4">
      {theme === "dark" ? (
        <Image src={sunLightIcon} width={20} height={20} alt="sun-dark" />
      ) : (
        <Image src={sunDarkIcon} width={20} height={20} alt="sun-light" />
      )}
      <Toggle
        value={theme === "dark"}
        onChange={() => setTheme(theme === "light" ? "dark" : "light")}
      />
      {theme === "dark" ? (
        <Image src={moonLightIcon} width={20} height={20} alt="moon-dark" />
      ) : (
        <Image src={moonDarkIcon} width={20} height={20} alt="moon-light" />
      )}
    </div>
  );
};

export default ThemeSwitcher;
