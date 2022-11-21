// import { ApolloError } from "@apollo/client";
// import { GET_NAVIGATION, GET_NAVIGATION_TYPE } from "@data/navigation/query";
// import { staticImplements, AsyncRepositoryHOF2 } from "repositories";


// /**
//  * Repository Interface
//  */
// interface INavigationRepository {}
// interface INavigationRepositoryStatic {
//   new (): INavigationRepository;
//   GetNavigationItems(): IApolloResponse;
// }

// export type IGetNavigationItems = (variables?: any) => IApolloResponse;
// // Promise<any>;
// export type IApolloResponse = {
//   loading: boolean;
//   error: ApolloError | undefined;
//   data: any;
//   fetch: (variables: any) => void;
// };

// @staticImplements<INavigationRepositoryStatic>()
// class NavigationRepository {
//   static GetNavigationItems(): IApolloResponse {
//     return AsyncRepositoryHOF2(GET_NAVIGATION, GET_NAVIGATION_TYPE);
//   }
// }

// export default NavigationRepository;
