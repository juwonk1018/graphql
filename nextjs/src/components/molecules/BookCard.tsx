import React from "react";
import { Card } from "../atoms/Card";

interface BookCardProps {
  title: string;
  author: string;
}

export const BookCard = ({ title, author }: BookCardProps) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <h3 className="font-bold text-lg leading-tight mb-1">{title}</h3>
      <p className="text-sm text-gray-500">by {author}</p>
    </Card>
  );
};
