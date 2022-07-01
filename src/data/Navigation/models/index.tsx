import INavigationModel from "./interface";

class NavigationModel implements INavigationModel {
  displayName: string;

  constructor() {
    this.displayName = "";
  }
}

export default NavigationModel;
