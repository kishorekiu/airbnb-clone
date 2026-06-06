import Link from "next/link";
import Search from "./Search";
import MobileSearch from "./MobileSearch"; // Import the new mobile trigger
import UserMenu from "./UserMenu";
import { Mountain } from "lucide-react";

export default function Navbar() {
  return (
    <header className="fixed w-full bg-white z-40 transition-all duration-300 border-b border-neutral-200">
      <div className="py-4">
        <div className="max-w-630 mx-auto xl:px-20 md:px-10 sm:px-2 px-4">
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            {/* Logo Section */}
            <Link href="/" className="flex items-center gap-2 cursor-pointer">
              <Mountain className="text-rose-500" size={32} />
              <span className="font-bold text-rose-500 text-xl tracking-tight">
                airbnb
              </span>
            </Link>

            {/* DESKTOP SEARCH: Hidden on mobile */}
            <div className="hidden md:block">
              <Search />
            </div>

            {/* MOBILE SEARCH: Hidden on desktop */}
            <div className="block md:hidden w-full">
              <MobileSearch />
            </div>

            {/* User Navigation: Hidden on mobile, handled by BottomNav */}
            <div className="hidden md:block">
              <UserMenu />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
