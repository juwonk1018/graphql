import React from "react";
import { Book } from "@/types";

interface RentBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  books: Book[];
  isLoading: boolean;
  onRent: (book: Book) => void;
}

export const RentBookModal = ({
  isOpen,
  onClose,
  books,
  isLoading,
  onRent,
}: RentBookModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-lg w-full max-h-[80vh] overflow-hidden flex flex-col">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h3 className="text-xl font-bold">Select a Book to Rent</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            ✕
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-6 space-y-3">
          {isLoading && <p>Loading books...</p>}
          {!isLoading &&
            books.map((book) => (
              <button
                key={book.id}
                className="w-full text-left p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 border border-gray-200 dark:border-gray-700 transition-all"
                onClick={() => onRent(book)}
              >
                <p className="font-bold text-lg">{book.title}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  by {book.author}
                </p>
              </button>
            ))}
        </div>
      </div>
    </div>
  );
};
