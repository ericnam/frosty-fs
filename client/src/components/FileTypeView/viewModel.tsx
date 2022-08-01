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

const FileTypeViewViewModel = (pathname: string) => {
  const [currentView, setCurrentView] = useState(pathname.substring(1));
  const [icon, setIcon] = useState<IconProp>(faFolder as IconProp);
  const [gridData, setGridData] = useState<IFileModel[]>();

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
        qGetFavorites.api.get();
        break;
      case "Recents":
        setIcon(faClock as IconProp);
        qGetRecents.api.get();
        break;
      case "Trash":
        setIcon(faTrashCan as IconProp);
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
  };
};

export default FileTypeViewViewModel;
