// import { NavigationModel } from "@data/navigation/model";
// import { faSnowflake } from "@fortawesome/free-regular-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { IconProp } from "@fortawesome/fontawesome-svg-core";
// import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
// import { Link, useLocation } from "react-router-dom";
// import FileSystemNavbarItem from "./fileSystemNavbarItem";
// import { useEffect, useState } from "react";
// import { INavigationItemsBySection } from "services/navigation.service";
// import ItemContainer from "./itemContainer";

// interface NavbarParam {
//   navigationItemsBySection?: INavigationItemsBySection | null;
// }

// const Navbar = ({ navigationItemsBySection }: NavbarParam): JSX.Element => {
//   const location = useLocation();
//   const [fileTabOpen, setFileTabOpen] = useState(false);

//   useEffect(() => {
//     if (location.pathname.includes("my-files")) {
//       setFileTabOpen(true);
//     }
//   }, [location.pathname]);

//   return (
//     <div className={"w-80 h-screen bg-gray-900 text-white"}>
//       <NavbarHeader />
//       {!!navigationItemsBySection
//         ? Object.keys(navigationItemsBySection).map((section: any, index_1) => {
//             let navigationItems = navigationItemsBySection[section as number];
//             return (
//               <span key={index_1}>
//                 {navigationItems.map((navigationItem, index_2) => {
//                   if (navigationItem.isFileSystem) {
//                     return (
//                       <span key={index_1 + index_2}>
//                         <FileSystemNavbarItem
//                           title={navigationItem.title}
//                           // icon={navigationItem.icon}
//                           fileId={"root"}
//                           tier={0}
//                           isActive={fileTabOpen}
//                           isParentDropdownExpanded={true}
//                           tierDisplay={{}}
//                         />
//                       </span>
//                     );
//                   } else {
//                     return (
//                       <span key={index_1 + index_2}>
//                         <NavbarItem navigationItem={navigationItem} />
//                       </span>
//                     );
//                   }
//                 })}
//                 {index_1 !==
//                 Object.keys(navigationItemsBySection).length - 1 ? (
//                   <SectionDivider key={`divider_${index_1}`} />
//                 ) : null}
//               </span>
//             );
//           })
//         : null}
//     </div>
//   );
// };

// const NavbarItem = ({
//   navigationItem,
// }: {
//   navigationItem: NavigationModel;
// }) => {
//   return (
//     <Link to={`/${navigationItem.route}`}>
//       <ItemContainer>
//         <span className={`mr-3`}>
//           <FontAwesomeIcon icon={navigationItem.icon as IconProp} />
//         </span>
//         <span
//           className={
//             location.pathname === `/${navigationItem.route}`
//               ? "font-semibold text-gray-50"
//               : "font-normal"
//           }
//         >
//           {navigationItem.title}
//         </span>
//         {navigationItem.dropDown ? (
//           <span className={"float-right"}>
//             <FontAwesomeIcon icon={faAngleDown as IconProp} />
//           </span>
//         ) : (
//           false
//         )}
//       </ItemContainer>
//     </Link>
//   );
// };

// const NavbarHeader = (): JSX.Element => {
//   return (
//     <>
//       <Link to={"/my-files"}>
//         <div className={`mx-8 mt-8 mb-12 flex`}>
//           <span
//             className={`text-xl text-white w-8 h-8 bg-violet-500 flex justify-center items-center rounded-full mr-2`}
//           >
//             <FontAwesomeIcon icon={faSnowflake as IconProp} />
//           </span>
//           <span className={`text-xl font-semibold`}>Frosty FS</span>
//         </div>
//       </Link>
//     </>
//   );
// };

// const SectionDivider = (): JSX.Element => {
//   return <div className="my-6 border-t border-gray-800 w-full h-1"></div>;
// };

// export default Navbar;
