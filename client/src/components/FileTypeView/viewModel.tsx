import {
  faClock,
  faFolder,
  faStar,
  faTrashCan,
} from "@fortawesome/free-regular-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { useEffect, useState } from "react";
import FilesRepository from "repositories/files.repository";
import { IFileModel } from "@data/files/model";
import { IDirectoryToolbarProps } from "@components/DirectoryToolbar";

const deleteDirectoryToolbarProps: IDirectoryToolbarProps = {
  addNew: false,
  favorite: false,
  move: false,
  delete: false,
};
const favoritesRecentToolbarProps: IDirectoryToolbarProps = {
  addNew: false,
  move: false,
};

const FileTypeViewViewModel = (pathname: string) => {
  const [currentView, setCurrentView] = useState(pathname.substring(1));
  const [icon, setIcon] = useState<IconProp>(faFolder as IconProp);
  const [gridData, setGridData] = useState<IFileModel[]>();
  const [toolbarProps, setToolbarProps] = useState<IDirectoryToolbarProps>(
    favoritesRecentToolbarProps
  );

  const qGetFavorites = FilesRepository.GetFavorites({
    onLoad: (data: IFileModel[]) => {
      setGridData(data);
    },
  });
  const qGetRecents = FilesRepository.GetRecents({
    onLoad: (data: IFileModel[]) => {
      setGridData(data);
    },
  });

  useEffect(() => {
    let newCurrentView = pathname[1].toUpperCase() + pathname.substring(2);
    setCurrentView(newCurrentView);
    setGridData(undefined);

    switch (newCurrentView) {
      case "Favorites":
        setIcon(faStar as IconProp);
        setToolbarProps(favoritesRecentToolbarProps);
        qGetFavorites.api.get();
        break;
      case "Recents":
        setIcon(faClock as IconProp);
        setToolbarProps(favoritesRecentToolbarProps);
        qGetRecents.api.get();
        break;
      case "Trash":
        setIcon(faTrashCan as IconProp);
        setToolbarProps(deleteDirectoryToolbarProps);
        break;
      default:
        break;
    }
  }, [pathname]);

  return {
    view: currentView,
    icon,
    loading: qGetFavorites.loading,
    gridData,
    data: {
      grid: {
        loading: qGetFavorites.loading,
        data: gridData,
      },
      toolbarProps: toolbarProps,
    },
  };
};

export default FileTypeViewViewModel;
