import { NavigationModel } from "@data/navigation/model";
import { IGetNavigationItems } from "repositories/navigation.repository";

/**
 * Queries needed for service
 */
interface INavigationServiceQueries {
  _GetNavigationItems?: IGetNavigationItems;
}

export interface INavigationItemsBySection {
  [key: number]: NavigationModel[];
}

class NavigationService {
  private queries: INavigationServiceQueries | null = {};

  constructor(queries: INavigationServiceQueries) {
    this.queries = queries;
  }

  /**
   * Get navigation data
   * @returns
   */
  GetNavigationItemsBySection(): Promise<any> | undefined {
    return this.queries
      ?._GetNavigationItems?.()
      .then((data: NavigationModel[]) => {
        data = data.map((d) => new NavigationModel(d));
        return this.processNavigationItemsBySectionAndOrder(data);
      });
  }

  /**
   * Convert navigation items and organize them by section
   * @param navigationItems
   * @returns
   */
  private processNavigationItemsBySectionAndOrder(
    navigationItems: NavigationModel[]
  ): INavigationItemsBySection {
    let res: INavigationItemsBySection = {};

    let sections = navigationItems
      .filter((v, i, s) => s.indexOf(v) === i)
      .map((n) => n.section);

    for (let section of sections) {
      res[section] = navigationItems.filter((f) => f.section === section);
    }

    return res;
  }
}

export default NavigationService;
