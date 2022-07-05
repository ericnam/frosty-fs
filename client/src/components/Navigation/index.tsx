import useViewModel from "./viewModel";

const NavigationComponent = (): JSX.Element => {
  const { data, api } = useViewModel();

  return <div onClick={api.getNavigationItems}>{data}</div>;
};

export default NavigationComponent;
