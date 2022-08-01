import { gql } from "apollo-server-core";

export const GET_DIRECTORIES_TYPE = "subDirectories";
export const GET_DIRECTORIES = gql`
  query GetSubDirectories($directoryId: String) {
    ${GET_DIRECTORIES_TYPE}(directoryId: $directoryId) {
      fileId
      title
      type
      parentId
      fileSize
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
      parentId
      fileSize
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
      fileSize
    }
  }
`;

export const GET_FAVORITES_TYPE = "favorite";
export const GET_FAVORITES = gql`
  query GetFavorites {
    ${GET_FAVORITES_TYPE} {
      fileId
      title
      type
      parentId
      fileSize
    }
  }
`;

export const GET_RECENT_TYPE = "recent";
export const GET_RECENT = gql`
  query GetRecents {
    ${GET_RECENT_TYPE} {
      fileId
      title
      type
      parentId
      fileSize
    }
  }
`;
