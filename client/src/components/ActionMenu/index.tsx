import { useContext } from "react";
import {
  ActionMenuStore,
  IActionMenuStore,
} from "contexts/actionMenu.provider";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import {
  faFolder,
  faStar,
  faTrashCan,
} from "@fortawesome/free-regular-svg-icons";

const ActionMenu = () => {
  const { actionMenuState } = useContext<IActionMenuStore>(ActionMenuStore);
  
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
      <ul className={`my-2`}>
        <ActionMenuLineItem text="Rename" icon={faPencil as IconProp} />
        <ActionMenuLineItem text="Move to" icon={faFolder as IconProp} />
        <ActionMenuLineItem text="Add to favorites" icon={faStar as IconProp} />
        <ActionMenuLineItem text="Delete" icon={faTrashCan as IconProp} />
      </ul>
    </div>
  );
};

interface IActionMenuLineItemProps {
  text: string;
  icon: IconProp;
}
const ActionMenuLineItem = ({ text, icon }: IActionMenuLineItemProps) => {
  return (
    <li
      className={`text-sm px-6 py-2 hover:bg-gray-100 flex items-center text-gray-900 cursor-pointer`}
    >
      <FontAwesomeIcon icon={icon} className={`mr-4`} />
      <span>{text}</span>
    </li>
  );
};

export default ActionMenu;
