import { IFileModel } from "@data/files/model";
import { useAppDispatch, useAppSelector } from "@hooks/redux.hooks";
import { useEffect, useState } from "react";
import {
  ISetFilesPayload,
  ISetSubDirectoryPayload,
} from "reducers/files.reducer";
import {
  setFiles,
  setCurrentFile,
  setSubDirectory,
  getCurrentDirectoryId,
} from "reducers/files.slice";
import FilesRepository from "repositories/files.repository";
import { useNavigate, useParams } from "react-router-dom";

const DirectoryGridViewModel = () => {
  // React router file-type/:id
  let { id } = useParams();
  const navigate = useNavigate();

  // Redux
  const dispatch = useAppDispatch();
  const [gridData, setGridData] = useState<IFileModel[]>();
  const currentDirectoryId = useAppSelector(getCurrentDirectoryId);

  const qGetDirectoryContent = FilesRepository.GetDirectoryContent({
    onLoad: (data: IFileModel[]) => {
      setGridData(data);
      dispatch(setFiles({ files: data } as ISetFilesPayload));
      dispatch(
        setSubDirectory({
          fileId: currentDirectoryId,
          subDirectories: data.filter((file) => file.type === "directory"),
        } as ISetSubDirectoryPayload)
      );
    },
  });

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

  // Update Dir Content on Current Dir change
  useEffect(() => {
    if (!!currentDirectoryId) {
      console.log("not favorites");
      qGetDirectoryContent.api.get({ directoryId: currentDirectoryId });
    }
  }, [currentDirectoryId]);

  return {
    data: gridData,
    loading: qGetDirectoryContent.loading,
  };
};

export default DirectoryGridViewModel;
