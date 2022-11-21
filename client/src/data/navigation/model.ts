import { IconDefinition } from "@fortawesome/free-regular-svg-icons";
import {
  faClock,
  // faFile,
  faFolder,
  faStar,
  faTrashCan,
  faSnowflake,
} from "@fortawesome/free-regular-svg-icons";

export interface INavigationModel {
  title: string;
  dropDown: boolean;
  icon: IconDefinition;
  route: string;
  section: number;
  isFileSystem: boolean;
  directoryId: string | null;
}

class NavigationModel implements INavigationModel {
  title: string;
  dropDown: boolean;
  icon: IconDefinition;
  route: string;
  section: number;
  isFileSystem: boolean;
  directoryId: string | null;

  constructor(gqlObject: any) {
    this.title = gqlObject.title;
    this.dropDown = gqlObject.dropDown;
    this.route = gqlObject.route;
    this.section = gqlObject.section;
    this.isFileSystem = gqlObject.isFileSystem;
    this.directoryId = gqlObject.directoryId ?? null;

    switch (gqlObject.title) {
      case "Dashboard":
        this.icon = faSnowflake;
        break;
      case "My Files":
        this.icon = faFolder;
        this.directoryId = "root";
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
        this.icon = faFolder;
        break;
    }
  }
}

export { NavigationModel };
