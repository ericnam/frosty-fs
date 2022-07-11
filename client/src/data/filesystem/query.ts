import { gql } from "apollo-server-core";

const GET_DIRECTORIES = gql`
  query GetDirectories($directoryId: String) {
    directories(directoryId: $directoryId) {
      title
      type
    }
  }
`;

const GET_FILESYSTEM = gql`
  query GetFileSystem {
    fileSystem {
        title
    }
  }
`;

export { GET_DIRECTORIES, GET_FILESYSTEM };
