import { IFileModel } from "@data/files/model";
import { useAppDispatch } from "@hooks/redux.hooks";
import { AgGridReact } from "ag-grid-react";
import { useCallback } from "preact/hooks";
import { MutableRefObject, useEffect, useState } from "react";
import {
  ISetFilesPayload,
  ISetSubDirectoryPayload,
} from "reducers/files.reducer";
import { setFiles, setSubDirectory } from "reducers/files.slice";
import FilesRepository from "repositories/files.repository";

const DirectoryGridViewModel = (currentDirectoryId: string) => {
  const dispatch = useAppDispatch();
  const [gridData, setGridData] = useState<IFileModel[]>();

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

  // Update Dir Content on Current Dir change
  useEffect(() => {
    if (!!currentDirectoryId) {
      qGetDirectoryContent.api.get({ directoryId: currentDirectoryId });
    }
  }, [currentDirectoryId]);

  // Grid functions
  const onGridReady = (gridRef: MutableRefObject<AgGridReact<any>>) => {
    return useCallback(() => {
      if (!!gridRef.current) {
        gridRef.current.api.sizeColumnsToFit();
      }
    }, []);
  };

  return {
    data: gridData,
    loading: qGetDirectoryContent.loading,
    gridApi: { onGridReady },
  };
};

export default DirectoryGridViewModel;
