import { IFileModel } from "@data/files/model";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faFile, faFolder } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppDispatch } from "@hooks/redux.hooks";
import { ColDef, RowClickedEvent } from "ag-grid-community";
import { useState } from "react";
import FileService from "services/files.service";

const DataGridViewModel = () => {
  // Redux
  const dispatch = useAppDispatch();

  // Services
  const [fileService] = useState(new FileService({}, dispatch));

  // Event Handlers
  function onRowDoubleClicked(event: RowClickedEvent) {
    let { fileId, type } = event.data as IFileModel;
    if (type === "directory") {
      fileService.GetFilesByFileIds({ ids: [fileId] });
      fileService.SetActiveDirectoryFileId(fileId);
    }
  }

  return {
    _api: { onRowDoubleClicked },
  };
};

export default DataGridViewModel;

export const DirectoryGridTitleCellRenderer = (props: any) => {
  let icon = null;

  switch (props.data.type) {
    case "directory":
      icon = faFolder;
      break;
    case "file":
      icon = faFile;
      break;
    default:
      break;
  }
  return (
    <span className={`flex items-center`}>
      <span
        className={`flex w-8 h-8 bg-violet-200 items-center justify-center rounded-full mr-4`}
      >
        <FontAwesomeIcon
          icon={icon as IconProp}
          className={`text-violet-600`}
        />
      </span>
      <span>{props.value}</span>
    </span>
  );
};

export const DirectoryGridDefaultColumnDef: ColDef = {
  resizable: true,
  sortable: true,
};
export const DirectoryGridColumnDefinitions: ColDef[] = [
  {
    checkboxSelection: true,
    headerCheckboxSelection: true,
    headerCheckboxSelectionFilteredOnly: true,
    width: 57,
    resizable: false,
  },
  { field: "fileId", hide: true },
  {
    field: "title",
    headerName: "Name",
    width: 600,
    cellRenderer: DirectoryGridTitleCellRenderer,
  },
  { field: "fileSize", headerName: "File Size" },
  { field: "type", headerName: "Type" },
  { field: "lastUpdated", headerName: "Last Updated" },
];
