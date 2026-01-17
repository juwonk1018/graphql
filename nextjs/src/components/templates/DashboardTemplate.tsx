import React from "react";
import { NavBar } from "../molecules/NavBar";
import { Button } from "../atoms/Button";
import { RentalsGrid } from "../organisms/RentalsGrid";
import { PastRentalsList } from "../organisms/PastRentalsList";
import { RentBookModal } from "../organisms/RentBookModal";
import { Book, Customer, Rental } from "@/types";

interface DashboardTemplateProps {
  currentUser: Customer;
  currentRentals: Rental[];
  pastRentals: Rental[];
  allBooks: Book[];
  isBooksLoading: boolean;
  showRentModal: boolean;
  onLogout: () => void;
  onOpenRentModal: () => void;
  onCloseRentModal: () => void;
  onRentBook: (book: Book) => void;
  onReturnBook: (rental: Rental) => void;
}

export const DashboardTemplate = ({
  currentUser,
  currentRentals,
  pastRentals,
  allBooks,
  isBooksLoading,
  showRentModal,
  onLogout,
  onOpenRentModal,
  onCloseRentModal,
  onRentBook,
  onReturnBook,
}: DashboardTemplateProps) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-[family-name:var(--font-geist-sans)]">
      <NavBar userName={currentUser.name} onLogout={onLogout} />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Actions</h2>
          </div>
          <Button onClick={onOpenRentModal} className="w-full sm:w-auto">
            + 책 대여하기
          </Button>

          <RentBookModal
            isOpen={showRentModal}
            onClose={onCloseRentModal}
            books={allBooks}
            isLoading={isBooksLoading}
            onRent={onRentBook}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            현재 대여한 책 리스트
            <span className="text-sm font-normal text-gray-500 bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded-full">
              {currentRentals.length}
            </span>
          </h2>
          <RentalsGrid rentals={currentRentals} onReturnBook={onReturnBook} />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6 text-gray-700 dark:text-gray-300">
            반납 완료한 책 리스트
          </h2>
          <PastRentalsList rentals={pastRentals} />
        </section>
      </main>
    </div>
  );
};
