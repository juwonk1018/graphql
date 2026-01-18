import { PubSub } from "graphql-subscriptions";
import { Resolvers, Book, Customer, Rental } from "./types";

const pubsub = new PubSub();
const BOOK_RETURNED = "BOOK_RETURNED";

const books: Book[] = [
  {
    id: "1",
    title: "The Awakening",
    author: "Kate Chopin",
  },
  {
    id: "2",
    title: "City of Glass",
    author: "Paul Auster",
  },
  {
    id: "3",
    title: "City of Glass I",
    author: "Paul Auster",
  },
  {
    id: "4",
    title: "City of Glass II",
    author: "Paul Auster",
  },
  {
    id: "5",
    title: "City of Glass III",
    author: "Paul Auster",
  },
];

const customers: Customer[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    age: 30,
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    age: 25,
  },
  {
    id: "3",
    name: "John Smith",
    email: "john.smith@example.com",
    age: 30,
  },
];

const rentals: Rental[] = [
  {
    id: "1",
    book: books[0],
    customer: customers[0],
    rentalDate: "2024-01-17T10:00:00",
    returnDate: "2024-01-24T10:00:00",
  },
  {
    id: "2",
    book: books[1],
    customer: customers[1],
    rentalDate: "2024-01-15T14:30:00",
    returnDate: null,
  },
];

const resolvers: Resolvers = {
  Query: {
    books: (_, args) =>
      books.filter((book) => {
        const matchesId = args.id ? book.id === args.id : true;
        const matchesTitle = args.title ? book.title === args.title : true;
        const matchesAuthor = args.author ? book.author === args.author : true;

        return matchesId && matchesTitle && matchesAuthor;
      }),
    book: (_, args) =>
      books.find((book) => {
        if (!args.id && !args.title && !args.author) return false;

        const matchesId = args.id ? book.id === args.id : true;
        const matchesTitle = args.title ? book.title === args.title : true;
        const matchesAuthor = args.author ? book.author === args.author : true;

        return matchesId && matchesTitle && matchesAuthor;
      }) || null,

    customers: (_, args) =>
      customers.filter((customer) => {
        const matchesId = args.id ? customer.id === args.id : true;
        const matchesTitle = args.name ? customer.name === args.name : true;
        const matchesAuthor = args.email ? customer.email === args.email : true;

        return matchesId && matchesTitle && matchesAuthor;
      }),

    customer: (_, args) =>
      customers.find((customer) => {
        if (!args.id && !args.name && !args.email) return false;

        const matchesId = args.id ? customer.id === args.id : true;
        const matchesTitle = args.name ? customer.name === args.name : true;
        const matchesAuthor = args.email ? customer.email === args.email : true;

        return matchesId && matchesTitle && matchesAuthor;
      }) || null,

    rentals: () => rentals,
    rental: (_, args) =>
      rentals.find((rental) => {
        if (!args.id) return false;

        const matchesId = args.id ? rental.id === args.id : true;

        return matchesId;
      }) || null,
    hello: () => "Hello world!",
  },
  Mutation: {
    addBook: (_, args) => {
      const newBook: Book = {
        id: String(books.length + 1),
        title: args.title,
        author: args.author,
      };
      books.push(newBook);
      return newBook;
    },
    addCustomer: (_, args) => {
      const newCustomer: Customer = {
        id: String(customers.length + 1),
        name: args.name,
        email: args.email,
        age: args.age,
      };
      customers.push(newCustomer);
      return newCustomer;
    },
    createRental: (_, args) => {
      const book = books.find((b) => b.id === args.bookId);
      const customer = customers.find((c) => c.id === args.customerId);

      if (!book || !customer) {
        throw new Error("Book or Customer not found");
      }

      // 이미 대여 중인 책인지 확인 (반납되지 않은 대여 기록이 있는지 확인)
      const isBookRented = rentals.some(
        (r) => r.book?.id === args.bookId && r.returnDate === null,
      );

      if (isBookRented) {
        throw new Error("This book is currently rented out.");
      }

      const newRental: Rental = {
        id: String(rentals.length + 1),
        book,
        customer,
        rentalDate: new Date().toISOString(),
        returnDate: null,
      };
      rentals.push(newRental);
      return newRental;
    },
    returnBook: (_, args) => {
      const rental = rentals.find((r) => r.id === args.rentalId);
      if (!rental) {
        throw new Error("Rental not found");
      }

      // 이미 반납된 책인지 확인
      if (rental.returnDate !== null) {
        throw new Error("This rental has already been returned.");
      }

      rental.returnDate = new Date().toISOString();
      pubsub.publish(BOOK_RETURNED, { bookReturned: rental });
      return rental;
    },
  },
  Subscription: {
    bookReturned: {
      subscribe: () => (pubsub as any).asyncIterableIterator([BOOK_RETURNED]),
    },
  },
};

export default resolvers;
