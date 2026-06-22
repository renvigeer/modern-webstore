"use client";

import { useState } from "react";
import { Moon, Sun } from "lucide-react";

function getInitialDark(): boolean {
  if (typeof document === "undefined") return false;
  return document.documentElement.classList.contains("dark");
}

export default function ThemeToggle() {
  const [dark, setDark] = useState(getInitialDark);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
  };

  return (
    <button
      onClick={toggle}
      className="relative p-2.5 hover:bg-primary-light rounded-xl transition-all group"
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {dark ? (
        <Sun size={18} className="text-slate-600 group-hover:text-primary transition-colors" />
      ) : (
        <Moon size={18} className="text-slate-600 group-hover:text-primary transition-colors" />
      )}
    </button>
  );
}
