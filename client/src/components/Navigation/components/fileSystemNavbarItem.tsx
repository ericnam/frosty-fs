import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { Link } from "react-router-dom";
import FileSystemNavbarItemViewModel from "./fileSystemNavbarItem.viewModel";
import ItemContainer from "./itemContainer";
import { faFolder } from "@fortawesome/free-regular-svg-icons";
import { IFileModel } from "@data/files/model";

const FileSystemNavbarItem = ({
  fileId,
  title,
  icon,
  tier,
  isParentDropdownExpanded,
  last,
  tierDisplay,
  isActive,
}: any) => {
  const { _api, _state, _data } = FileSystemNavbarItemViewModel({
    fileId,
    isParentDropdownExpanded,
  });

  if (_data.file.loading) {
    return <ItemContainer>loading</ItemContainer>;
  }

  return (
    <>
      <ItemContainer>
        <div className={`relative`}>
          {/* <FileSystemTreeLine
            tier={tier}
            last={last}
            tierDisplay={tierDisplay}
          /> */}
          <span className={`flex`}>
            <Link
              className={`flex flex-1 cursor-pointer ${
                tier > 0 ? "pl-" + tier * 4 : ""
              } ${
                _state.isNavbarItemActive
                  ? "text-gray-50 font-semibold"
                  : "font-normal"
              }`}
              to={`/my-files${fileId !== "root" ? "/" + fileId : ""}`}
              onClick={() => _api.directoryOnClick(fileId)}
            >
              <span className={"mr-3"}>
                <FontAwesomeIcon icon={faFolder as IconProp} />
              </span>
              <span>{!!title ? title : _data.file.obj?.title}</span>
            </Link>
            <span
              className={`${
                _state.isDropdownExpanded ? "" : "rotate-180"
              } float-right`}
              onClick={() =>
                _api.setIsDropdownExpanded(!_state.isDropdownExpanded)
              }
            >
              <FontAwesomeIcon icon={faAngleDown as IconProp} />
            </span>
          </span>
        </div>
      </ItemContainer>

      <div className={`${_state.isDropdownExpanded ? "" : "hidden"}`}>
        {_data.subDirectories.loading ? (
          <ItemContainer>Loading</ItemContainer>
        ) : (
          _data.subDirectories.obj?.map((file: IFileModel, i: number) => {
            return (
              <FileSystemNavbarItem
                key={i}
                fileId={file.fileId}
                isParentDropdownExpanded={_state.isDropdownExpanded}
              />
            );
          })
        )}
      </div>
    </>
  );
};

const FileSystemTreeLine = ({ tier, tierDisplay, last }: any): JSX.Element => {
  let treeLines = [];

  for (let i = 1; i < tier + 1; i++) {
    if (tierDisplay.hasOwnProperty(i - 1) && tierDisplay[i - 1]) {
      treeLines.push(
        <div
          key={i + "_1"}
          className={`absolute w-2 h-full pl-${
            (i - 1) * 4
          } border-r-2 border-violet-500`}
        ></div>
      );
    }

    if (i === tier) {
      treeLines.push(
        <div
          key={i + "_2"}
          className={`absolute w-2 ${
            last ? "h-1/2" : "h-full"
          } border-r-2 border-violet-500 pl-${i * 4}`}
        ></div>
      );

      treeLines.push(
        <div
          key={i + "_3"}
          className={`absolute h-1/2 w-2 border-b-2 border-violet-500 ml-${
            i * 4
          }`}
        ></div>
      );
    }
  }
  return <div>{treeLines}</div>;
};

export default FileSystemNavbarItem;

//pl-6
//pl-12
//pl-18
//pl-24
//pl-30
//pl-36
//pl-42

//pl-4
//pl-8
//pl-12
//pl-16
//pl-20
//ml-4
//ml-8
//ml-12
//ml-16
//ml-20
