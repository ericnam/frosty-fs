import { IFileModel } from "@data/files/model";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faFile, faFolder, faStar } from "@fortawesome/free-regular-svg-icons";
import {
  faAngleRight,
  faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppDispatch } from "@hooks/redux.hooks";
import { Link } from "react-router-dom";
import { ISetCurrentFilePayload } from "reducers/files.reducer";
import { setCurrentFile } from "reducers/files.slice";

interface FilePathProps {
  filePath: IFileModel[];
}
const FilePath = ({ filePath }: FilePathProps): JSX.Element => {
  const dispatch = useAppDispatch();

  return (
    <div className={`flex flex-row items-center mt-4`}>
      <Link
        to="/my-files"
        onClick={() => {
          dispatch(
            setCurrentFile({ fileId: "root" } as ISetCurrentFilePayload)
          );
        }}
      >
        <div
          className={`py-3 px-2 bg-violet-100 hover:bg-violet-200 rounded-lg text-violet-600 flex items-center`}
        >
          <FontAwesomeIcon icon={faFolder as IconProp} />
          <span className="ml-2 text-xs font-semibold">My Files</span>
        </div>
      </Link>
      {filePath.length === 0 ? (
        <FontAwesomeIcon
          className="mx-4 text-gray-500"
          icon={faAngleRight as IconProp}
        />
      ) : null}
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
        <div className="flex items-center">
          {/* <FontAwesomeIcon
            className={`text-gray-500 p-2 ml-4 hover:text-amber-300 cursor-pointer`}
            icon={faStar as IconProp}
          /> */}
          <FontAwesomeIcon
            className={`bg-gray-100 hover:bg-gray-200 text-gray-500 p-2 ml-2 rounded-full cursor-pointer`}
            icon={faEllipsisVertical as IconProp}
          />
        </div>
      ) : null}
    </div>
  );
};

export default FilePath;
