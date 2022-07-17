import { gql } from "apollo-server-express";

const fileSystemTypeDefs = gql`
  type FileSystem {
    fileId: String
    title: String
    type: String
    extension: String
    children: [String]
    content: String
    parentId: String
  }

  extend type Query {
    fileSystem: [FileSystem]
    files(ids: [String]): [FileSystem]
    subDirectories(directoryId: String): [FileSystem]
    directoryContent(directoryId: String): [FileSystem]
  }
`;

export default fileSystemTypeDefs;
  