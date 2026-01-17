import { gql } from "graphql-request";

export const GET_CUSTOMERS = gql`
  query GetCustomers {
    customers {
      id
      name
      email
      age
    }
  }
`;
