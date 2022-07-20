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

const DirectoryView = (): JSX.Element => {
  // React router file-type/:id
  let { id } = useParams();
  const navigate = useNavigate();

  // Redux
  const dispatch = useAppDispatch();
  const currentDirectoryId = useAppSelector(getCurrentDirectoryId);
  const filePath = useAppSelector(getFilePath);

  console.log(currentDirectoryId);

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
      <FilePath filePath={filePath as IFileModel[]} />
      <DirectoryGrid currentDirectoryId={currentDirectoryId} />
    </div>
  );
};

export default DirectoryView;
