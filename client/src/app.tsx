import NavigationComponent from "@components/Navigation";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useAppDispatch } from "@hooks/redux.hooks";
import { setSubDirectory } from "reducers/files.slice";
import DirectoryView from "@components/DirectoryView";
import FilesRepository from "repositories/files.repository";
import SearchBar from "@components/SearchBar/index.searchbar";
import { ISetSubDirectoryPayload } from "reducers/files.reducer";
import { IFileModel } from "@data/files/model";

const App = (): JSX.Element => {
  const dispatch = useAppDispatch();

  // Gql Queries
  const qGetDirectories = FilesRepository.GetDirectories({
    onLoad: (data: any) => {
      dispatch(
        setSubDirectory({
          fileId: "root",
          subDirectories: data as IFileModel[],
        } as ISetSubDirectoryPayload)
      );
    },
  });

  // Initial data load
  useEffect(() => {
    qGetDirectories.api.get({ directoryId: "root" });
  }, []);

  return (
    <div className={"flex flex-row"}>
      <NavigationComponent />
      <div className={`flex flex-col relative w-full`}>
        <div className={`w-full h-16 items-center flex px-4`}>
          <SearchBar />
        </div>
        <div className={`flex-1`}>
          <Routes>
            <Route path={"/my-files"} element={<DirectoryView />}></Route>
            <Route path={"/my-files/:id"} element={<DirectoryView />}></Route>
            {/* <Route path={"/"}></Route> */}
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
