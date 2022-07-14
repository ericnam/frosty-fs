import { GET_DIRECTORIES, GET_DIRECTORIES_TYPE } from "@data/filesystem/query";

import { RepositoryParam, RepositoryHOF } from "repositories";

class FilesRepository {
  static GetDirectories(param?: RepositoryParam) {
    return RepositoryHOF(GET_DIRECTORIES, GET_DIRECTORIES_TYPE, param);
  }
}

export default FilesRepository;
