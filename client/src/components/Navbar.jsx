import React from "react";
import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";

function Navbar() {
  const UserName = "Abraham Jeron";
  const UserEmail = "abrahamjeron40@gmail.com";

  return (
    <nav className="flex w-full min-w-full items-center justify-between bg-black px-8 py-2.5 text-white">
      {/* logo */}
      <Link to="/" className="flex items-center justify-center space-x-2">
        <img src={logo} alt="Logo" className="max-w-8" />
        <p className="text-2xl font-bold">Flern</p>
      </Link>

      {/* navigation name */}
      <div className="flex items-center">
        <Link to="/" className="font-medium">
          Dashboard
        </Link>
      </div>

      {/* user profile info */}
      <div className="flex cursor-pointer items-center space-x-2 rounded-lg p-2 hover:bg-neutral-800">
        <img
          src="https://api.dicebear.com/9.x/initials/svg?seed=Abraham"
          className="h-8 w-8 rounded-full"
          alt="Profile"
        />
        <div className="flex flex-col items-start justify-center gap-1">
          <p className="text-base font-medium leading-4">{UserName}</p>
          <p className="text-xs font-normal leading-3 text-gray-200">
            {UserEmail}
          </p>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
