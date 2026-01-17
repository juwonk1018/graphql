import React from "react";

export const Badge = ({
  children,
  variant = "success",
}: {
  children: React.ReactNode;
  variant?: "success" | "default";
}) => {
  const styles =
    variant === "success"
      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
      : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${styles}`}
    >
      {children}
    </span>
  );
};
