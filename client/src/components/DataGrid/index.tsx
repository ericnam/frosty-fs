import { AgGridReact } from "ag-grid-react";
import { useRef, useCallback } from "react";
import DataGridViewModel, {
  DirectoryGridColumnDefinitions,
  DirectoryGridDefaultColumnDef,
} from "./viewModel";

export const DirectoryGridObj = ({ data }: any) => {
  const { _api } = DataGridViewModel();
  const gridRef = useRef<AgGridReact<any>>();

  const onGridReady = useCallback(() => {
    if (!!gridRef.current) {
      gridRef.current.api.sizeColumnsToFit();
    }
  }, []);

  // const onRowClicked = useCallback((event: RowClickedEvent) => {
  //   console.log(event);
  // }, []);

  const onRowSelected = () =>
    // event: RowSelectedEvent
    {
      if (!!gridRef.current) {
        // console.log(gridRef.current.api.getSelectedRows());
      }
    };

  // const onRowDragMove = (event: RowDragEvent<any>) => {
  //   console.log(event);
  // };

  return (
    <div className="ag-theme-material flex-1">
      <div style={{ width: "100%", height: "100%" }}>
        <AgGridReact
          ref={gridRef as any}
          defaultColDef={DirectoryGridDefaultColumnDef}
          columnDefs={DirectoryGridColumnDefinitions}
          rowData={data}
          onGridReady={onGridReady}
          // onRowClicked={onRowClicked}
          onRowDoubleClicked={_api.onRowDoubleClicked}
          rowSelection={"multiple"}
          headerHeight={30}
          onRowSelected={onRowSelected}
          // rowDragEntireRow={true}
          // onRowDragMove={onRowDragMove}
        ></AgGridReact>
      </div>
    </div>
  );
};
