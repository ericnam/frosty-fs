import { IFileModel } from "@data/files/model";
import { useEffect, useState } from "react";
import FilesRepository from "repositories/files.repository";

const DirectoryGridViewModel = (currentDirectoryId: string) => {
  const [gridData, setGridData] = useState<IFileModel[]>();

  const qGetDirectoryContent = FilesRepository.GetDirectoryContent({
    onLoad: (data: IFileModel[]) => {
      setGridData(data);
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
  };
};

export default DirectoryGridViewModel;
