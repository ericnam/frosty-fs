import {
  GET_DIRECTORIES,
  GET_DIRECTORIES_TYPE,
  GET_DIRECTORY_CONTENT,
  GET_DIRECTORY_CONTENT_TYPE,
  GET_FAVORITES,
  GET_FAVORITES_TYPE,
  GET_FILES,
  GET_FILES_TYPE,
  GET_RECENT,
  GET_RECENT_TYPE,
} from "@data/files/query";

import {
  RepositoryParam,
  RepositoryHOF,
  AsyncRepositoryHOF,
} from "repositories";

/* class decorator */
function staticImplements<T>() {
  return <U extends T>(constructor: U) => {
    constructor;
  };
}

/**
 * Repository Interface
 */
interface IFilesRepository {}
interface IFilesRepositoryStatic {
  new (): IFilesRepository;
  GetDirectories(): IGetDirectories;
  GetFilesByFileIds(): IGetFilesByFileIds;
  GetChildrenFilesByParentFileId(): IGetChildrenFilesByParentFileId;
}

export type IGetDirectories = (variables: any) => Promise<any>;
export type IGetFilesByFileIds = (variables: any) => Promise<any>;
export type IGetChildrenFilesByParentFileId = (variables: any) => Promise<any>;

/**
 *
 */
@staticImplements<IFilesRepositoryStatic>()
class FilesRepository {
  /**
   *
   * @returns
   */
  static GetDirectories(): IGetDirectories {
    return AsyncRepositoryHOF(GET_DIRECTORIES, GET_DIRECTORIES_TYPE);
  }

  /**
   *
   * @returns
   */
  static GetFilesByFileIds() {
    return AsyncRepositoryHOF(GET_FILES, GET_FILES_TYPE);
  }

  /**
   *
   * @returns
   */
  static GetChildrenFilesByParentFileId() {
    return AsyncRepositoryHOF(
      GET_DIRECTORY_CONTENT,
      GET_DIRECTORY_CONTENT_TYPE
    );
  }

  static GetDirectoryContent(param?: RepositoryParam) {
    return RepositoryHOF(
      GET_DIRECTORY_CONTENT,
      GET_DIRECTORY_CONTENT_TYPE,
      param
    );
  }

  static GetFiles() {
    return AsyncRepositoryHOF(GET_FILES, GET_FILES_TYPE);
  }

  static GetFavorites(param?: RepositoryParam) {
    return RepositoryHOF(GET_FAVORITES, GET_FAVORITES_TYPE, param);
  }

  static GetRecents(param?: RepositoryParam) {
    return RepositoryHOF(GET_RECENT, GET_RECENT_TYPE, param);
  }
}

export default FilesRepository;
