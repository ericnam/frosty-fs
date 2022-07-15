import { gql } from "apollo-server-express";

const fileSystemTypeDefs = gql`
  type FileSystem {
    fileId: String
    title: String
    type: String
    extension: String
    children: [String]
    content: String
  }

  extend type Query {
    fileSystem: [FileSystem]
    directories(directoryId: String): [FileSystem]
    directoryContent(directoryId: String): [FileSystem]
  }
`;

export default fileSystemTypeDefs;
