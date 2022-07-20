import DirectoryGridViewModel from "./directoryGrid.viewmodel";
import { DirectoryGridObj } from "./directoryGrid.grid";

interface IDirectoryGridProps {
  currentDirectoryId: string;
}
const DirectoryGrid = ({
  currentDirectoryId,
}: IDirectoryGridProps): JSX.Element => {
  const viewModel = DirectoryGridViewModel(currentDirectoryId);
  if (!viewModel.data || viewModel.loading) {
    return <div>loading</div>;
  } else {
    return <DirectoryGridObj data={viewModel.data} />;
  }
};

export default DirectoryGrid;
