import { gql } from "apollo-server-express";

const navigationTypeDefs = gql`
  type Navigation {
    title: String
    sortOrder: Int
  }

  extend type Query {
    navigation: [Navigation]
  }
`;

export default navigationTypeDefs;
