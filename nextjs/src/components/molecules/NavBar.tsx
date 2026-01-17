import React from "react";
import { Avatar } from "../atoms/Avatar";

interface NavBarProps {
  userName: string;
  onLogout: () => void;
}

export const NavBar = ({ userName, onLogout }: NavBarProps) => {
  return (
    <nav className="sticky top-0 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            My Library
          </h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-full">
              <Avatar name={userName} size="sm" />
              <span className="text-sm font-medium">{userName}</span>
            </div>
            <button
              onClick={onLogout}
              className="text-sm text-gray-500 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
