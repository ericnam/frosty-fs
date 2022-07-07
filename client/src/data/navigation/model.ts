interface INavigationModel {
  displayName: string;
}

class NavigationModel implements INavigationModel {
  displayName: string;

  constructor() {
    this.displayName = "";
  }
}

export default NavigationModel;
