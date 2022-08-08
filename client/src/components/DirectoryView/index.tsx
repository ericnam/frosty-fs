import { IFileModel } from "@data/files/model";
import { useAppSelector } from "@hooks/redux.hooks";
import { getActiveDirectoryFilePath, getFilePath } from "reducers/files.slice";
import FilePath from "./components/filePath";
import DirectoryGridViewModel from "./components/directoryGrid.viewmodel";
import { DirectoryGridObj } from "@components/DataGrid";
import DirectoryToolbar from "@components/DirectoryToolbar";

const DirectoryView = (): JSX.Element => {
  const filePath = useAppSelector(getFilePath);
  const { _data } = DirectoryGridViewModel();

  return (
    <div className={`w-full h-full flex flex-col`}>
      <MyFilesDirectoryHeader filePath={filePath as IFileModel[]} />
      {_data.grid.loading ? (
        <div>Loading</div>
      ) : (
        <DirectoryGridObj data={_data.grid.obj} />
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
    <div className="">
      <div className={`flex flex-row mt-8`}>
        <FilePath filePath={filePath as IFileModel[]} />
      </div>
      <div className={``}>
        <DirectoryToolbar />
      </div>
    </div>
  );
};

export default DirectoryView;
