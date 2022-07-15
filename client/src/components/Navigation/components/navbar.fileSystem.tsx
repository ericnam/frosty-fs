import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@hooks/redux.hooks";
import {
  addDirectory,
  getDirectory,
  setCurrentDirectory,
} from "reducers/fileSystem.reducer";
import FilesRepository from "repositories/files.repository";

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

const FileSystemNavbarItem = ({
  fileId,
  title,
  icon,
  tier,
  parentActive,
  last,
  tierDisplay,
}: // parentLast,
// lastByTier,
any) => {
  // Redux State
  const dispatch = useAppDispatch();
  const directory: any = useAppSelector(getDirectory);

  // Component State
  const [active, setActive] = useState(false);
  const [subDir, setSubDir] = useState(directory[!!fileId ? fileId : "root"]);

  // Gql Queries
  const qGetDirectories = FilesRepository.GetDirectories({
    onLoad: (data: any) => {
      dispatch(
        addDirectory({
          directoryId: fileId,
          subDirectories: data,
        })
      );
    },
  });

  useEffect(() => {
    if (parentActive && !!!subDir) {
      qGetDirectories.api.get({ directoryId: fileId });
    }
  }, [parentActive]);

  useEffect(() => {
    setSubDir(directory[!!fileId ? fileId : "root"]);
  }, [directory]);

  // Onclick handlers
  function setSelectedDirectory(fileId: any) {
    dispatch(setCurrentDirectory(fileId));
  }

  return (
    <div>
      <div
        className={`text-slate-600 hover:bg-violet-50 mx-6 rounded-lg font-sans text-sm`}
      >
        <div className={`relative`}>
          <FileSystemTreeLine
            tier={tier}
            last={last}
            tierDisplay={tierDisplay}
          />
          <span className={`flex`}>
            <Link
              className={`flex-1 cursor-pointer mx-3 my-2 ${
                tier > 0 ? "pl-" + tier * 4 : ""
              }`}
              to={`/my-files/${!!fileId ? fileId : ""}`}
              onClick={() => setSelectedDirectory(fileId)}
            >
              <span className={"mr-3"}>
                <FontAwesomeIcon icon={icon as IconProp} />
              </span>
              {title}
            </Link>
            <span
              className={`${active ? "" : "rotate-180"} float-right px-3 py-2`}
              onClick={() => setActive(!active)}
            >
              <FontAwesomeIcon icon={faAngleDown as IconProp} />
            </span>
          </span>
        </div>
      </div>
      {!!subDir && subDir.length > 0 ? (
        <div className={`${active ? "" : "hidden"}`}>
          {subDir.map((child: any, i: any) => {
            let tempTierDisplay = { ...tierDisplay };
            let isLastInDir = i === subDir.length - 1;
            if (tier + 1 > 0) {
              tempTierDisplay[tier + 1] = !isLastInDir;
            }
            return (
              <FileSystemNavbarItem
                key={i}
                fileId={child.fileId}
                title={child.title}
                icon={icon}
                tier={tier + 1}
                parentActive={active}
                parentLast={last}
                last={isLastInDir}
                tierDisplay={tempTierDisplay}
              />
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

const FileSystemTreeLine = ({ tier, tierDisplay, last }: any): JSX.Element => {
  let treeLines = [];

  for (let i = 1; i < tier + 1; i++) {
    if (tierDisplay.hasOwnProperty(i - 1) && tierDisplay[i - 1]) {
      treeLines.push(
        <div
          className={`absolute w-2 h-full pl-${(i - 1) * 4} border-r `}
        ></div>
      );
    }

    if (i === tier) {
      treeLines.push(
        <div
          className={`absolute w-2 ${last ? "h-1/2" : "h-full"} border-r pl-${
            i * 4
          }`}
        ></div>
      );

      treeLines.push(
        <div className={`absolute h-1/2 w-2 border-b ml-${i * 4}`}></div>
      );
    }
  }
  return <div>{treeLines}</div>;
};

export default FileSystemNavbarItem;
