import { useContext, useEffect, useState } from "react";
import {
  ActionMenuMenuType,
  ActionMenuStore,
  IActionMenuStore,
} from "contexts/actionMenu.provider";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DirectoryActionsMenu from "./directoryActions.menu";
import AddNewMenu from "./addNew.menu";

const ActionMenu = () => {
  const { actionMenuState } = useContext<IActionMenuStore>(ActionMenuStore);
  const [menu, setMenu] = useState<JSX.Element>();

  useEffect(() => {
    switch (actionMenuState.menuType) {
      case ActionMenuMenuType.ADD:
        setMenu(<AddNewMenu />);
        break;
      case ActionMenuMenuType.DIRECTORY:
        setMenu(<DirectoryActionsMenu />);
        break;
      default:
        break;
    }
  }, [actionMenuState.menuType]);

  return (
    <div
      className={`${
        actionMenuState.isActive ? "" : "hidden"
      } absolute border bg-white shadow-lg z-10`}
      style={{
        left: actionMenuState.posX + 10,
        top: actionMenuState.posY,
        width: actionMenuState.menuWidth,
        height: "auto",
      }}
    >
      {menu}
    </div>
  );
};

interface IActionMenuLineItemProps {
  text: string;
  icon: IconProp;
}
export const ActionMenuLineItem = ({
  text,
  icon,
}: IActionMenuLineItemProps) => {
  return (
    <li
      className={`text-xs px-6 py-2 hover:bg-gray-100 flex items-center text-gray-900 cursor-pointer`}
    >
      <FontAwesomeIcon icon={icon} className={`mr-4`} />
      <span>{text}</span>
    </li>
  );
};

export default ActionMenu;
