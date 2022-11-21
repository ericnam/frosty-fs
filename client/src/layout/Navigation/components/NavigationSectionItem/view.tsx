import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { memo } from "react";
import { NavLink } from "react-router-dom";
import NavigationSection from "../NavigationSection";
import { INavigationSectionItemViewModel } from "./viewModel";

/**
 *
 * @param param0
 * @returns
 */
const NavigationSectionItemView = ({
  viewModel,
  marginTier,
}: {
  viewModel: INavigationSectionItemViewModel;
  marginTier: number;
}) => {
  let { api, state, model } = viewModel;

  return (
    <div
      className={`float-left w-full relative ${model.isFileSystem ? "" : ""}`}
    >
      {/* 
        Primary navigation item
      */}
      <ItemContainer
        link={model.route}
        isFileDirectory={model.isFileSystem}
        marginTier={marginTier}
      >
        <span className={`mr-3`}>
          <FontAwesomeIcon icon={model.icon as IconProp} />
        </span>
        <span>{model.title}</span>
      </ItemContainer>

      {/* 
        Carat drop down icon (for dropdown nav items)
      */}
      {model.dropDown && (
        <>
          <span
            className={`absolute z-10 left-0 py-2 font-sans text-sm text-gray-800 ${
              !state.dropdownActive ? "-rotate-90" : "rotate-0"
            }`}
            style={{
              marginLeft: 10 + marginTier * 15,
            }}
            onClick={api.toggleDropdown}
          >
            <FontAwesomeIcon icon={faAngleDown as IconProp} />
          </span>
          <MarginLines marginTier={marginTier} navigationTitle={model.title} />
        </>
      )}

      {/* 
        If file system, recursively populate child directories
      */}
      <div className={`${state.childDirectoriesLoaded ? "block" : "hidden"}`}>
        {state.childDirectoriesLoaded ? (
          !!model.childDirectories && model.childDirectories.length > 0 ? (
            <div className={`${state.dropdownActive ? "block" : "hidden"}`}>
              <NavigationSection
                sectionData={model.childDirectories}
                marginTier={marginTier + 1}
              />
            </div>
          ) : (
            <></>
          )
        ) : (
          <div>Loading Dir</div>
        )}
      </div>
    </div>
  );
};

export default NavigationSectionItemView;

/**
 * Navigation item container that uses react-router-dom NavLink to point to user defined route
 * @param param0
 * @returns
 */
const ItemContainer = ({
  children,
  link,
  isFileDirectory,
  marginTier,
}: any): JSX.Element => {
  return (
    <NavLink
      to={`/${link}`}
      className={({ isActive }) =>
        `z-0 relative float-left w-full hover:bg-gray-100 py-2 font-sans text-sm text-gray-800 cursor-pointer flex-1  ${
          isActive ? "font-semibold text-violet bg-violet-50" : ""
        }
        ${isFileDirectory ? "" : ""}`
      }
      style={{
        paddingLeft: 30 + marginTier * 15,
      }}
    >
      {children}
    </NavLink>
  );
};

/**
 *
 * @param param0
 * @returns
 */
const MarginLines = ({ marginTier, navigationTitle }: any) => {
  return (
    <div className={`absolute h-full z-10`} style={{ marginLeft: 14 }}>
      {[...Array(marginTier)].map((_, index) => {
        return (
          <div
            key={`${navigationTitle}-margin-tier-${index}`}
            style={{ marginLeft: index == 0 ? 0 : 13 }}
            className={
              "float-left h-full border-l-2 border-dotted border-violet-200 box-border"
            }
          ></div>
        );
      })}
    </div>
  );
};

export { ItemContainer };
