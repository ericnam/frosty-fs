import { gql } from "apollo-server-express";

const navigationTypeDefs = gql`
  type Navigation {
    title: String
    sortOrder: Int
  }

  extend type Query {
    getNavigation: [Navigation]
  }
`;

export default navigationTypeDefs;
