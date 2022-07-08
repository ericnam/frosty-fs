import { NavigationModel } from "@data/navigation/model";
import { IconDefinition } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

interface NavbarParam {
  loading: boolean;
  navigation: NavigationModel[] | undefined;
}

const Navbar = ({ loading, navigation }: NavbarParam): JSX.Element => {
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
              />
            );
          })
        : false}
    </div>
  );
};

interface NavbarItemParam {
  title: string;
  icon: IconDefinition;
  dropDown?: boolean;
  route?: string;
}

const NavbarItem = ({
  title,
  icon,
  dropDown,
  route,
}: NavbarItemParam): JSX.Element => {
  if (title === "Dashboard") {
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
  }

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
};

interface DashboardNavbarItemParam extends NavbarItemParam {
  storageUsed: number;
  storageAvailable: number;
}

const DashboardNavbarItem = ({
  title,
  icon,
  storageUsed,
  storageAvailable,
}: DashboardNavbarItemParam): JSX.Element => {
  let storageUsedGb =
    Math.round((storageUsed / (1024 * 1024 * 1024)) * 100) / 100;
  let storageAvailableGb =
    Math.round((storageAvailable / (1024 * 1024 * 1024)) * 100) / 100;

  return (
    <div
      className={
        "flex flex-col text-slate-600 border hover:bg-violet-50 m-2 px-3 py-2 rounded-lg font-sans text-sm cursor-pointer"
      }
    >
      <div className={""}>
        <span className={"mr-3"}>
          <FontAwesomeIcon icon={icon as IconProp} />
        </span>
        {title}
      </div>
      <div className="w-full bg-gray-200 rounded-full h-1 dark:bg-gray-500 mt-4">
        <div
          className="bg-violet-600 h-1 rounded-full"
          style={{ width: "33%" }}
        ></div>
      </div>
      <div className="flex justify-between mt-1">
        <span className="text-xs text-slate-700 dark:text-white">
          {storageUsedGb} GB / {storageAvailableGb} GB
        </span>
      </div>
    </div>
  );
};

export default Navbar;
