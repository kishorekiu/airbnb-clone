import Link from "next/link";
import UserMenu from "./UserMenu";
import { Mountain } from "lucide-react"; // Temporary logo icon
import Search from "./Search";

export default function Navbar() {
  return (
    <header className="fixed w-full bg-white z-50 transition-all duration-300 border-b border-neutral-200">
      <div className="py-4">
        <div className="max-w-630 mx-auto xl:px-20 md:px-10 sm:px-2 px-4">
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            {/* Logo Section */}
            <Link href="/" className="flex items-center gap-2 cursor-pointer">
              <Mountain className="hidden md:block text-rose-500" size={32} />
              <span className="hidden md:block font-bold text-rose-500 text-xl tracking-tight">
                airbnb
              </span>
            </Link>

            {/* The Complex Search State Machine */}
            <Search />

            {/* User Navigation */}
            <UserMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
