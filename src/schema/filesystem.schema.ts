import { gql } from "apollo-server-express";

const fileSystemTypeDefs = gql`
  type FileSystem {
    _id: String
    title: String
    type: String
    extension: String
    children: [String]
    content: String
  }

  extend type Query {
    fileSystem: [FileSystem]
    directories(directoryId: String): [FileSystem]
  }
`;

export default fileSystemTypeDefs;
