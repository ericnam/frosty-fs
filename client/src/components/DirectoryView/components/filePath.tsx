import { IFileModel } from "@data/files/model";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faFolder } from "@fortawesome/free-regular-svg-icons";
import {
  faAngleRight,
  faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppDispatch } from "@hooks/redux.hooks";
import {
  ActionMenuActionType,
  ActionMenuMenuType,
  ActionMenuStore,
  IActionMenuActionPayload,
  IActionMenuStore,
} from "contexts/actionMenu.provider";
import { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { ISetCurrentFilePayload } from "reducers/files.reducer";
import { setCurrentFile } from "reducers/files.slice";

interface FilePathProps {
  filePath: IFileModel[];
}
const FilePath = ({ filePath }: FilePathProps): JSX.Element => {
  const dispatch = useAppDispatch();

  return (
    <div className={`flex flex-row flex-1 items-center`}>
      <Link
        to="/my-files"
        onClick={() => {
          dispatch(
            setCurrentFile({ fileId: "root" } as ISetCurrentFilePayload)
          );
        }}
      >
        <span className={`flex flex-row`}>
          <div
            className={`py-3 pl-3 rounded-lg text-violet-500 flex items-center justify-center`}
          >
            <FontAwesomeIcon className={`mr-2`} icon={faFolder as IconProp} />
            <FontAwesomeIcon
              className="mx-4 text-gray-500"
              icon={faAngleRight as IconProp}
            />
          </div>
          <div
            className={`rounded-lg p-2 hover:bg-gray-100 ${
              filePath.length === 0 ? "font-semibold" : ""
            }`}
          >
            My Files
          </div>
        </span>
      </Link>
      {filePath.map((fp, i) => (
        <span key={i} className={`flex flex-row items-center`}>
          <FontAwesomeIcon
            className="mx-4 text-gray-500"
            icon={faAngleRight as IconProp}
          />
          <FilePathItem filePath={fp} last={i === filePath.length - 1} />
        </span>
      ))}
    </div>
  );
};

interface FilePathItemProps {
  filePath: IFileModel;
  last: boolean;
}
const FilePathItem = ({ filePath, last }: FilePathItemProps) => {
  const { dispatchActionMenuState } =
    useContext<IActionMenuStore>(ActionMenuStore);
  const actionIconRef = useRef<any>(null);

  function filePathMenuOnClick() {
    if (actionIconRef.current) {
      const { x, y } = actionIconRef.current.getBoundingClientRect();

      dispatchActionMenuState({
        type: ActionMenuActionType.TOGGLE,
        payload: {
          x,
          y,
          elementWidth: actionIconRef.current.clientWidth,
          menuType: ActionMenuMenuType.DIRECTORY,
        } as IActionMenuActionPayload,
      });
    }
  }

  return (
    <div className={`flex flex-row items-center`}>
      <Link to={`/my-files/${filePath.fileId}`}>
        <div
          className={`rounded-lg p-2 hover:bg-gray-100 ${
            last ? "font-semibold" : ""
          }`}
        >
          {filePath.title}
        </div>
      </Link>
      {last ? (
        <div ref={actionIconRef} className="flex items-center">
          <FontAwesomeIcon
            className={`bg-gray-100 hover:bg-gray-200 text-gray-500 p-2 ml-2 rounded-full cursor-pointer`}
            icon={faEllipsisVertical as IconProp}
            onClick={filePathMenuOnClick}
          />
        </div>
      ) : null}
    </div>
  );
};

export default FilePath;
