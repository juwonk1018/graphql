import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
}

export const Section = ({ children, className = "" }: SectionProps) => {
  return (
    <section className={`p-4 border rounded-lg ${className}`}>
      {children}
    </section>
  );
};
