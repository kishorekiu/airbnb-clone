"use client";

import { useState, useEffect } from "react";
import { Search, Heart, UserCircle2 } from "lucide-react";
import Link from "next/link";

export default function BottomNav() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // If scrolling down, hide it. If scrolling up, show it.
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div
      className={`fixed bottom-0 w-full bg-white border-t border-neutral-200 z-40 transition-transform duration-300 md:hidden ${
        isVisible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="flex flex-row justify-around items-center py-3 pb-safe">
        <Link
          href="/"
          className="flex flex-col items-center gap-1 text-rose-500"
        >
          <Search size={24} />
          <span className="text-[10px] font-medium">Explore</span>
        </Link>
        <Link
          href="/favorites"
          className="flex flex-col items-center gap-1 text-neutral-500 hover:text-neutral-800"
        >
          <Heart size={24} />
          <span className="text-[10px] font-medium">Wishlists</span>
        </Link>
        <Link
          href="/auth/login"
          className="flex flex-col items-center gap-1 text-neutral-500 hover:text-neutral-800"
        >
          <UserCircle2 size={24} />
          <span className="text-[10px] font-medium">Log in</span>
        </Link>
      </div>
    </div>
  );
}
