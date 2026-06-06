"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { Menu, UserCircle2, Globe } from "lucide-react";
import Link from "next/link";
import { handleSignOut } from "@/app/actions/auth";
import toast from "react-hot-toast";

interface UserMenuProps {
  currentUser?: any; // We will strictly type this with Prisma/Mongoose later
}

export default function UserMenu({ currentUser }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const onLogout = async () => {
    setIsOpen(false);
    await handleSignOut();
    toast.success("Logged out successfully");
  };

  return (
    <div ref={menuRef} className="relative">
      <div className="flex flex-row items-center gap-3">
        {/* ... keep the global/airbnb buttons the same ... */}

        <div
          onClick={toggleOpen}
          className="p-4 md:py-1 md:px-2 border border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
        >
          <Menu size={18} />
          <div className="hidden md:block">
            {/* Show user profile image if they logged in with Google/GitHub, otherwise fallback icon */}
            {currentUser?.image ? (
              <img
                src={currentUser.image}
                alt="Profile"
                className="w-7.5 h-7.5 rounded-full object-cover"
              />
            ) : (
              <UserCircle2 size={30} className="text-neutral-500" />
            )}
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-60 bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <Link
                  href="/trips"
                  className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                >
                  My trips
                </Link>
                <Link
                  href="/favorites"
                  className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                >
                  My favorites
                </Link>
                <Link
                  href="/reservations"
                  className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                >
                  My reservations
                </Link>
                <Link
                  href="/properties"
                  className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                >
                  My properties
                </Link>
                <div className="w-full border-t border-neutral-200" />
                <div
                  onClick={onLogout}
                  className="px-4 py-3 hover:bg-neutral-100 transition text-rose-500"
                >
                  Log out
                </div>
              </>
            ) : (
              <>
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
                  Help Center
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
