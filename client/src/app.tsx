import NavigationComponent from "@layout/Navigation";
import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
// import { useAppDispatch } from "@hooks/redux.hooks";
// import FilesRepository from "repositories/files.repository";
import ActionMenu from "@components/ActionMenu";
import {
  ActionMenuActionType,
  ActionMenuStore,
} from "contexts/actionMenu.provider";
// import FileService from "services/files.service";

const App = (): JSX.Element => {
  // const dispatch = useAppDispatch();
  const { actionMenuState, dispatchActionMenuState } =
    useContext(ActionMenuStore);

  // Gql Queries
  // const _GetDirectories = FilesRepository.GetDirectories();

  // Services
  // const [fileService] = useState(
  //   new FileService({ _GetDirectories }, dispatch)
  // );

  // Initial data load
  // useEffect(() => {
  //   fileService.GetSubdirectoriesByFileId({ fileId: "root" });
  // }, []);

  return (
    <>
      <ActionMenu />
      <div
        onClick={() => {
          if (actionMenuState.isActive) {
            dispatchActionMenuState({
              type: ActionMenuActionType.HIDE,
            });
          }
        }}
        className={"z-0 relative flex flex-row"}
      >
        <Routes>
          <Route element={<NavigationComponent />}>
            <Route path='/*' element={<></>} ></Route>
          </Route>
        </Routes>

        {/* <div
          className={`flex flex-col relative w-full m-8 mt-0`}
          style={{ minWidth: 800 }}
        >
          <div className={`w-full mt-4 items-center flex`}>
            <SearchBar />
            <UserProfileAndSettings />
          </div>
          <div className={`flex-1`}>
            <Routes>
              <Route path={"/favorites"} element={<FileTypeView />}></Route>
              <Route path={"/recents"} element={<FileTypeView />}></Route>
              <Route path={"/trash"} element={<FileTypeView />}></Route>
              <Route path={"/my-files"} element={<DirectoryView />}></Route>
              <Route path={"/my-files/:id"} element={<DirectoryView />}></Route>
            </Routes>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default App;
