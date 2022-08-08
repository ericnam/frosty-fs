import { IconDefinition } from "@fortawesome/free-regular-svg-icons";
import {
  faChartBar,
  faClock,
  // faFile,
  faFolder,
  faStar,
  faTrashCan,
  faSnowflake,
} from "@fortawesome/free-regular-svg-icons";

interface INavigationModel {
  title: string;
  dropDown: boolean;
  icon: IconDefinition;
  route: string;
  section: number;
  isFileSystem: boolean;
}

class NavigationModel implements INavigationModel {
  title: string;
  dropDown: boolean;
  icon: IconDefinition;
  route: string;
  section: number;
  isFileSystem: boolean;

  constructor(gqlObject: any) {
    this.title = gqlObject.title;
    this.dropDown = gqlObject.dropDown;
    this.route = gqlObject.route;
    this.section = gqlObject.section;
    this.isFileSystem = gqlObject.isFileSystem;

    switch (gqlObject.title) {
      case "Dashboard":
        this.icon = faSnowflake;
        break;
      case "My Files":
        this.icon = faFolder;
        break;
      case "Favorites":
        this.icon = faStar;
        break;
      case "Recents":
        this.icon = faClock;
        break;
      case "Trash":
        this.icon = faTrashCan;
        break;
      default:
        this.icon = faChartBar;
        break;
    }
  }
}

export { NavigationModel };
