import { IFileModel } from "@data/files/model";
import { useAppDispatch, useAppSelector } from "@hooks/redux.hooks";
import { useEffect, useState } from "react";
import {
  getActiveDirectoryFileId,
  getActiveDirectoryFilePath,
} from "reducers/files.slice";
import FilesRepository from "repositories/files.repository";
import { useNavigate, useParams } from "react-router-dom";
import FileService from "services/files.service";

const DirectoryGridViewModel = () => {
  // React router file-type/:id
  let { id } = useParams();
  const navigate = useNavigate();

  // Redux
  const dispatch = useAppDispatch();
  const [gridData, setGridData] = useState<IFileModel[]>();
  const activeDirectoryFileId = useAppSelector(getActiveDirectoryFileId);
  const activeDirectoryFilePath = useAppSelector(getActiveDirectoryFilePath);

  // States
  const [gridLoading, setGridLoading] = useState(true);

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
    if (activeDirectoryFileId !== id) {
      fileService.GetSubdirectoriesByFileId({ fileId: !!id ? id : "root" });
    }
  }, [id]);

  useEffect(() => {
    if (id !== activeDirectoryFileId && activeDirectoryFileId !== "root") {
      navigate(`/my-files/${activeDirectoryFileId}`);
      return;
    }

    if (!!activeDirectoryFileId) {
      fileService.GetFilesByFileIds({ ids: [activeDirectoryFileId] });
      fileService
        .GetChildrenFilesByFileId({ fileId: activeDirectoryFileId })
        ?.then((data: IFileModel[]) => {
          setGridData(data);
          setGridLoading(false);
        });
    }
  }, [activeDirectoryFileId]);

  return {
    _data: {
      grid: { obj: gridData, loading: gridLoading },
      filePath: { obj: activeDirectoryFilePath },
    },
  };
};

export default DirectoryGridViewModel;
