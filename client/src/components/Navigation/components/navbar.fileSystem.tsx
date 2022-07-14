import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@hooks/redux.hooks";
import { addDirectory, getDirectory } from "reducers/fileSystem.reducer";
import { GET_DIRECTORIES } from "@data/filesystem/query";
import { useLazyQuery } from "@apollo/client";

//pl-6
//pl-12
//pl-18
//pl-24
//pl-30
//pl-36
//pl-42

const FileSystemNavbarItem = ({
  fileId,
  title,
  icon,
  directories,
  tier,
  parentActive,
}: any) => {
  const dispatch = useAppDispatch();
  const directory = useAppSelector(getDirectory);
  directories = directory;

  const [active, setActive] = useState(false);
  const [subDir, setSubDir] = useState(directories[!!fileId ? fileId : "root"]);
  const [getSubDirectoryData, subDirectoryData] = useLazyQuery(GET_DIRECTORIES);

  useEffect(() => {
    if (parentActive && !!!subDir) {
      getSubDirectoryData({ variables: { directoryId: fileId } });
    }
  }, [parentActive]);

  useEffect(() => {
    if (!subDirectoryData.loading) {
      if (!!subDirectoryData.data && !!subDirectoryData.data.directories) {
        dispatch(
          addDirectory({
            directoryId: fileId,
            children: subDirectoryData.data.directories,
          })
        );
      }
    }
  }, [subDirectoryData.loading]);

  useEffect(() => {
    setSubDir(directories[!!fileId ? fileId : "root"]);
  }, [directories]);

  return (
    <div>
      <div
        className={`text-slate-600 hover:bg-violet-50 m-2 rounded-lg font-sans text-sm ${
          tier > 0 ? "pl-" + tier * 6 : null
        }`}
      >
        <div className={`flex`}>
          <Link
            className={"flex-1 cursor-pointer px-3 py-2 "}
            to={`/my-files/${!!fileId ? fileId : ""}`}
          >
            <span className={"mr-3"}>
              <FontAwesomeIcon icon={icon as IconProp} />
            </span>
            {title}
          </Link>
          <span
            className={`${active ? "" : "rotate-180"} float-right px-3 py-2 `}
            onClick={() => setActive(!active)}
          >
            <FontAwesomeIcon icon={faAngleDown as IconProp} />
          </span>
        </div>
      </div>
      {!!subDir && subDir.length > 0 ? (
        <div className={`${active ? "" : "hidden"}`}>
          {subDir.map((child: any, i: any) => {
            return (
              <FileSystemNavbarItem
                key={i}
                fileId={child.fileId}
                title={child.title}
                icon={icon}
                directories={directories}
                tier={tier + 1}
                parentActive={active}
              />
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default FileSystemNavbarItem;
