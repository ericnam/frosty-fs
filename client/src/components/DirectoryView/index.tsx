import { IFileModel } from "@data/files/model";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faFolder, faStar } from "@fortawesome/free-regular-svg-icons";
import {
  faAngleRight,
  faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppDispatch, useAppSelector } from "@hooks/redux.hooks";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ISetFilesPayload } from "reducers/files.reducer";
import {
  getCurrentDirectoryId,
  getFilePath,
  setCurrentFile,
  setFiles,
} from "reducers/files.slice";
import FilesRepository from "repositories/files.repository";

const DirectoryView = (): JSX.Element => {
  let { id } = useParams();
  const dispatch = useAppDispatch();

  const currentDirectoryId = useAppSelector(getCurrentDirectoryId);
  const filePath = useAppSelector(getFilePath);

  const qGetFiles = FilesRepository.GetFiles({
    onLoad: (data: IFileModel[]) => {
      dispatch(setFiles({ files: data } as ISetFilesPayload));
    },
  });
  const qGetDirectoryContent = FilesRepository.GetDirectoryContent();

  useEffect(() => {
    if (currentDirectoryId !== id) {
      dispatch(setCurrentFile({ fileId: id }));
    }
  }, [id]);

  useEffect(() => {
    qGetFiles.api.get({ ids: [currentDirectoryId] });
    qGetDirectoryContent.api.get({ directoryId: currentDirectoryId });
  }, [currentDirectoryId]);

  return (
    <div className={`w-full h-100 pt-4`}>
      <div className={``}>
        <FilePath filePath={filePath as IFileModel[]} />
      </div>
    </div>
  );
};

interface FilePathProps {
  filePath: IFileModel[];
}
const FilePath = ({ filePath }: FilePathProps): JSX.Element => {
  return (
    <div className={`flex flex-row items-center`}>
      <div className={`py-2 px-2 bg-violet-100 rounded-lg text-violet-600`}>
        <FontAwesomeIcon icon={faFolder as IconProp} />
      </div>
      {filePath.length === 0 ? (
        <FontAwesomeIcon
          className="mx-4  text-gray-500"
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
        <div>
          <FontAwesomeIcon
            className={`text-gray-500 p-2 ml-4 hover:text-amber-300 cursor-pointer`}
            icon={faStar as IconProp}
          />
          <FontAwesomeIcon
            className={`bg-gray-100 hover:bg-gray-200 text-gray-500 p-2 ml-2 rounded-full cursor-pointer`}
            icon={faEllipsisVertical as IconProp}
          />
        </div>
      ) : null}
    </div>
  );
};

export default DirectoryView;
