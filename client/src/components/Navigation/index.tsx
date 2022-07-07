import useViewModel from "./viewModel";

const NavigationComponent = (): JSX.Element => {
  const { data } = useViewModel();

  console.log(data.navigation);

  if (!!data.navigation.loading) {
    return <div>loading</div>;
  } else {
    return <div className={"bg-red"}>Navigation</div>;
  }
};

export default NavigationComponent;
