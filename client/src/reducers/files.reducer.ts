import { IFileModel } from "@data/files/model";
import { current } from "@reduxjs/toolkit";

export interface ISetSubDirectoryPayload {
  fileId: string;
  subDirectories: IFileModel[];
}
function setSubDirectory(state: any, action: any) {
  let payload = action.payload as ISetSubDirectoryPayload;
  state.subDirectories[payload.fileId] = payload.subDirectories;
}

export interface ISetCurrentFilePayload {
  fileId: string;
}
function setCurrentFile(state: any, action: any) {
  let payload = action.payload as ISetCurrentFilePayload;
  state.currentFileId = payload.fileId;

  setFilePath(payload.fileId);

  function setFilePath(fileId: string) {
    if (fileId === "root") {
      state.filePath = [];
      return;
    }

    let filePathArr = current(state).filePath;
    if (filePathArr[filePathArr.length - 1] !== fileId) {
      let newFilePathArr = [];
      let file = current(state).files[fileId];

      let parentId = file.parentId;
      newFilePathArr.unshift(fileId);

      while (parentId !== "root") {
        let tempFile = current(state).files[parentId];
        newFilePathArr.unshift(tempFile.fileId);
        parentId = tempFile.parentId;
      }

      state.filePath = newFilePathArr;
    }
  }
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

export default { setSubDirectory, setCurrentFile, setFiles };
