import { IFileModel } from "@data/files/model";
import { useAppSelector } from "@hooks/redux.hooks";
import {  getFilePath } from "reducers/files.slice";
import FilePath from "./components/filePath";
import DirectoryGridViewModel from "./components/directoryGrid.viewmodel";
import { DirectoryGridObj } from "@components/DataGrid";
import DirectoryToolbar from "@components/DirectoryToolbar";

const DirectoryView = (): JSX.Element => {
  const filePath = useAppSelector(getFilePath);
  const viewModel = DirectoryGridViewModel();

  return (
    <div className={`w-full h-full flex flex-col`}>
      <MyFilesDirectoryHeader filePath={filePath as IFileModel[]} />
      {!viewModel.data || viewModel.loading ? (
        <div>Loading</div>
      ) : (
        <DirectoryGridObj data={viewModel.data} />
      )}
    </div>
  );
};

interface IMyFilesDirectoryHeader {
  filePath: IFileModel[];
}
const MyFilesDirectoryHeader = ({
  filePath,
}: IMyFilesDirectoryHeader): JSX.Element => {
  return (
    <div className="mb-4">
      <div className={`flex flex-row mt-8`}>
        <FilePath filePath={filePath as IFileModel[]} />
      </div>
      <div className={`mt-3`}>
        <DirectoryToolbar />
      </div>
    </div>
  );
};

export default DirectoryView;
