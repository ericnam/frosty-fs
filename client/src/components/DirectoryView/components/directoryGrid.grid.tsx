import { Grid } from "gridjs-react";
import { html } from "gridjs";
import { SortConfig } from "gridjs/dist/src/view/plugin/sort/sort";
import { RowSelection } from "gridjs-selection";

const folderIcon = `<svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="folder" class="svg-inline--fa fa-folder " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M447.1 96h-172.1L226.7 50.75C214.7 38.74 198.5 32 181.5 32H63.1c-35.35 0-64 28.66-64 64v320c0 35.34 28.65 64 64 64h384c35.35 0 64-28.66 64-64V160C511.1 124.7 483.3 96 447.1 96zM463.1 416c0 8.824-7.178 16-16 16h-384c-8.822 0-16-7.176-16-16V96c0-8.824 7.178-16 16-16h117.5c4.273 0 8.293 1.664 11.31 4.688L255.1 144h192c8.822 0 16 7.176 16 16V416z"></path></svg>`;
const fileIcon = `<svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="file" class="svg-inline--fa fa-file " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M0 64C0 28.65 28.65 0 64 0H229.5C246.5 0 262.7 6.743 274.7 18.75L365.3 109.3C377.3 121.3 384 137.5 384 154.5V448C384 483.3 355.3 512 320 512H64C28.65 512 0 483.3 0 448V64zM336 448V160H256C238.3 160 224 145.7 224 128V48H64C55.16 48 48 55.16 48 64V448C48 456.8 55.16 464 64 464H320C328.8 464 336 456.8 336 448z"></path></svg>`;

export enum EDirectoryGridColumns {
  FileID = 0,
  Type = 1,
  Name = 2,
  FileSize = 3,
  LastUpdated = 4,
}

const directoryGridColumns = [
  {
    id: "FileID",
    hidden: true,
  },
  {
    id: "Type",
    hidden: true,
  },
  {
    id: "myCheckbox",
    name: "Select",
    plugin: {
      // install the RowSelection plugin
      component: RowSelection,
      // RowSelection config
      props: {
        id: (row: any) => row.cell(EDirectoryGridColumns.FileID).data,
      },
    },
  },
  {
    id: "Name",
    name: "Name",
    formatter: (cell: any, row: any) => {
      let icon = "";
      let type = row.cells[EDirectoryGridColumns.Type].data as string;
      if (type === "directory") {
        icon = folderIcon;
      } else if (type === "file") {
        icon = fileIcon;
      }
      return html(
        `<div class="flex"><span class="mr-2 text-violet-500">${icon}</span>${cell}</div>`
      );
    },
    sort: { enabled: true } as SortConfig,
  },
  {
    id: "FileSize",
    name: "File size",
  },
  {
    id: "LastUpdated",
    name: "Lasted updated",
  },
];

export const DirectoryGridInstance = new Grid({
  sort: true,
  columns: directoryGridColumns,
  data: [],
  className: {
    th: "font-semibold text-xs py-3 px-3 bg-gray-50",
    // tr: "hover:bg-violet-100",
    td: "p-4 text-sm border-b",
    table: "h-full",
  },
});
