import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faStar, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import {
  faFolderTree,
  faPencil,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef } from "react";
import DirectoryToolbarViewModel from "./viewModel";

interface IDirectoryToolbarProps {
  addNew?: boolean;
  rename?: boolean;
  favorite?: boolean;
  delete?: boolean;
  move?: boolean;
}
const DirectoryToolbar = (props: IDirectoryToolbarProps): JSX.Element => {
  const addNewButtonRef = useRef<any>(null);
  const viewModel = DirectoryToolbarViewModel(addNewButtonRef)();

  return (
    <div className={`float-left text-xs bg-slate-100 rounded-xl h-12 p-1 pr-2`}>
      {DirectoryToolbarPropsNullCheck(
        <button
          ref={addNewButtonRef}
          onClick={viewModel.api.addNewOnClick}
          className={`float-left px-3 h-10 bg-white box-border text-gray-700 rounded-lg hover:bg-slate-500 hover:text-slate-50`}
        >
          <FontAwesomeIcon icon={faPlus as IconProp} className={``} />
          <span className={`ml-2 font-semibold`}>Add New</span>
        </button>,
        props.addNew
      )}
      <ToolbarDivider />
      {DirectoryToolbarPropsNullCheck(
        <IconButton title="Rename" icon={faPencil as IconProp} first={true} />,
        props.rename
      )}
      {DirectoryToolbarPropsNullCheck(
        <IconButton title="Move to" icon={faFolderTree as IconProp} />,
        props.move
      )}
      {DirectoryToolbarPropsNullCheck(
        <IconButton title="Add to favorites" icon={faStar as IconProp} />,
        props.favorite
      )}
      {DirectoryToolbarPropsNullCheck(
        <IconButton title="Delete" icon={faTrashCan as IconProp} last={true} />,
        props.delete
      )}
    </div>
  );
};

interface IIconButton {
  title: string;
  icon: IconProp;
  first?: boolean;
  last?: boolean;
}
const IconButton = ({ title, icon, last, first }: IIconButton): JSX.Element => {
  return (
    <button
      className={`text-gray-700 h-10 w-10 hover:bg-slate-200 rounded-full mx-2 ${
        !!last ? "ml-2 mr-0" : ""
      } ${!!first ? "mr-2 ml-0" : ""}`}
      title={title}
    >
      <FontAwesomeIcon icon={icon as IconProp} />
    </button>
  );
};

const ToolbarDivider = () => {
  return <span className="float-left h-6 my-2 mx-4 border-l"></span>;
};

const DirectoryToolbarPropsNullCheck = (
  toolbarElement: JSX.Element,
  param?: boolean
) => {
  if (!!param || param === undefined) {
    return toolbarElement;
  } else {
    return null;
  }
};

export default DirectoryToolbar;
