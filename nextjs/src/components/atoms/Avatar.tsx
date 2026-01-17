import React from "react";

export const Avatar = ({
  name,
  size = "md",
}: {
  name: string;
  size?: "sm" | "md" | "lg";
}) => {
  const sizeClasses = {
    sm: "h-6 w-6 text-xs",
    md: "h-10 w-10 text-lg",
    lg: "h-12 w-12 text-xl",
  };

  return (
    <div
      className={`${sizeClasses[size]} rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center font-bold text-white shrink-0`}
    >
      {name[0]}
    </div>
  );
};
