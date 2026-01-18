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

export const RENT_BOOK = gql`
  mutation RentBook($bookId: ID!, $customerId: ID!) {
    createRental(bookId: $bookId, customerId: $customerId) {
      id
      rentalDate
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

export const RETURN_BOOK = gql`
  mutation ReturnBook($rentalId: ID!) {
    returnBook(rentalId: $rentalId) {
      id
      returnDate
      book {
        id
        title
      }
    }
  }
`;

export const BOOK_RETURNED = gql`
  subscription OnBookReturned {
    bookReturned {
      id
      returnDate
      book {
        title
      }
      customer {
        name
      }
    }
  }
`;
