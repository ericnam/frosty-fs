import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { useLocation } from "react-router-dom";
import FileTypeViewViewModel from "./viewModel";
import { DirectoryGridObj } from "@components/DataGrid";

const FileTypeView = (): JSX.Element => {
  const { pathname } = useLocation();
  const viewModel = FileTypeViewViewModel(pathname);

  return (
    <div className={`w-full h-full flex flex-col`}>
      <ViewsDirectoryHeader
        currentView={viewModel.view}
        icon={viewModel.icon}
      />
      {viewModel.loading && !!viewModel.gridData ? (
        <div>Loading</div>
      ) : (
        <DirectoryGridObj data={viewModel.gridData} />
      )}
    </div>
  );
};

interface IViewsDirectoryHeader {
  currentView: string;
  icon: IconProp;
}
const ViewsDirectoryHeader = ({
  currentView,
  icon,
}: IViewsDirectoryHeader): JSX.Element => {
  return (
    <div>
      <div className={`flex flex-row flex-1 items-center mt-8 mb-4`}>
        <span className={`flex flex-row`}>
          <div
            className={`py-3 pl-3 rounded-lg text-violet-500 flex items-center justify-center`}
          >
            <FontAwesomeIcon className={`mr-2`} icon={icon as IconProp} />
          </div>
          <div className={`rounded-lg p-2 font-semibold`}>{currentView}</div>
        </span>
      </div>
    </div>
  );
};

export default FileTypeView;
