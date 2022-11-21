import { INavigationModel } from "@data/navigation/model";
import NavigationSectionView from "./view";
import useNavigationSectionViewModel from "./viewModel";

const NavigationSection = ({
  sectionData,
  marginTier,
}: {
  sectionData: INavigationModel[] | null | undefined;
  marginTier?: number;
  mouseEnteredSection?: boolean;
}): JSX.Element => {
  const viewModel = useNavigationSectionViewModel(sectionData);

  return (
    <NavigationSectionView
      sectionData={sectionData}
      viewModel={viewModel}
      marginTier={marginTier}
    />
  );
};

export default NavigationSection;

const NavigationSectionSkeleton = (): JSX.Element => {
  return <div className={`animate-pulse`}>Loading</div>;
};

export { NavigationSectionSkeleton };
