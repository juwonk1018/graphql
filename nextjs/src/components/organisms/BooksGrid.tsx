import React from "react";
import { BookCard } from "../molecules/BookCard";

interface Book {
  id: string;
  title: string;
  author: string;
}

interface BooksGridProps {
  books: Book[];
}

export const BooksGrid = ({ books }: BooksGridProps) => {
  if (books.length === 0) {
    return (
      <div className="p-8 text-center border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl text-gray-500">
        등록된 책이 없습니다.
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {books.map((book) => (
        <BookCard key={book.id} title={book.title} author={book.author} />
      ))}
    </div>
  );
};
