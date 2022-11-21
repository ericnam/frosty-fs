import { INavigationModel } from "@data/navigation/model";
import NavigationSectionItem from "./NavigationSectionItem";

const NavigationSection = ({
  sectionData,
  marginTier,
  mouseEnteredSection,
}: {
  sectionData: INavigationModel[] | null;
  marginTier?: number;
  mouseEnteredSection: boolean;
}): JSX.Element => {
  return (
    <>
      {!!sectionData &&
        sectionData.map((navigationModel, index) => (
          <NavigationSectionItem
            key={`section-item-${index}`}
            navigationModel={navigationModel}
            marginTier={marginTier ?? 0}
            mouseEnteredSection={mouseEnteredSection}
          />
        ))}
    </>
  );
};

export default NavigationSection;

const NavigationSectionSkeleton = (): JSX.Element => {
  return <div className={`animate-pulse`}>Loading</div>;
};

export { NavigationSectionSkeleton };
