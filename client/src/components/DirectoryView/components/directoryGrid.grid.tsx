import { AgGridReact } from "ag-grid-react";
import { useRef, useCallback, useEffect } from "react";
import { ColDef, RowClickedEvent } from "ag-grid-community";
import { useAppDispatch, useAppSelector } from "@hooks/redux.hooks";
import {
  getCurrentDirectoryId,
  setCurrentFile,
  setFiles,
} from "reducers/files.slice";
import { ISetCurrentFilePayload, ISetFilesPayload } from "reducers/files.reducer";
import FilesRepository from "repositories/files.repository";

const DirectoryGridColumnDefinitions: ColDef[] = [
  { field: "fileId", hide: true },
  { field: "title", headerName: "Name", width: 600 },
  { field: "fileSize", headerName: "File Size" },
  { field: "type", headerName: "Type" },
  { field: "lastUpdated", headerName: "Last Updated" },
];

export const DirectoryGridObj = ({ data }: any) => {
  const dispatch = useAppDispatch();
  const currentDirectoryId = useAppSelector(getCurrentDirectoryId);
  const gridRef = useRef<AgGridReact<any>>();

  useEffect(() => {}, [currentDirectoryId]);

  const qGetFiles = FilesRepository.GetFiles({
    onLoad: (data: any) => {
      dispatch(setFiles({ files: data } as ISetFilesPayload));
    },
  });

  const onGridReady = useCallback(() => {
    if (!!gridRef.current) {
      gridRef.current.api.sizeColumnsToFit();
    }
  }, []);

  const onRowClicked = useCallback((event: RowClickedEvent) => {
    console.log(event);
  }, []);

  const onRowDoubleClicked = useCallback((event: RowClickedEvent) => {
    let fileId = event.data.fileId;
    qGetFiles.api.get({ ids: [fileId] });
    dispatch(setCurrentFile({ fileId: fileId } as ISetCurrentFilePayload));

    console.log(event);
  }, []);

  return (
    <div className="ag-theme-material flex-1">
      <AgGridReact
        ref={gridRef as any}
        columnDefs={DirectoryGridColumnDefinitions}
        rowData={data}
        onGridReady={onGridReady}
        onRowClicked={onRowClicked}
        onRowDoubleClicked={onRowDoubleClicked}
      ></AgGridReact>
    </div>
  );
};
