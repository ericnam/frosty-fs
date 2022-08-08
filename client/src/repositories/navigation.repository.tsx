import { GET_NAVIGATION, GET_NAVIGATION_TYPE } from "@data/navigation/query";
import { staticImplements, AsyncRepositoryHOF } from "repositories";

/**
 * Repository Interface
 */
interface INavigationRepository {}
interface INavigationRepositoryStatic {
  new (): INavigationRepository;
  GetNavigationItems(): IGetNavigationItems;
}

export type IGetNavigationItems = (variables?: any) => Promise<any>;

@staticImplements<INavigationRepositoryStatic>()
class NavigationRepository {
  static GetNavigationItems(): IGetNavigationItems {
    return AsyncRepositoryHOF(GET_NAVIGATION, GET_NAVIGATION_TYPE);
  }
}

export default NavigationRepository;
