import { GET_NAVIGATION, GET_NAVIGATION_TYPE } from "@data/navigation/query";
import { RepositoryParam, RepositoryHOF } from "repositories";

class NavigationRepository {
  static GetNavigation(param?: RepositoryParam) {
    return RepositoryHOF(GET_NAVIGATION, GET_NAVIGATION_TYPE, param);
  }
}

export default NavigationRepository;
