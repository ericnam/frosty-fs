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
import { useNavigate } from "react-router-dom";
import DirectoryToolbar from "./components/directoryToolbar";

const DirectoryView = (): JSX.Element => {
  // React router file-type/:id
  let { id } = useParams();
  const navigate = useNavigate();

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

  useEffect(() => {
    if (currentDirectoryId !== id) {
      dispatch(setCurrentFile({ fileId: !!id ? id : "root" }));
    }
  }, [id]);

  useEffect(() => {
    qGetFiles.api.get({ ids: [currentDirectoryId] });

    if (id !== currentDirectoryId && currentDirectoryId !== "root") {
      navigate(`/my-files/${currentDirectoryId}`);
    }
  }, [currentDirectoryId]);

  return (
    <div className={`w-full h-full flex flex-col`}>
      <div className={`flex flex-row mt-8`}>
        <FilePath filePath={filePath as IFileModel[]} />
      </div>
      <div className={`mb-8 mt-3`}>
        <DirectoryToolbar />
      </div>
      <DirectoryGrid currentDirectoryId={currentDirectoryId} />
    </div>
  );
};

export default DirectoryView;
