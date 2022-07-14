import { NavigationModel } from "@data/navigation/model";
import { IconDefinition } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
// import { FileSystemModel } from "@data/filesystem/model";
import DashboardNavbarItem from "./navbar.dashboard";
import { useAppSelector } from "@hooks/redux.hooks";
import { getDirectory } from "reducers/fileSystem.reducer";
import FileSystemNavbarItem from "./navbar.fileSystem";

interface NavbarParam {
  loading: boolean;
  navigation: NavigationModel[] | undefined;
  // fileSystem: FileSystemModel[] | undefined;
}

const Navbar = ({
  loading,
  navigation,
}: // fileSystem,
NavbarParam): JSX.Element => {
  const directory = useAppSelector(getDirectory);
  // console.log(fileSystem);
  console.log(directory);

  return (
    <div className={"border-r w-72 h-screen"}>
      {!loading && !!navigation
        ? navigation!.map((navigation, i) => {
            return (
              <NavbarItem
                key={i}
                title={navigation.title}
                icon={navigation.icon}
                dropDown={navigation.dropDown}
                route={navigation.route}
                fileSystem={directory}
              />
            );
          })
        : false}
    </div>
  );
};

export interface NavbarItemParam {
  title: string;
  icon: IconDefinition;
  dropDown?: boolean;
  route?: string;
  fileSystem?: any;
}

const NavbarItem = ({
  title,
  icon,
  dropDown,
  route,
  fileSystem,
}: NavbarItemParam): JSX.Element => {
  switch (title) {
    case "Dashboard":
      return (
        <Link to={`/${route}`}>
          <DashboardNavbarItem
            title={title}
            icon={icon}
            storageUsed={5000000000}
            storageAvailable={16106127360}
          />
        </Link>
      );
    case "My Files":
      return (
        <FileSystemNavbarItem
          title={title}
          icon={icon}
          fileId={null}
          directories={fileSystem}
          tier={0}
        />
      );
    default:
      return (
        <Link to={`/${route}`}>
          <div
            className={
              "text-slate-600 hover:bg-violet-50 m-2 px-3 py-2 rounded-lg font-sans text-sm cursor-pointer"
            }
          >
            <span className={"mr-3"}>
              <FontAwesomeIcon icon={icon as IconProp} />
            </span>
            {title}
            {dropDown ? (
              <span className={"float-right"}>
                <FontAwesomeIcon icon={faAngleDown as IconProp} />
              </span>
            ) : (
              false
            )}
          </div>
        </Link>
      );
  }
};

export default Navbar;
