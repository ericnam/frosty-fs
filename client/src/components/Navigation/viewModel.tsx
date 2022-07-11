import { useLazyQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import { GET_NAVIGATION } from "@data/navigation/query";
import { GET_DIRECTORIES } from "@data/filesystem/query";
import { NavigationModel } from "@data/navigation/model";
import { FileSystemModel } from "@data/filesystem/model";

const NavigationViewModel = () => {
  const [getNavigation, navigation] = useLazyQuery(GET_NAVIGATION);
  const [getFileSystem, fileSystem] = useLazyQuery(GET_DIRECTORIES);

  const [navigationData, setNavigationData] = useState<NavigationModel[]>();
  const [fileSystemData, setFileSystemData] = useState<FileSystemModel[]>();

  /**
   * API
   */
  function getDirectory(directoryId: string) {
    return directoryId;
  }

  // Load Initial Data
  useEffect(() => {
    getNavigation();
    getFileSystem({ variables: { directoryId: "root" } });
  }, []);

  // Navigation Data
  useEffect(() => {
    if (!!!navigation.loading) {
      if (!!navigation.data && !!navigation.data.navigation) {
        setNavigationData(
          navigation.data.navigation.map((gqlObj: any) => {
            return new NavigationModel(gqlObj);
          })
        );
      }
    }
  }, [navigation.loading]);

  // File System Data
  useEffect(() => {
    if (!!!fileSystem.loading) {
      if (!!fileSystem.data && !!fileSystem.data.directories) {
        setFileSystemData(
          fileSystem.data.directories.map((gqlObj: any) => {
            return new FileSystemModel(gqlObj);
          })
        );
      }
    }
  }, [fileSystem.loading]);

  return {
    data: {
      navigation: { ...navigation, data: navigationData },
      fileSystem: { ...fileSystem, data: fileSystemData },
    },
    api: { getDirectory },
  };
};

export default NavigationViewModel;
