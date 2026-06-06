"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { Menu, UserCircle2, Globe } from "lucide-react";
import Link from "next/link";

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={menuRef} className="relative">
      <div className="flex flex-row items-center gap-3">
        <div className="hidden lg:block text-sm font-medium py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer">
          Airbnb your home
        </div>
        <div className="hidden md:block p-3 rounded-full hover:bg-neutral-100 transition cursor-pointer">
          <Globe size={18} />
        </div>

        <div
          onClick={toggleOpen}
          className="p-4 md:py-1 md:px-2 border border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
        >
          <Menu size={18} />
          <UserCircle2 size={30} className="text-neutral-500 hidden md:block" />
        </div>
      </div>

      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-[25vw] lg:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            <Link
              href="/auth/login"
              className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
            >
              Sign up
            </Link>
            <Link
              href="/auth/login"
              className="px-4 py-3 hover:bg-neutral-100 transition"
            >
              Log in
            </Link>
            <div className="w-full border-t border-neutral-200" />
            <div className="px-4 py-3 hover:bg-neutral-100 transition">
              Airbnb your home
            </div>
            <div className="px-4 py-3 hover:bg-neutral-100 transition">
              Host an experience
            </div>
            <div className="px-4 py-3 hover:bg-neutral-100 transition">
              Help Center
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
