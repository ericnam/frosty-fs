import { AgGridReact } from "ag-grid-react";
import { useState } from "react";
import { ColDef } from "ag-grid-community";

export const DirectoryGridObj = ({ data }: any) => {
  const [columnDefs] = useState<ColDef[]>([
    { field: "fileId", hide: true },
    { field: "title", headerName: "Name" },
    { field: "fileSize", headerName: "File Size" },
    { field: "type", headerName: "Type" },
    { field: "lastUpdated", headerName: "Last Updated" },
  ]);

  return (
    <div className="ag-theme-material flex-1">
      <AgGridReact columnDefs={columnDefs} rowData={data}></AgGridReact>
    </div>
  );
};