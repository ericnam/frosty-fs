import useViewModel from "./viewModel";
// import MiniBar from "./components/minibar";
import Navbar from "./components/navbar";

const NavigationComponent = (): JSX.Element => {
  const { data } = useViewModel();

  return (
    <div className={"flex flex-row"}>
      {/* <MiniBar /> */}
      <Navbar
        loading={data.navigation.loading}
        navigation={data.navigation.data}
      />
    </div>
  );
};

export default NavigationComponent;
