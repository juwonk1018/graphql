import { gql } from "apollo-server";

const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    id: ID
    title: String
    author: String
  }

  type Customer {
    id: ID
    name: String
    email: String
    age: Int
  }

  type Rental {
    id: ID
    book: Book
    customer: Customer
    rentalDate: String # ISO 8601 format (e.g. "2024-01-17T12:34:56")
    returnDate: String # ISO 8601 format (e.g. "2024-01-17T12:34:56")
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books(id: ID, title: String, author: String): [Book]
    book(id: ID, title: String, author: String): Book
    customers(id: ID, name: String, email: String): [Customer]
    customer(id: ID, name: String, email: String): Customer
    hello: String
  }
`;

export default typeDefs;
