import DirectoryGridViewModel from "./directoryGrid.viewmodel";
import { useEffect, useRef, useState } from "react";
import { EDirectoryGridColumns } from "./directoryGrid.grid";

interface IDirectoryGridProps {
  currentDirectoryId: string;
}
const DirectoryGrid = ({
  currentDirectoryId,
}: IDirectoryGridProps): JSX.Element => {
  const gridRef = useRef<HTMLDivElement>(null);
  const [clickedRow, setClickedRow] = useState<string>("");
  const viewModel = DirectoryGridViewModel(currentDirectoryId);

  viewModel.grid.on("rowClick", (...args) => {
    // console.log(args[0].targe`t.parentNode);
    // let row = args[1];
    // setClickedRow(args[0]);

    // if (!!row) {
    //   setClickedRow(row.cells[EDirectoryGridColumns.FileID].data as string);
    // }
  });

  useEffect(() => {
    if (!!gridRef.current && !!viewModel.data) {
      gridRef.current.innerHTML = "";

      viewModel.grid.updateConfig({ data: viewModel.data as any });
      viewModel.grid.render(gridRef.current);
      viewModel.grid.forceRender();
    }
  }, [gridRef.current, viewModel.data]);

  if (!viewModel.data || viewModel.loading) {
    return <div>loading</div>;
  } else {
    return <div className="mt-4" ref={gridRef}></div>;
  }
};

export default DirectoryGrid;
