import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faStar, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import {
  faFolderTree,
  faPencil,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  ActionMenuActionType,
  ActionMenuMenuType,
  ActionMenuStore,
  IActionMenuActionPayload,
  IActionMenuStore,
} from "contexts/actionMenu.provider";
import { useCallback, useContext, useRef } from "react";

const DirectoryToolbar = (): JSX.Element => {
  const addNewButtonRef = useRef<any>(null);
  const { dispatchActionMenuState } =
    useContext<IActionMenuStore>(ActionMenuStore);

  const addNewOnClick = useCallback(() => {
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
  }, []);

  return (
    <div className={`flex text-xs`}>
      <button
        ref={addNewButtonRef}
        onClick={addNewOnClick}
        className={`py-3 px-3 bg-pink-500 text-white rounded-lg`}
      >
        <FontAwesomeIcon icon={faPlus as IconProp} className={``} />
        <span className={`ml-2 font-semibold`}>Add New</span>
      </button>
      <IconButton title="Rename" icon={faPencil as IconProp} />
      <IconButton title="Move to" icon={faFolderTree as IconProp} />
      <IconButton title="Add to favorites" icon={faStar as IconProp} />
      <IconButton title="Delete" icon={faTrashCan as IconProp} />
    </div>
  );
};

interface IIconButton {
  title: string;
  icon: IconProp;
}
const IconButton = ({ title, icon }: IIconButton): JSX.Element => {
  return (
    <button className={`text-gray-500 mx-4`} title={title}>
      <FontAwesomeIcon icon={icon as IconProp} />
    </button>
  );
};

export default DirectoryToolbar;
