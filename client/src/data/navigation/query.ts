import { gql } from "apollo-server-core";

const GET_NAVIGATION = gql`
  query GetNavigation {
    navigation {
      title
    }
  }
`;

export { GET_NAVIGATION };
