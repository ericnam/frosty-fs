import { IFileModel } from "@data/files/model";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { ISetFileIdToFileModelPayload } from "reducers/files.reducer";
import {
  setActiveDirectoryFileId,
  setActiveDirectoryFilePath,
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
  GetSubdirectoriesByFileId(variables: {
    fileId: string;
  }): Promise<any> | undefined {
    return this.queries
      ._GetDirectories?.({ directoryId: variables.fileId })
      .then((data: IFileModel[]) => {
        let fileIds = data.map((d) => d.fileId);
        this.SetSubdirectoriesByFileId(variables.fileId, fileIds);
        return fileIds;
      });
  }

  /**
   *
   * @param variables
   */
  GetFilesByFileIds(variables: { ids: string[] }): Promise<any> | undefined {
    return this.queries
      ._GetFilesByFileIds?.({ ids: variables.ids })
      .then((data: IFileModel[]) => {
        this.dispatch?.(
          setFileIdToFileModel({ files: data } as ISetFileIdToFileModelPayload)
        );
        return data;
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
   * When a directory is selected, set the state
   * to have it as the current active directory
   * @param fileId
   */
  SetActiveDirectoryFileId(fileId: string) {
    this.dispatch?.(setActiveDirectoryFileId({ fileId }));
    // dispatch new filepath by new file id
    this.SetFilePathOfActiveDirectoryFileId(fileId);
  }

  SetFilePathOfActiveDirectoryFileId(fileId: string) {
    this.dispatch?.(setActiveDirectoryFilePath({ fileId }));
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
