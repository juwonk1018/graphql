import React from "react";
import { RentalCard } from "../molecules/RentalCard";
import { Rental } from "@/types";

interface RentalsGridProps {
  rentals: Rental[];
  onReturnBook?: (rental: Rental) => void;
}

export const RentalsGrid = ({ rentals, onReturnBook }: RentalsGridProps) => {
  if (rentals.length === 0) {
    return (
      <div className="p-8 text-center border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl text-gray-500">
        대여 중인 책이 없습니다.
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {rentals.map((rental) => (
        <RentalCard
          key={rental.id}
          title={rental.book.title}
          rentalDate={rental.rentalDate}
          onReturn={() => onReturnBook && onReturnBook(rental)}
        />
      ))}
    </div>
  );
};
