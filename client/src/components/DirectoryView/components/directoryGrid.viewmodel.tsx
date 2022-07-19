import { IFileModel } from "@data/files/model";
import { useEffect, useState } from "react";
import FilesRepository from "repositories/files.repository";
import { DirectoryGridInstance } from "./directoryGrid.grid";

interface IDirectoryGridViewItem {
  Name: string;
  FileSize: string;
  Type: string;
  LastUpdated: string;
  FileID: string;
}

const DirectoryGridViewModel = (currentDirectoryId: string) => {
  // GridJS Declaration
  const gridInstance = DirectoryGridInstance.getInstance();

  const [gridData, setGridData] = useState<IDirectoryGridViewItem[]>();

  const qGetDirectoryContent = FilesRepository.GetDirectoryContent({
    onLoad: (data: IFileModel[]) => {
      let gridViewData = data.map((d) => {
        return {
          Name: d.title,
          Type: d.type,
          FileID: d.fileId,
        } as IDirectoryGridViewItem;
      });
      setGridData(gridViewData);
    },
  });

  // Update Dir Content on Current Dir change
  useEffect(() => {
    if (!!currentDirectoryId) {
      qGetDirectoryContent.api.get({ directoryId: currentDirectoryId });
    }
  }, [currentDirectoryId]);

  return {
    data: gridData,
    loading: qGetDirectoryContent.loading,
    grid: gridInstance,
  };
};

export default DirectoryGridViewModel;
