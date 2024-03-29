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
    fileSize: String
    trash: Boolean
    favorite: Boolean
    lastUpdated: String
  }

  extend type Query {
    fileSystem: [FileSystem]
    files(ids: [String]): [FileSystem]
    favorite: [FileSystem]
    trash: [FileSystem]
    recent: [FileSystem]
    subDirectories(directoryId: String): [FileSystem]
    directoryContent(directoryId: String): [FileSystem]
  }

  extend type Mutation {
    setFavorites(favoriteFlag: Boolean, fileIds: [String]): [Boolean]
  }
`;

export default fileSystemTypeDefs;
