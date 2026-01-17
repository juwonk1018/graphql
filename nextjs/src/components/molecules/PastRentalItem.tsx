import React from "react";
import { Badge } from "../atoms/Badge";

interface PastRentalItemProps {
  title: string;
  rentalDate: string;
  returnDate: string;
}

export const PastRentalItem = ({
  title,
  rentalDate,
  returnDate,
}: PastRentalItemProps) => {
  return (
    <div className="p-4 sm:flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
      <div>
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-gray-500">
          {new Date(rentalDate).toLocaleDateString()} -{" "}
          {new Date(returnDate).toLocaleDateString()}
        </p>
      </div>
      <div className="mt-2 sm:mt-0">
        <Badge variant="success">반납완료</Badge>
      </div>
    </div>
  );
};
