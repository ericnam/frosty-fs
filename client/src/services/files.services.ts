import { IFileModel } from "@data/files/model";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { ISetFileIdToFileModelPayload } from "reducers/files.reducer";
import {
  setDirectoryToChildrenMap,
  setFileIdToFileModel,
} from "reducers/files.slice";
import {
  IGetChildrenFilesByParentFileId,
  IGetDirectories,
  IGetFilesByFileIds,
} from "repositories/files.repository";
import { IStore } from "store";

/**
 * Queries needed for service
 */
interface IFileServiceQueries {
  _GetDirectories?: IGetDirectories;
  _GetFilesByFileIds?: IGetFilesByFileIds;
  _GetChildrenFilesByParentFileId?: IGetChildrenFilesByParentFileId;
}

/**
 *
 */
class FileService {
  private queries: IFileServiceQueries = {};
  private dispatch: ThunkDispatch<IStore, undefined, AnyAction> | null = null;

  constructor(
    queries: IFileServiceQueries,
    dispatch: ThunkDispatch<IStore, undefined, AnyAction>
  ) {
    this.queries = queries;
    this.dispatch = dispatch;
  }

  /**
   *
   * @param variables
   */
  GetSubdirectoriesByFileId(variables: { fileId: string }): void {
    this.queries
      ._GetDirectories?.({ directoryId: variables.fileId })
      .then((data: string[]) => {
        this.SetSubdirectoriesByFileId(variables.fileId, data);
      });
  }

  /**
   *
   * @param variables
   */
  GetFilesByFileIds(variables: { ids: string[] }): void {
    this.queries
      ._GetFilesByFileIds?.({ ids: variables.ids })
      .then((data: IFileModel[]) => {
        this.dispatch?.(
          setFileIdToFileModel({ files: data } as ISetFileIdToFileModelPayload)
        );
      });
  }

  /**
   *
   * @param variables
   */
  GetChildrenFilesByFileId(variables: {
    fileId: string;
  }): Promise<any> | undefined {
    return this.queries
      ._GetChildrenFilesByParentFileId?.({
        directoryId: variables.fileId,
      })
      .then((data: IFileModel[]) => {
        this.dispatch?.(
          setFileIdToFileModel({ files: data } as ISetFileIdToFileModelPayload)
        );

        let subDirectories = data
          .filter((file) => file.type === "directory")
          .map((file) => {
            return file.fileId;
          });

        if (subDirectories.length > 0) {
          this.SetSubdirectoriesByFileId(variables.fileId, subDirectories);
        }

        return data;
      });
  }

  /**
   * Dispatch to redux file subdirectories by parent file id
   * @param fileId 
   * @param childrenMapFileIdArr 
   */
  private SetSubdirectoriesByFileId(
    fileId: string,
    childrenMapFileIdArr: string[]
  ) {
    this.dispatch?.(
      setDirectoryToChildrenMap({ fileId, childrenMapFileIdArr })
    );
  }
}

export default FileService;
