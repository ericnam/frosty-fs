// import { current } from "@reduxjs/toolkit";
// import { IFileSelectionSliceState } from "./fileSelection.slice";

// function setActiveDirectoryFileId(
//   state: IFileSelectionSliceState,
//   action: any
// ) {
//   let payload = action.payload as ISetActiveDirectoryFileIdPayload;
//   state.activeDirecotryFileId = payload.fileId;
// }
// export interface ISetActiveDirectoryFileIdPayload {
//   fileId: string;
// }

// function setActiveDirectoryFilePath(
//   state: IFileSelectionSliceState,
//   action: any
// ) {
//   let { fileId } = action.payload as ISetActiveDirectoryFileIdPayload;

//   if (fileId === "root") {
//     state.activeDirectoryFilePath = [];
//     return;
//   }

//   let filePathArr = current(state).activeDirectoryFilePath;
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

//     state.activeDirectoryFilePath = newFilePathArr;
//   }
// }
// export interface ISetActiveDirectoryFilePathPayload {
//   fileId: string;
// }

// export default { setActiveDirectoryFileId };
