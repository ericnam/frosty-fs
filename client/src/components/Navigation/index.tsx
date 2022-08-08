import useViewModel from "./viewModel";
// import MiniBar from "./components/minibar";
import Navbar from "./components/navbar";

const NavigationComponent = (): JSX.Element => {
  const { data } = useViewModel();

  return (
    <div className={"flex flex-row"}>
      <Navbar navigationItemsBySection={data.navigationItemsBySection} />
    </div>
  );
};

export default NavigationComponent;
