import { GET_DIRECTORIES, GET_DIRECTORIES_TYPE } from "@data/files/query";
import { useLazyQuerySingleObj } from "queries";

function useQuery_GetDirectories() {
  return useLazyQuerySingleObj(
    GET_DIRECTORIES,
    GET_DIRECTORIES_TYPE,
    (directoryId: string) => {
      return { directoryId: directoryId };
    }
  );
}

export { useQuery_GetDirectories };
