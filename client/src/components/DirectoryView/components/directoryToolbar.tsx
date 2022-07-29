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
    <div className={`text-xs float-left bg-slate-50 rounded-xl p-1`}>
      <button
        ref={addNewButtonRef}
        onClick={addNewOnClick}
        className={`float-left py-3 px-3 bg-white box-border border-2 text-gray-700 rounded-lg hover:bg-gray-100`}
      >
        <FontAwesomeIcon icon={faPlus as IconProp} className={``} />
        <span className={`ml-2 font-semibold`}>Add New</span>
      </button>
      <span
        className={"float-left flex items-center justify-center ml-4"}
        style={{ height: "44px" }}
      >
        <span className={"border-l h-6"}></span>
      </span>
      <span
        className={`float-left flex flex-row items-center justify-center`}
        style={{ height: "44px" }}
      >
        <IconButton title="Rename" icon={faPencil as IconProp} />
        <IconButton title="Move to" icon={faFolderTree as IconProp} />
        <IconButton title="Add to favorites" icon={faStar as IconProp} />
        <IconButton title="Delete" icon={faTrashCan as IconProp} />
      </span>
    </div>
  );
};

interface IIconButton {
  title: string;
  icon: IconProp;
}
const IconButton = ({ title, icon }: IIconButton): JSX.Element => {
  return (
    <button className={`text-gray-700 py-3 px-3 mx-2 hover:bg-gray-200 rounded-xl`} title={title}>
      <FontAwesomeIcon icon={icon as IconProp} />
    </button>
  );
};

export default DirectoryToolbar;
