import React from "react";
import { CustomersList } from "../organisms/CustomersList";
import { Customer } from "@/types";

interface LoginTemplateProps {
  users: Customer[];
  isLoading: boolean;
  error: unknown;
  onSelectUser: (id: string) => void;
}

export const LoginTemplate = ({
  users,
  isLoading,
  error,
  onSelectUser,
}: LoginTemplateProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-700 to-gray-900 text-white p-8 font-[family-name:var(--font-geist-sans)] flex flex-col items-center justify-center">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            Library Login
          </h1>
          <p className="mt-2 text-gray-400">Select a user to continue</p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 shadow-xl">
          {isLoading && (
            <div className="flex justify-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          )}
          {!!error && (
            <p className="text-red-400 text-center">Failed to load users.</p>
          )}
          {users && <CustomersList users={users} onSelectUser={onSelectUser} />}
        </div>
      </div>
    </div>
  );
};
