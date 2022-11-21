import useNavigationViewModel from "./Navigation.viewModel";
import NavigationView from "./Navigation.view";

const NavigationComponent = (): JSX.Element => {
  const viewModel = useNavigationViewModel();

  return <NavigationView viewModel={viewModel} />;
};

export default NavigationComponent;
