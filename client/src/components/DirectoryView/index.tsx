import { useAppSelector } from "@hooks/redux.hooks";
import { useEffect } from "react";
import { getCurrentDirectory } from "reducers/fileSystem.reducer";
import FilesRepository from "repositories/files.repository";

const DirectoryView = (): JSX.Element => {
  const currentDirectory = useAppSelector(getCurrentDirectory);
  const qGetDirectoryContent = FilesRepository.GetDirectoryContent();

  useEffect(() => {
    qGetDirectoryContent.api.get({ directoryId: currentDirectory });
  }, [currentDirectory]);

  return (
    <div className={`w-full h-100 bg-gray-50`}>
      <div className={`m-10`}>
        <h1 className={`text-2xl font-semibold`}>{currentDirectory}</h1>
      </div>
    </div>
  );
};

export default DirectoryView;
