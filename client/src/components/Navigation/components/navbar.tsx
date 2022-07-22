import { NavigationModel } from "@data/navigation/model";
import {
  faSnowflake,
  IconDefinition,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";
import DashboardNavbarItem from "./navbar.dashboard";
import FileSystemNavbarItem from "./navbar.fileSystem";
import { useEffect, useState } from "react";

interface NavbarParam {
  loading: boolean;
  navigation: NavigationModel[] | undefined;
}

const Navbar = ({ loading, navigation }: NavbarParam): JSX.Element => {
  return (
    <div className={"w-96 h-screen bg-gray-900 text-white"}>
      <Link to={"/"}>
        <div className={`mx-8 mt-8 mb-12 flex`}>
          <span
            className={`text-xl text-white w-8 h-8 bg-violet-500 flex justify-center items-center rounded-full mr-2`}
          >
            <FontAwesomeIcon icon={faSnowflake as IconProp} />
          </span>
          <span className={`text-xl font-semibold`}>Frosty FS</span>
        </div>
      </Link>
      {/* 
      {!loading && !!navigation
        ? navigation!
            .filter((e) => e.title === "Dashboard")
            .map((navigation, i) => {
              return (
                <div className={`my-2`}>
                  <NavbarItem
                    key={i}
                    title={navigation.title}
                    icon={navigation.icon}
                    dropDown={navigation.dropDown}
                    route={navigation.route}
                  />
                </div>
              );
            })
        : false} */}
      {/* <div className="my-8 border-t w-full h-1"></div> */}
      {!loading && !!navigation
        ? navigation!
            .filter((e) => e.title === "My Files")
            .map((navigation, i) => {
              return (
                <div key={i} className={`my-2`}>
                  <NavbarItem
                    key={i}
                    title={navigation.title}
                    icon={navigation.icon}
                    dropDown={navigation.dropDown}
                    route={navigation.route}
                  />
                </div>
              );
            })
        : false}
      <div className="my-6 border-t border-gray-800 w-full h-1"></div>
      {!loading && !!navigation
        ? navigation!
            .filter((e) => e.title !== "My Files" && e.title !== "Dashboard")
            .map((navigation, i) => {
              return (
                <div key={i}>
                  <NavbarItem
                    key={i}
                    title={navigation.title}
                    icon={navigation.icon}
                    dropDown={navigation.dropDown}
                    route={navigation.route}
                  />
                </div>
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
}: NavbarItemParam): JSX.Element => {
  let iconColor = "";
  const location = useLocation();
  const [fileTabOpen, setFileTabOpen] = useState(false);

  useEffect(() => {
    if (location.pathname.includes("my-files")) {
      setFileTabOpen(true);
    }
  }, [location.pathname]);

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
          fileId={"root"}
          tier={0}
          isActive={fileTabOpen}
          tierDisplay={{}}
        />
      );
    default:
      return (
        <Link to={`/${route}`}>
          <div
            className={
              "text-slate-300 hover:bg-gray-800 my-2 mx-6 px-3 py-2 rounded-lg font-sans text-sm cursor-pointer"
            }
          >
            <span className={`mr-3 ${iconColor}`}>
              <FontAwesomeIcon icon={icon as IconProp} />
            </span>
            <span
              className={
                location.pathname === `/${route}` ? "font-semibold text-gray-50" : "font-normal"
              }
            >
              {title}
            </span>
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
