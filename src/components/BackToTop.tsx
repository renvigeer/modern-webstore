"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggle = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", toggle);
    return () => window.removeEventListener("scroll", toggle);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-40 w-12 h-12 bg-gradient-to-r from-primary to-orange-600 text-white rounded-full shadow-2xl hover:shadow-primary/30 hover:scale-110 transition-all duration-300 flex items-center justify-center animate-fadeIn"
      aria-label="Back to top"
    >
      <ArrowUp size={22} />
    </button>
  );
}
