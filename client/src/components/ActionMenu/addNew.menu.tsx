import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faFolder } from "@fortawesome/free-regular-svg-icons";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { ActionMenuLineItem } from ".";

const AddNewMenu = () => {
  return (
    <ul className={`my-2`}>
      <ActionMenuLineItem text="Create" icon={faPencil as IconProp} />
      <ActionMenuLineItem text="Upload" icon={faFolder as IconProp} />
    </ul>
  );
};

export default AddNewMenu;
