import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faFolder,
  faStar,
  faTrashCan,
} from "@fortawesome/free-regular-svg-icons";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { ActionMenuLineItem } from ".";

const DirectoryActionsMenu = () => {
  return (
    <ul className={`my-2`}>
      <ActionMenuLineItem text="Rename" icon={faPencil as IconProp} />
      <ActionMenuLineItem text="Move to" icon={faFolder as IconProp} />
      <ActionMenuLineItem text="Add to favorites" icon={faStar as IconProp} />
      <ActionMenuLineItem text="Delete" icon={faTrashCan as IconProp} />
    </ul>
  );
};

export default DirectoryActionsMenu;
