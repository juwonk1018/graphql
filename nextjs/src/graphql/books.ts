import { gql } from "graphql-request";

export const GET_BOOKS = gql`
  query GetBooks {
    books {
      id
      title
      author
    }
  }
`;
