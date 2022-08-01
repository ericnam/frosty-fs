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

import { RepositoryParam, RepositoryHOF } from "repositories";

class FilesRepository {
  static GetDirectories(param?: RepositoryParam) {
    return RepositoryHOF(GET_DIRECTORIES, GET_DIRECTORIES_TYPE, param);
  }

  static GetDirectoryContent(param?: RepositoryParam) {
    return RepositoryHOF(
      GET_DIRECTORY_CONTENT,
      GET_DIRECTORY_CONTENT_TYPE,
      param
    );
  }

  static GetFiles(param?: RepositoryParam) {
    return RepositoryHOF(GET_FILES, GET_FILES_TYPE, param);
  }

  static GetFavorites(param?: RepositoryParam) {
    return RepositoryHOF(GET_FAVORITES, GET_FAVORITES_TYPE, param);
  }

  static GetRecents(param?: RepositoryParam) {
    return RepositoryHOF(GET_RECENT, GET_RECENT_TYPE, param);
  }
}

export default FilesRepository;
