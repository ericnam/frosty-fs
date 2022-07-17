import { gql } from "apollo-server-core";

export const GET_DIRECTORIES_TYPE = "subDirectories";
export const GET_DIRECTORIES = gql`
  query GetSubDirectories($directoryId: String) {
    ${GET_DIRECTORIES_TYPE}(directoryId: $directoryId) {
      fileId
      title
      type
      parentId
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

export const GET_FILES_TYPE = "files";
export const GET_FILES = gql`
  query GetFiles($ids: [String]) {
    ${GET_FILES_TYPE}(ids: $ids) {
      fileId
      title
      type
      parentId
    }
  }
`;
