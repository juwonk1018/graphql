import React from "react";

interface StatusMessageProps {
  type: "loading" | "error";
  children: React.ReactNode;
}

export const StatusMessage = ({ type, children }: StatusMessageProps) => {
  const colorClass = type === "loading" ? "text-gray-500" : "text-red-500";
  return <p className={colorClass}>{children}</p>;
};
