import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NavigationHeader from "./components/NavigationHeader";
import NavigationSection, {
  NavigationSectionSkeleton,
} from "./components/NavigationSection";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { INavigationViewModel } from "./Navigation.viewModel";
const NavigationView = ({
  viewModel,
}: {
  viewModel: INavigationViewModel;
}): JSX.Element => {
  let { data, loading } = viewModel;

  return (
    <nav
      className={`flex flex-col w-80 h-screen text-black border-r border-solid no-select`}
    >
      <NavigationHeader />
      <button
        className={`bg-violet-500 hover:bg-violet-600 text-white text-sm font-medium mt-6 mx-6 py-3 rounded-lg`}
      >
        <FontAwesomeIcon icon={faPlus as IconProp} className="mr-2" />
        Add new
      </button>

      {loading ? (
        <NavigationSectionSkeleton />
      ) : (
        <>
          {!!data &&
            Object.keys(data).map((sectionNumber: any, index: number) => {
              let sectionData = !!data ? data[sectionNumber as number] : null;

              return (
                <div
                  key={`section-data-${index}`}
                  className={`mt-6 float-left w-full py-2 border-b last:border-none`}
                >
                  {!!data && (
                    <NavigationSection
                      key={`section-${sectionNumber}`}
                      sectionData={sectionData}
                    />
                  )}
                </div>
              );
            })}
        </>
      )}
    </nav>
  );
};

export default NavigationView;
