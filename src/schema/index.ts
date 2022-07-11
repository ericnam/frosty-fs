import { gql } from "apollo-server-express";

import navigationSchema from "./navigation.schema";
import fileSystemSchema from "./filesystem.schema";

const baseTypeDefs = gql`
  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }
  type Subscription {
    _: Boolean
  }
`;

export default [baseTypeDefs, navigationSchema
  , fileSystemSchema
];
