import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export const Card = ({ children, className = "" }: CardProps) => {
  return (
    <div className={`p-3 bg-gray-100 dark:bg-gray-700 rounded ${className}`}>
      {children}
    </div>
  );
};
