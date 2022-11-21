// import { IFileModel } from "@data/files/model";
// import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
// import {
//   ISetFavoriteFilesByFileIdsPayload,
//   ISetFileIdToFileModelPayload,
//   ISetSelectedFileModelsPayload,
// } from "reducers/files.reducer";
// import {
//   setActiveDirectoryFileId,
//   setActiveDirectoryFilePath,
//   setDirectoryToChildrenMap,
//   setFavoriteFilesByFileIds,
//   setFileIdToFileModel,
//   setSelectedFileModels,
// } from "reducers/files.slice";
// import {
//   IGetChildrenFilesByParentFileId,
//   IGetDirectories,
//   IGetFilesByFileIds,
//   ISetFavoritesByFileIds,
// } from "repositories/files.repository";
// import { IStore } from "store";

// /**
//  * Queries needed for service
//  */
// interface IFileServiceQueries {
//   _GetDirectories?: IGetDirectories;
//   _GetFilesByFileIds?: IGetFilesByFileIds;
//   _GetChildrenFilesByParentFileId?: IGetChildrenFilesByParentFileId;
//   _SetFavoritesByFileIds?: ISetFavoritesByFileIds;
// }

// /**
//  *
//  */
// class FileService {
//   private queries: IFileServiceQueries = {};
//   private dispatch: ThunkDispatch<IStore, undefined, AnyAction> | null = null;

//   constructor(
//     queries: IFileServiceQueries,
//     dispatch: ThunkDispatch<IStore, undefined, AnyAction>
//   ) {
//     this.queries = queries;
//     this.dispatch = dispatch;
//   }

//   /**
//    *
//    * @param variables
//    */
//   GetSubdirectoriesByFileId(variables: {
//     fileId: string;
//   }): Promise<any> | undefined {
//     return this.queries
//       ._GetDirectories?.({ directoryId: variables.fileId })
//       .then((data: IFileModel[]) => {
//         let fileIds = data.map((d) => d.fileId);
//         this.SetSubdirectoriesByFileId(variables.fileId, fileIds);
//         return fileIds;
//       });
//   }

//   /**
//    *
//    * @param variables
//    */
//   GetFilesByFileIds(variables: { ids: string[] }): Promise<any> | undefined {
//     return this.queries
//       ._GetFilesByFileIds?.({ ids: variables.ids })
//       .then((data: IFileModel[]) => {
//         this.dispatch?.(
//           setFileIdToFileModel({ files: data } as ISetFileIdToFileModelPayload)
//         );
//         return data;
//       });
//   }

//   /**
//    *
//    * @param variables
//    */
//   GetChildrenFilesByFileId(variables: {
//     fileId: string;
//   }): Promise<any> | undefined {
//     return this.queries
//       ._GetChildrenFilesByParentFileId?.({
//         directoryId: variables.fileId,
//       })
//       .then((data: IFileModel[]) => {
//         this.dispatch?.(
//           setFileIdToFileModel({ files: data } as ISetFileIdToFileModelPayload)
//         );

//         let subDirectories = data
//           .filter((file) => file.type === "directory")
//           .map((file) => {
//             return file.fileId;
//           });

//         if (subDirectories.length > 0) {
//           this.SetSubdirectoriesByFileId(variables.fileId, subDirectories);
//         }

//         return data;
//       });
//   }

//   /**
//    * When a directory is selected, set the state
//    * to have it as the current active directory
//    * @param fileId
//    */
//   SetActiveDirectoryFileId(fileId: string): void {
//     this.dispatch?.(setActiveDirectoryFileId({ fileId }));
//     // dispatch new filepath by new file id
//     this.SetFilePathOfActiveDirectoryFileId(fileId);
//   }

//   SetFilePathOfActiveDirectoryFileId(fileId: string) {
//     this.dispatch?.(setActiveDirectoryFilePath({ fileId }));
//   }

//   /**
//    * Add selected file models into select array
//    * @param variables
//    */
//   SetSelectedFileModels(variables: { files: IFileModel[] }): void {
//     this.dispatch?.(
//       setSelectedFileModels({
//         files: variables.files,
//       } as ISetSelectedFileModelsPayload)
//     );
//   }

//   /**
//    * Toggle favorites for files
//    * @param variables
//    */
//   SetFavoriteForFileIds(variables: {
//     files: IFileModel[];
//     favoriteFlag: boolean;
//   }): Promise<any> | undefined {
//     let { files, favoriteFlag } = variables;

//     if (!!files && files.length > 0) {
//       let fileIds = files.map((f) => f.fileId);

//       return this.queries
//         ._SetFavoritesByFileIds?.({
//           favoriteFlag: favoriteFlag,
//           fileIds: fileIds,
//         })
//         .then((res) => {
//           console.log("finished");
//           console.log(res);
//           this.dispatch?.(
//             setFavoriteFilesByFileIds({
//               fileIds,
//               favoriteFlag,
//             } as ISetFavoriteFilesByFileIdsPayload)
//           );
//           return res;
//         });
//     }
//   }

//   /**
//    * Dispatch to redux file subdirectories by parent file id
//    * @param fileId
//    * @param childrenMapFileIdArr
//    */
//   private SetSubdirectoriesByFileId(
//     fileId: string,
//     childrenMapFileIdArr: string[]
//   ) {
//     this.dispatch?.(
//       setDirectoryToChildrenMap({ fileId, childrenMapFileIdArr })
//     );
//   }
// }

// export default FileService;
