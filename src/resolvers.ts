import { Resolvers, Book, Customer, Rental } from "./types";

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
};

export default resolvers;
