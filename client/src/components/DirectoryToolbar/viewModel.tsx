// import React, { useCallback, useContext, useState } from "react";
// import {
//   ActionMenuActionType,
//   ActionMenuMenuType,
//   ActionMenuStore,
//   IActionMenuActionPayload,
//   IActionMenuStore,
// } from "contexts/actionMenu.provider";
// import { useAppDispatch, useAppSelector } from "@hooks/redux.hooks";
// import { getSelectedFileModels } from "reducers/files.slice";
// import FileService from "services/files.service";
// import FilesRepository from "repositories/files.repository";

// const DirectoryToolbarViewModel = (
//   addNewButtonRef: React.MutableRefObject<any>
// ) =>
//   useCallback(() => {
//     // Redux
//     const dispatch = useAppDispatch();
//     const selectedFileModels = useAppSelector(getSelectedFileModels);
//     const { dispatchActionMenuState } =
//       useContext<IActionMenuStore>(ActionMenuStore);

//     // Queries
//     const _SetFavoritesByFileIds = FilesRepository.SetFavoritesByFileIds();

//     // Services
//     const [fileService] = useState(
//       new FileService({ _SetFavoritesByFileIds }, dispatch)
//     );

//     /**
//      * Event handlers
//      */
//     const addNewOnClick = () => {
//       if (!!addNewButtonRef.current) {
//         const { x, y } = addNewButtonRef.current.getBoundingClientRect();
//         dispatchActionMenuState({
//           type: ActionMenuActionType.TOGGLE,
//           payload: {
//             x,
//             y,
//             elementWidth: addNewButtonRef.current.clientWidth,
//             menuType: ActionMenuMenuType.ADD,
//           } as IActionMenuActionPayload,
//         });
//       }
//     };

//     function favoriteOnClick() {
//       if (!!selectedFileModels && selectedFileModels.length > 0) {
//         let favoriteFlag = selectedFileModels.find((f) => !f.favorite) != null;
//         fileService.SetFavoriteForFileIds({
//           files: selectedFileModels,
//           favoriteFlag,
//         });
//       }
//     }

//     return { _api: { addNewOnClick, favoriteOnClick } };
//   }, [addNewButtonRef.current]);

// export default DirectoryToolbarViewModel;
