import React from "react";
import { Avatar } from "../atoms/Avatar";

interface UserListItemProps {
  name: string;
  email: string;
  onClick: () => void;
}

export const UserListItem = ({ name, email, onClick }: UserListItemProps) => {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between p-4 rounded-xl bg-gray-600/50 hover:bg-blue-600/20 hover:border-blue-500/50 border border-transparent transition-all duration-200 group"
    >
      <div className="flex items-center space-x-4">
        <Avatar name={name} />
        <div className="text-left">
          <p className="font-semibold text-gray-100 group-hover:text-blue-300 transition-colors">
            {name}
          </p>
          <p className="text-xs text-gray-500">{email}</p>
        </div>
      </div>
      <div className="text-gray-500 group-hover:translate-x-1 transition-transform">
        →
      </div>
    </button>
  );
};
