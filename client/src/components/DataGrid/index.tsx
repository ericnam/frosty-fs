// import { AgGridReact } from "ag-grid-react";
// import { useRef, useCallback } from "react";
// import DataGridViewModel, {
//   DirectoryGridColumnDefinitions,
//   DirectoryGridDefaultColumnDef,
// } from "./viewModel";

// export const DirectoryGridObj = ({ data }: any) => {
//   const gridRef = useRef<AgGridReact<any>>();
//   const { _api } = DataGridViewModel({ gridRef });

//   const onGridReady = useCallback(() => {
//     if (!!gridRef.current) {
//       gridRef.current.api.sizeColumnsToFit();
//     }
//   }, []);

//   return (
//     <div className="ag-theme-material flex-1">
//       <div style={{ width: "100%", height: "100%" }}>
//         <AgGridReact
//           ref={gridRef as any}
//           defaultColDef={DirectoryGridDefaultColumnDef}
//           columnDefs={DirectoryGridColumnDefinitions}
//           rowData={data}
//           onGridReady={onGridReady}
//           // onRowClicked={onRowClicked}
//           onRowDoubleClicked={_api.onRowDoubleClicked}
//           rowSelection={"multiple"}
//           headerHeight={30}
//           onRowSelected={_api.onRowSelected}
//           // rowDragEntireRow={true}
//           // onRowDragMove={onRowDragMove}
//         ></AgGridReact>
//       </div>
//     </div>
//   );
// };
