import React from "react";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import UserMenu from "./UserMenu";

const NavBar = () => {
  return (
    <header className="sticky top-0 z-10 w-full bg-white border-b border-neutral-200">
      <div className="max-w-630 mx-auto xl:p-14 md:px-10 sm:px-2 px-4 h-14 flex items-center justify-between gap-3 md:gap-0">
        <Logo />
        <SearchBar />
        <UserMenu />
      </div>
    </header>
  );
};

export default NavBar;
