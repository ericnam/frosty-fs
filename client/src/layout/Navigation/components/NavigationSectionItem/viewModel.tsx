import { INavigationModel, NavigationModel } from "@data/navigation/model";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { useEffect, useState } from "react";
import { useQuery_GetDirectories } from "@queries/fileSystem";

interface INavigationSectionItemViewModel {
  api: { toggleDropdown(): void; itemOnClick(): void };
  state: { dropdownActive: boolean; childDirectoriesLoaded: boolean };
  model: {
    route: string;
    icon: IconProp;
    title: string;
    dropDown: boolean;
    isFileSystem: boolean;
    childDirectories: INavigationModel[] | undefined;
  };
}

const useNavigationSectionItemViewModel = (
  navigationModel: INavigationModel
): INavigationSectionItemViewModel => {
  /**
   * Queries
   */
  const [getDirectories, getDirectoriesResult] = useQuery_GetDirectories();

  /**
   * State
   */
  const [dropdownActive, setDropdownActive] = useState<boolean>(false);
  const [childDirectoriesLoaded, setChildDirectoriesLoaded] =
    useState<boolean>(false);
  const [childDirectories, setChildDirectories] =
    useState<INavigationModel[]>();

  /**
   * API
   */
  function toggleDropdown() {
    setDropdownActive((prevState: boolean) => !prevState);
  }

  function itemOnClick() {
    // setItemActive(!itemActive);
  }

  /**
   * Effects
   */
  useEffect(() => {
    // if nav is a file system, grab child directories
    if (navigationModel.isFileSystem) {
      getDirectories(navigationModel.directoryId);
    }
  }, []);

  useEffect(() => {
    if (!getDirectoriesResult.loading) {
      setChildDirectories(
        getDirectoriesResult.data?.map((directoryObj: any) => {
          return new NavigationModel({
            directoryId: directoryObj.fileId,
            route: directoryObj.fileId,
            title: directoryObj.title,
            isFileSystem: true,
            dropDown: true,
          } as INavigationModel);
        })
      );
      setChildDirectoriesLoaded(true);
    }
  }, [getDirectoriesResult.data]);

  return {
    api: { toggleDropdown, itemOnClick },
    state: { dropdownActive, childDirectoriesLoaded },
    model: {
      route: navigationModel.route,
      icon: navigationModel.icon as IconProp,
      title: navigationModel.title,
      dropDown: navigationModel.dropDown,
      isFileSystem: navigationModel.isFileSystem,
      childDirectories: childDirectories,
    },
  };
};

export default useNavigationSectionItemViewModel;
export { INavigationSectionItemViewModel };
