import React, { useCallback, useContext } from "react";
import {
  ActionMenuActionType,
  ActionMenuMenuType,
  ActionMenuStore,
  IActionMenuActionPayload,
  IActionMenuStore,
} from "contexts/actionMenu.provider";

const DirectoryToolbarViewModel = (
  addNewButtonRef: React.MutableRefObject<any>
) =>
  useCallback(() => {
    const { dispatchActionMenuState } =
      useContext<IActionMenuStore>(ActionMenuStore);

    /**
     * Event handlers
     */
    const addNewOnClick = () => {
      if (!!addNewButtonRef.current) {
        const { x, y } = addNewButtonRef.current.getBoundingClientRect();
        dispatchActionMenuState({
          type: ActionMenuActionType.TOGGLE,
          payload: {
            x,
            y,
            elementWidth: addNewButtonRef.current.clientWidth,
            menuType: ActionMenuMenuType.ADD,
          } as IActionMenuActionPayload,
        });
      }
    };

    return { api: { addNewOnClick } };
  }, [addNewButtonRef.current]);

export default DirectoryToolbarViewModel;
