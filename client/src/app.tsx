import NavigationComponent from "@components/Navigation";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useAppDispatch } from "@hooks/redux.hooks";
import { addDirectory } from "reducers/fileSystem.reducer";
import DirectoryView from "@components/DirectoryView";
import FilesRepository from "repositories/files.repository";

const App = (): JSX.Element => {
  const dispatch = useAppDispatch();
  
  // Gql Queries
  const qGetDirectories = FilesRepository.GetDirectories({
    onLoad: (data: any) => {
      dispatch(
        addDirectory({
          directoryId: "root",
          subDirectories: data,
        })
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
      <Routes>
        <Route path={"/my-files"} element={<DirectoryView />}></Route>
        <Route path={"/my-files/:id"} element={<DirectoryView />}></Route>
        {/* <Route path={"/"}></Route> */}
      </Routes>
    </div>
  );
};

export default App;
