import { gql } from "apollo-server-core";

export const GET_NAVIGATION_TYPE = "navigation";
export const GET_NAVIGATION = gql`
  query GetNavigation {
    navigation {
      title
      dropDown
      route
    }
  }
`;
