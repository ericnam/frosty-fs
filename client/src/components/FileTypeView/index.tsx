import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { useLocation } from "react-router-dom";
import FileTypeViewViewModel from "./viewModel";
import { DirectoryGridObj } from "@components/DataGrid";
import DirectoryToolbar, {
  IDirectoryToolbarProps,
} from "@components/DirectoryToolbar";

const FileTypeView = (): JSX.Element => {
  const { pathname } = useLocation();
  const viewModel = FileTypeViewViewModel(pathname);

  return (
    <div className={`w-full h-full flex flex-col`}>
      <ViewsDirectoryHeader
        currentView={viewModel.view}
        icon={viewModel.icon}
        toolnarProps={viewModel.data.toolbarProps}
      />
      {viewModel.data.grid.loading && !!viewModel.data.grid.data ? (
        <div>Loading</div>
      ) : (
        <DirectoryGridObj data={viewModel.data.grid.data} />
      )}
    </div>
  );
};

interface IViewsDirectoryHeader {
  currentView: string;
  icon: IconProp;
  toolnarProps: IDirectoryToolbarProps;
}
const ViewsDirectoryHeader = ({
  currentView,
  icon,
  toolnarProps,
}: IViewsDirectoryHeader): JSX.Element => {
  return (
    <div>
      <div className={`flex flex-row flex-1 items-center mt-8`}>
        <span className={`flex flex-row`}>
          <div
            className={`py-3 pl-3 rounded-lg text-violet-500 flex items-center justify-center`}
          >
            <FontAwesomeIcon className={`mr-2`} icon={icon as IconProp} />
          </div>
          <div className={`rounded-lg p-2 font-semibold`}>{currentView}</div>
        </span>
      </div>
      <DirectoryToolbar {...toolnarProps} />
    </div>
  );
};

export default FileTypeView;
