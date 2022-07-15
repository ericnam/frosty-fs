import { useState, useEffect } from "react";
import { NavigationModel } from "@data/navigation/model";
// import { FileSystemModel } from "@data/filesystem/model";
import NavigationRepository from "repositories/navigation.repository";
// import FilesRepository from "repositories/files.repository";

const NavigationViewModel = () => {
  const [navigationData, setNavigationData] = useState<NavigationModel[]>();
  // const [fileSystemData, setFileSystemData] = useState<FileSystemModel[]>();

  // Gql queries
  const qGetNavigation = NavigationRepository.GetNavigation({
    onLoad: (data: any) => {
      setNavigationData(
        data.map((gqlObj: any) => {
          return new NavigationModel(gqlObj);
        })
      );
    },
  });
  // const qGetDirectories = FilesRepository.GetDirectories({
  //   onLoad: (data: any) => {
  //     setFileSystemData(
  //       data.map((gqlObj: any) => {
  //         return new FileSystemModel(gqlObj);
  //       })
  //     );
  //   },
  // });

  /**
   * API
   */
  function getDirectory(directoryId: string) {
    return directoryId;
  }

  // Load Initial Data
  useEffect(() => {
    qGetNavigation.api.get();
    // qGetDirectories.api.get({ directoryId: "root" });
  }, []);

  return {
    data: {
      navigation: { loading: false, data: navigationData },
      // fileSystem: { loading: false, data: fileSystemData },
    },
    api: { getDirectory },
  };
};

export default NavigationViewModel;
