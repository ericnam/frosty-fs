import { gql } from "apollo-server-express";

const navigationTypeDefs = gql`
  type Navigation {
    title: String
    sortOrder: Int
    dropDown: Boolean
    route: String
  }

  extend type Query {
    navigation: [Navigation]
  }
`;

export default navigationTypeDefs;
