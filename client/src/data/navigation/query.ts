import { gql } from "apollo-server-core";

const GET_NAVIGATION = gql`
  query GetNavigation {
    navigation {
      title
      dropDown
      route
    }
  }
`;

export { GET_NAVIGATION };
