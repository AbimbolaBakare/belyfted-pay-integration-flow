"use client";

import { useTheme } from "@/components/providers/theme-provider";
import { MoonIcon, SunIcon } from "@/components/icons";

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-4 p-3 rounded-lg bg-white dark:bg-neutral-800 border border-neutral-400 dark:border-neutral-700 shadow-md hover:shadow-lg transition-all z-50 cursor-pointer"
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <MoonIcon className="w-5 h-5 text-neutral-800" />
      ) : (
        <SunIcon className="w-5 h-5 text-neutral-50" />
      )}
    </button>
  );
};
