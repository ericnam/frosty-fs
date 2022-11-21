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
  SET_FAVORITES,
  SET_FAVORITES_TYPE,
} from "@data/files/query";

import {
  RepositoryParam,
  RepositoryHOF,
  AsyncRepositoryHOF,
  staticImplements,
  MutationHOF,
} from "repositories";

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
export type ISetFavoritesByFileIds = (variables: any) => Promise<any>;

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
  static GetFilesByFileIds(): IGetFilesByFileIds {
    return AsyncRepositoryHOF(GET_FILES, GET_FILES_TYPE);
  }

  /**
   *
   * @returns
   */
  static GetChildrenFilesByParentFileId(): IGetChildrenFilesByParentFileId {
    return AsyncRepositoryHOF(
      GET_DIRECTORY_CONTENT,
      GET_DIRECTORY_CONTENT_TYPE
    );
  }

  /**
   *
   * @returns
   */
  static SetFavoritesByFileIds(): ISetFavoritesByFileIds {
    return MutationHOF(SET_FAVORITES, SET_FAVORITES_TYPE);
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
