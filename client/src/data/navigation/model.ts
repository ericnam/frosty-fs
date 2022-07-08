import { IconDefinition } from "@fortawesome/free-regular-svg-icons";
import {
  faChartBar,
  faClock,
  // faFile,
  faFolder,
  faStar,
  faTrashCan,
  // faSun,
  faSnowflake,
} from "@fortawesome/free-regular-svg-icons";

interface INavigationModel {
  title: string;
  dropDown: boolean;
  icon: IconDefinition;
}

class NavigationModel implements INavigationModel {
  title: string;
  dropDown: boolean;
  icon: IconDefinition;

  constructor(gqlObject: any) {
    this.title = gqlObject.title;
    this.dropDown = gqlObject.dropDown;

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
