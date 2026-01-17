import { Resolvers, Book, Customer } from "./types";

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
    hello: () => "Hello world!",
  },
};

export default resolvers;
