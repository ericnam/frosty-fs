import NavigationComponent from "@components/Navigation";
import { useContext, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useAppDispatch } from "@hooks/redux.hooks";
import { setSubDirectory } from "reducers/files.slice";
import DirectoryView from "@components/DirectoryView";
import FilesRepository from "repositories/files.repository";
import SearchBar from "@components/SearchBar/index.searchbar";
import { ISetSubDirectoryPayload } from "reducers/files.reducer";
import { IFileModel } from "@data/files/model";
import ActionMenu from "@components/ActionMenu";
import { ActionMenuStore } from "contexts/actionMenu.provider";

const App = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { actionMenuState, setActionMenuState } = useContext(ActionMenuStore);

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
    <div>
      <ActionMenu />
      <div
        onClick={() => {
          if (actionMenuState.isActive) {
            setActionMenuState({ ...actionMenuState, isActive: false });
          }
        }}
        className={"z-0 relative flex flex-row"}
      >
        <NavigationComponent />
        <div className={`flex flex-col relative w-full m-8 mt-0`}>
          <div className={`w-full h-16 items-center flex`}>
            <SearchBar />
          </div>
          <div className={`flex-1`}>
            <Routes>
              <Route path={"/my-files"} element={<DirectoryView />}></Route>
              <Route path={"/my-files/:id"} element={<DirectoryView />}></Route>
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
