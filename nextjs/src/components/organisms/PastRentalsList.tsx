import React from "react";
import { PastRentalItem } from "../molecules/PastRentalItem";
import { Rental } from "@/types";

interface PastRentalsListProps {
  rentals: Rental[];
}

export const PastRentalsList = ({ rentals }: PastRentalsListProps) => {
  if (rentals.length === 0) {
    return <p className="text-gray-500">반납 기록이 없습니다.</p>;
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {rentals.map((rental) => (
          <PastRentalItem
            key={rental.id}
            title={rental.book.title}
            rentalDate={rental.rentalDate}
            returnDate={rental.returnDate!}
          />
        ))}
      </div>
    </div>
  );
};
