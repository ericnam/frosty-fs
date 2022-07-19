import { IFileModel } from "@data/files/model";
import { useAppDispatch, useAppSelector } from "@hooks/redux.hooks";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { ISetFilesPayload } from "reducers/files.reducer";
import {
  getCurrentDirectoryId,
  getFilePath,
  setCurrentFile,
  setFiles,
} from "reducers/files.slice";
import FilesRepository from "repositories/files.repository";
import FilePath from "./components/filePath";
import DirectoryGrid from "./components/directoryGrid";

const DirectoryView = (): JSX.Element => {
  // React router file-type/:id
  let { id } = useParams();

  // Redux
  const dispatch = useAppDispatch();
  const currentDirectoryId = useAppSelector(getCurrentDirectoryId);
  const filePath = useAppSelector(getFilePath);

  // Queries
  const qGetFiles = FilesRepository.GetFiles({
    onLoad: (data: IFileModel[]) => {
      dispatch(setFiles({ files: data } as ISetFilesPayload));
    },
  });
  // const qGetDirectoryContent = FilesRepository.GetDirectoryContent();

  useEffect(() => {
    if (currentDirectoryId !== id && !!id) {
      dispatch(setCurrentFile({ fileId: id }));
    }
  }, [id]);

  useEffect(() => {
    qGetFiles.api.get({ ids: [currentDirectoryId] });
    // qGetDirectoryContent.api.get({ directoryId: currentDirectoryId });
  }, [currentDirectoryId]);

  return (
    <div className={`w-full h-100 pt-4`}>
      <div className={`flex flex-col`}>
        <FilePath filePath={filePath as IFileModel[]} />
        <DirectoryGrid
          currentDirectoryId={currentDirectoryId}
          // currentDirectoryId={currentDirectoryId}
          // directoryContent={qGetDirectoryContent.data}
        />
      </div>
    </div>
  );
};

export default DirectoryView;
