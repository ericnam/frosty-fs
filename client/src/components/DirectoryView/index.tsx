import { IFileModel } from "@data/files/model";
import { useAppDispatch, useAppSelector } from "@hooks/redux.hooks";
import { useEffect } from "react";
import { ISetFilesPayload } from "reducers/files.reducer";
import {
  getCurrentDirectoryId,
  // setFile,
  // getCurrentFisle,
  getFilePath,
  // getFiles,
  setFiles,
} from "reducers/files.slice";
import FilesRepository from "repositories/files.repository";

const DirectoryView = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const currentDirectoryId = useAppSelector(getCurrentDirectoryId);
  // const files = useAppSelector(getFiles);
  // const currentFile = useAppSelector(getCurrentFile);
  const filePath = useAppSelector(getFilePath);

  // const [directory, setDirectory] = useState(null);

  const qGetFiles = FilesRepository.GetFiles({
    onLoad: (data: IFileModel[]) => {
      dispatch(setFiles({ files: data } as ISetFilesPayload));
    },
  });
  const qGetDirectoryContent = FilesRepository.GetDirectoryContent();

  useEffect(() => {
    qGetFiles.api.get({ ids: [currentDirectoryId] });
    qGetDirectoryContent.api.get({ directoryId: currentDirectoryId });
  }, [currentDirectoryId]);

  console.log(qGetDirectoryContent.data);

  // useEffect(() => {
  //   setDirectory(currentFile);
  // }, [currentFile]);

  return (
    <div className={`w-full h-100`}>
      <div className={`m-10`}>
        <div>{filePath}</div>
        <h1 className={`text-2xl font-semibold`}>{currentDirectoryId}</h1>
      </div>
    </div>
  );
};

export default DirectoryView;
