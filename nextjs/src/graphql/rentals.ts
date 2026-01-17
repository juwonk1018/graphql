import { gql } from "graphql-request";

export const GET_RENTALS = gql`
  query GetRentals {
    rentals {
      id
      rentalDate
      returnDate
      book {
        id
        title
      }
      customer {
        id
        name
      }
    }
  }
`;
