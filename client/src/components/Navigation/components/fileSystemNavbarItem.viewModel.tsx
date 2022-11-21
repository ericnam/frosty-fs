// import { IFileModel } from "@data/files/model";
// import { useAppDispatch, useAppSelector } from "@hooks/redux.hooks";
// import { useEffect, useState } from "react";
// import { getActiveDirectoryFileId } from "reducers/files.slice";
// import FilesRepository from "repositories/files.repository";
// import FileService from "services/files.service";

// const FileSystemNavbarItemViewModel = ({
//   fileId,
//   isParentDropdownExpanded,
// }: {
//   fileId: string;
//   isParentDropdownExpanded: boolean;
// }) => {
//   // Redux
//   const dispatch = useAppDispatch();
//   const activeDirectoryFileId = useAppSelector(getActiveDirectoryFileId);

//   // State
//   const [loading, setLoading] = useState(true);
//   const [subDirectoriesLoading, setSubDirectoriesLoading] = useState(true);
//   const [fileModel, setFileModel] = useState<IFileModel | null>(null);
//   const [subDirectoryFileModels, setSubDirectoryFileModels] = useState<
//     IFileModel[] | null
//   >(null);
//   const [isNavbarItemActive, setIsNavbarItemActive] = useState(false);
//   const [isDropdownExpanded, setIsDropdownExpanded] = useState(false);

//   // Queries
//   const _GetFilesByFileIds = FilesRepository.GetFilesByFileIds();
//   const _GetDirectories = FilesRepository.GetDirectories();

//   // Services
//   const [fileService] = useState(
//     new FileService({ _GetFilesByFileIds, _GetDirectories }, dispatch)
//   );

//   // Event Handlers
//   function directoryOnClick(fileId: string) {
//     // Set selected file as current active file
//     fileService.SetActiveDirectoryFileId(fileId);
//   }

//   // Effects
//   useEffect(() => {
//     if (!fileModel) {
//       fileService
//         .GetFilesByFileIds({ ids: [fileId] })
//         ?.then((data: IFileModel[]) => {
//           setFileModel(data[0]);
//           setLoading(false);
//         });
//     }
//   }, [fileModel]);
//   useEffect(() => {
//     if (isParentDropdownExpanded) {
//       fileService
//         .GetSubdirectoriesByFileId({ fileId: fileId })
//         ?.then((subDirectoryFileIds: string[]) => {
//           fileService
//             .GetFilesByFileIds({ ids: subDirectoryFileIds })
//             ?.then((data: IFileModel[]) => {
//               setSubDirectoryFileModels(data);
//               setSubDirectoriesLoading(false);
//             });
//         });
//     }
//   }, [isParentDropdownExpanded]);
//   useEffect(() => {
//     setIsNavbarItemActive(activeDirectoryFileId === fileId);
//   }, [activeDirectoryFileId]);

//   return {
//     _api: { directoryOnClick, setIsDropdownExpanded },
//     _state: { isNavbarItemActive, isDropdownExpanded },
//     _data: {
//       file: {
//         loading: loading,
//         obj: fileModel,
//       },
//       subDirectories: {
//         loading: subDirectoriesLoading,
//         obj: subDirectoryFileModels,
//       },
//       linkto: `/my-files${fileId !== "root" ? "/" + fileId : ""}`,
//     },
//   };
// };

// export default FileSystemNavbarItemViewModel;
