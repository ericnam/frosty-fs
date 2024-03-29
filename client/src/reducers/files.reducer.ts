import { IFileModel } from "@data/files/model";
import { current } from "@reduxjs/toolkit";
import { IFileSliceState } from "./files.slice";

export interface ISetSubDirectoryPayload {
  fileId: string;
  subDirectories: IFileModel[];
}
function setSubDirectory(state: any, action: any) {
  let payload = action.payload as ISetSubDirectoryPayload;
  state.subDirectories[payload.fileId] = payload.subDirectories;
}

/**
 * Update the file id to children file id mapping
 * @param state
 * @param action
 */
function setDirectoryToChildrenMap(state: IFileSliceState, action: any) {
  let { fileId, childrenMapFileIdArr } =
    action.payload as ISetDirectoryToChildrenMapPayload;
  let map: { [key: string]: boolean } = {};

  for (let childFileId of childrenMapFileIdArr) {
    if (!map.hasOwnProperty(childFileId)) {
      map[childFileId] = true;
    }
  }

  state.directoryToChildrenMap[fileId] = map;
}
export interface ISetDirectoryToChildrenMapPayload {
  fileId: string;
  childrenMapFileIdArr: string[];
}

/**
 * Update master file store by file id
 * Overwrite any existing file with updated data
 * @param state
 * @param action
 */
function setFileIdToFileModel(state: IFileSliceState, action: any) {
  let payload = action.payload as ISetFileIdToFileModelPayload;
  for (let file of payload.files) {
    state.fileIdToFile[file.fileId] = file;
  }
}
export interface ISetFileIdToFileModelPayload {
  files: IFileModel[];
}

/**
 * Set current directory file id
 * @param state
 * @param action
 */
function setActiveDirectoryFileId(state: IFileSliceState, action: any) {
  let payload = action.payload as ISetActiveDirectoryFileIdPayload;
  state.activeDirectoryFileId = payload.fileId;
}
export interface ISetActiveDirectoryFileIdPayload {
  fileId: string;
}

/**
 * Set file path using provided file id
 * @param state
 * @param action
 * @returns
 */
function setActiveDirectoryFilePath(state: IFileSliceState, action: any) {
  let { fileId } = action.payload as ISetActiveDirectoryFileIdPayload;

  if (fileId === "root") {
    state.activeDirectoryFilePath = [];
    return;
  }

  let filePathArr = current(state).activeDirectoryFilePath;
  if (filePathArr[filePathArr.length - 1] !== fileId) {
    let newFilePathArr = [];
    let file = current(state).fileIdToFile[fileId];

    let parentId = file.parentId;
    newFilePathArr.unshift(fileId);

    while (parentId !== "root") {
      let tempFile = current(state).fileIdToFile[parentId];
      newFilePathArr.unshift(tempFile.fileId);
      parentId = tempFile.parentId;
    }

    state.activeDirectoryFilePath = newFilePathArr;
  }
}
export interface ISetActiveDirectoryFilePathPayload {
  fileId: string;
}

/**
 * Set selected file models through grid selection
 * @param state
 * @param action
 */
function setSelectedFileModels(state: IFileSliceState, action: any) {
  let { files } = action.payload as ISetSelectedFileModelsPayload;
  state.selectedFileModels = files;
}
export interface ISetSelectedFileModelsPayload {
  files: IFileModel[];
}

/**
 * Toggle favorite flag for file models
 * @param state
 * @param action
 */
function setFavoriteFilesByFileIds(state: IFileSliceState, action: any) {
  let { fileIds, favoriteFlag } =
    action.payload as ISetFavoriteFilesByFileIdsPayload;

  if (fileIds.length > 0) {
    for (let fileId of fileIds) {
      state.fileIdToFile[fileId].favorite = favoriteFlag;
    }
  }
}
export interface ISetFavoriteFilesByFileIdsPayload {
  fileIds: string[];
  favoriteFlag: boolean;
}

export interface ISetCurrentFilePayload {
  fileId: string;
}
function setCurrentFile(
  // state: any, action: any
  ) {
  // let payload = action.payload as ISetCurrentFilePayload;
  // state.currentFileId = payload.fileId;
  // setFilePath(payload.fileId);
  // function setFilePath(fileId: string) {
  //   if (fileId === "root") {
  //     state.filePath = [];
  //     return;
  //   }
  //   let filePathArr = current(state).filePath;
  //   if (filePathArr[filePathArr.length - 1] !== fileId) {
  //     let newFilePathArr = [];
  //     let file = current(state).files[fileId];
  //     let parentId = file.parentId;
  //     newFilePathArr.unshift(fileId);
  //     while (parentId !== "root") {
  //       let tempFile = current(state).files[parentId];
  //       newFilePathArr.unshift(tempFile.fileId);
  //       parentId = tempFile.parentId;
  //     }
  //     state.filePath = newFilePathArr;
  //   }
  // }
}

export interface ISetFilesPayload {
  files: IFileModel[];
}
function setFiles(state: any, action: any) {
  let payload = action.payload as ISetFilesPayload;

  for (let file of payload.files) {
    if (!current(state).files.hasOwnProperty(file.fileId)) {
      state.files[file.fileId] = file;
    }
  }
}

export interface ISetCurrentViewPayload {
  view: string;
}
function setCurrentView(state: any, action: any) {
  let payload = action.payload as ISetCurrentViewPayload;
  state.currentView = payload.view;
}

export default {
  setSubDirectory,
  setCurrentFile,
  setFiles,
  setCurrentView,

  setDirectoryToChildrenMap,
  setFileIdToFileModel,
  setActiveDirectoryFileId,
  setActiveDirectoryFilePath,
  setSelectedFileModels,
  setFavoriteFilesByFileIds,
};
