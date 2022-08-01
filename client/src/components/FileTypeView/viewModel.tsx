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
// import { useAppDispatch } from "@hooks/redux.hooks";
// import { setFiles } from "reducers/files.slice";
// import { ISetFilesPayload } from "reducers/files.reducer";

const FileTypeViewViewModel = (pathname: string) => {
  // const dispatch = useAppDispatch();

  const [currentView, setCurrentView] = useState(pathname.substring(1));
  const [icon, setIcon] = useState<IconProp>(faFolder as IconProp);
  const [gridData, setGridData] = useState<IFileModel[]>();

  const qGetFavorites = FilesRepository.GetFavorites({
    onLoad: (data: IFileModel[]) => {
      console.log(data);
      setGridData(data);
      // dispatch(setFiles({ files: data } as ISetFilesPayload));
    },
  });

  useEffect(() => {
    let newCurrentView = pathname[1].toUpperCase() + pathname.substring(2);
    setCurrentView(newCurrentView);
    setGridData(undefined);

    switch (newCurrentView) {
      case "Favorites":
        console.log("hi");
        setIcon(faStar as IconProp);
        qGetFavorites.api.get();
        break;
      case "Recents":
        console.log("asdf");
        setIcon(faClock as IconProp);
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
