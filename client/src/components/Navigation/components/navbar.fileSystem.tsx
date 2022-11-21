import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@hooks/redux.hooks";
import {
  setSubDirectory,
  getSubDirectories,
  // setCurrentFile,
  setFiles,
  IReduxSubDirectories,
  getFilePath,
  getCurrentDirectoryId,
} from "reducers/files.slice";
import FilesRepository from "repositories/files.repository";
import { IFileModel } from "@data/files/model";
import {
  // ISetCurrentFilePayload,
  ISetFilesPayload,
  ISetSubDirectoryPayload,
} from "reducers/files.reducer";

const FileSystemNavbarItem = ({
  fileId,
  title,
  icon,
  tier,
  parentActive,
  last,
  tierDisplay,
  isActive,
}: any) => {
  // react router dom
  const location = useLocation();

  // Redux State
  const dispatch = useAppDispatch();
  const subDirectories = useAppSelector(
    getSubDirectories
  ) as IReduxSubDirectories;
  const currentDirectoryId = useAppSelector(getCurrentDirectoryId);
  const filePath = useAppSelector(getFilePath);

  // Component State
  const [isCurrentDirectory, setIsCurrentDirectory] = useState(false);
  const [active, setActive] = useState<boolean>(isActive);
  const [subDir, setSubDir] = useState<IFileModel[]>(
    subDirectories[!!fileId ? fileId : "root"]
  );

  // Gql Queries
  const qGetFiles = FilesRepository.GetFiles();
  const qGetDirectories = FilesRepository.GetDirectories();

  useEffect(() => {
    setActive(isActive);
  }, [isActive]);

  useEffect(() => {
    if (!!filePath.find((fp) => fp.fileId == fileId)) {
      setActive(true);
    }
  }, [subDir]);

  useEffect(() => {
    if (parentActive && !!!subDir) {
      qGetDirectories({ directoryId: fileId }).then((data: IFileModel[]) => {
        dispatch(
          setSubDirectory({
            fileId: fileId,
            subDirectories: data,
          } as ISetSubDirectoryPayload)
        );
      });
    }
  }, [parentActive]);

  useEffect(() => {
    if (subDirectories.hasOwnProperty(fileId)) {
      qGetFiles({ ids: subDirectories[fileId].map((f) => f.fileId) }).then(
        (data: IFileModel[]) => {
          dispatch(setFiles({ files: data } as ISetFilesPayload));
        }
      );
    }
    setSubDir(subDirectories[!!fileId ? fileId : "root"]);
  }, [subDirectories]);

  useEffect(() => {
    setIsCurrentDirectory(
      location.pathname.includes("my-files") && currentDirectoryId === fileId
    );
  }, [currentDirectoryId, location.pathname]);

  // Onclick handlers
  function setSelectedDirectory(fileId: string) {
    qGetFiles({ ids: [fileId] }).then((data: IFileModel[]) => {
      dispatch(setFiles({ files: data } as ISetFilesPayload));
    });
    // dispatch(setCurrentFile({ fileId: fileId } as ISetCurrentFilePayload));
    // if (fileId === "root") {
    //   setActive(true);
    // }
  }

  return (
    <div>
      <div
        className={`text-slate-300 hover:bg-gray-800 mx-6 rounded-lg font-sans text-sm`}
      >
        <div className={`relative`}>
          <FileSystemTreeLine
            tier={tier}
            last={last}
            tierDisplay={tierDisplay}
          />
          <span className={`flex`}>
            <Link
              className={`flex flex-1 cursor-pointer mx-3 my-2 ${
                tier > 0 ? "pl-" + tier * 4 : ""
              } ${
                isCurrentDirectory
                  ? "text-gray-50 font-semibold"
                  : "font-normal"
              }`}
              to={`/my-files${fileId !== "root" ? "/" + fileId : ""}`}
              onClick={() => setSelectedDirectory(fileId)}
            >
              <span className={"mr-3"}>
                {/* <BsFolder2 className={""} /> */}
                <FontAwesomeIcon icon={icon as IconProp} />
              </span>
              <span>{title}</span>
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
