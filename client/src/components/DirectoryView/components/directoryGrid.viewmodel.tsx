import { IFileModel } from "@data/files/model";
import { useAppDispatch, useAppSelector } from "@hooks/redux.hooks";
import { useEffect, useState } from "react";
// import {
//   ISetFilesPayload,
//   ISetSubDirectoryPayload,
// } from "reducers/files.reducer";
import {
  // setFiles,
  setCurrentFile,
  // setSubDirectory,
  getCurrentDirectoryId,
} from "reducers/files.slice";
import FilesRepository from "repositories/files.repository";
import { useNavigate, useParams } from "react-router-dom";
import FileService from "services/files.services";

const DirectoryGridViewModel = () => {
  // React router file-type/:id
  let { id } = useParams();
  const navigate = useNavigate();

  // Redux
  const dispatch = useAppDispatch();
  const [gridData, setGridData] = useState<IFileModel[]>();
  const currentDirectoryId = useAppSelector(getCurrentDirectoryId);

  // Queries
  const _GetFilesByFileIds = FilesRepository.GetFilesByFileIds();
  const _GetChildrenFilesByParentFileId =
    FilesRepository.GetChildrenFilesByParentFileId();

  // Services
  const [fileService] = useState(
    new FileService(
      { _GetFilesByFileIds, _GetChildrenFilesByParentFileId },
      dispatch
    )
  );

  useEffect(() => {
    if (currentDirectoryId !== id) {
      dispatch(setCurrentFile({ fileId: !!id ? id : "root" }));
    }
  }, [id]);

  useEffect(() => {
    if (!!currentDirectoryId) {
      fileService.GetFilesByFileIds({ ids: [currentDirectoryId] });
      fileService
        .GetChildrenFilesByFileId({ fileId: currentDirectoryId })
        ?.then((data: IFileModel[]) => {
          setGridData(data);
        });
    }

    if (id !== currentDirectoryId && currentDirectoryId !== "root") {
      navigate(`/my-files/${currentDirectoryId}`);
    }
  }, [currentDirectoryId]);

  return {
    data: gridData,
    // loading: qGetDirectoryContent.loading,
  };
};

export default DirectoryGridViewModel;
