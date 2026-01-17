export interface Book {
  id: string;
  title: string;
  author: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  age: number;
}

export interface Rental {
  id: string;
  rentalDate: string;
  returnDate: string | null;
  book: {
    id: string;
    title: string;
  };
  customer: {
    id: string;
    name: string;
  };
}

export interface GetBooksData {
  books: Book[];
}

export interface GetCustomersData {
  customers: Customer[];
}

export interface GetRentalsData {
  rentals: Rental[];
}
