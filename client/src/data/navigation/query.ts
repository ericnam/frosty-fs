import { gql } from "apollo-server-core";

const GET_NAVIGATION = gql`
  query GetNavigation {
    navigation {
      title
      dropDown
    }
  }
`;

export { GET_NAVIGATION };
