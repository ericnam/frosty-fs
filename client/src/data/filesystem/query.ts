import { gql } from "apollo-server-core";

export const GET_DIRECTORIES_TYPE = "directories";
export const GET_DIRECTORIES = gql`
  query GetDirectories($directoryId: String) {
    ${GET_DIRECTORIES_TYPE}(directoryId: $directoryId) {
      fileId
      title
      type
    }
  }
`;

export const GET_DIRECTORY_CONTENT_TYPE = "directoryContent";
export const GET_DIRECTORY_CONTENT = gql`
  query GetDirectoryContent($directoryId: String) {
    ${GET_DIRECTORY_CONTENT_TYPE}(directoryId: $directoryId) {
      fileId
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

export { GET_FILESYSTEM };
