// import { IFileModel } from "@data/files/model";
// import FilePath from "./components/filePath";
// import DirectoryGridViewModel from "./viewmodel";
// import { DirectoryGridObj } from "@components/DataGrid";
// import DirectoryToolbar from "@components/DirectoryToolbar";

// const DirectoryView = (): JSX.Element => {
//   const { _data } = DirectoryGridViewModel();

//   return (
//     <div className={`w-full h-full flex flex-col`}>
//       <MyFilesDirectoryHeader filePath={_data.filePath.obj} />
//       {_data.grid.loading ? (
//         <div>Loading</div>
//       ) : (
//         <DirectoryGridObj data={_data.grid.obj} />
//       )}
//     </div>
//   );
// };

// const MyFilesDirectoryHeader = ({
//   filePath,
// }: {
//   filePath: IFileModel[];
// }): JSX.Element => {
//   return (
//     <div className="">
//       <div className={`flex flex-row mt-8`}>
//         <FilePath filePath={filePath} />
//       </div>
//       <div className={``}>
//         <DirectoryToolbar />
//       </div>
//     </div>
//   );
// };

// export default DirectoryView;
