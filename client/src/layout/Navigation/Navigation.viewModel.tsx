import { INavigationModel } from "@data/navigation/model";
import { GET_NAVIGATION, GET_NAVIGATION_TYPE } from "@data/navigation/query";
import { useEffect, useState } from "react";
import { useLazyQuerySingleObj } from "repositories";
import {
  INavigationBySection,
  processNavigationData,
} from "services/navigation.service";

interface INavigationViewModel {
  data: INavigationBySection | null;
  loading: boolean;
}

const useNavigationViewModel = (): INavigationViewModel => {
  /**
   * State
   */
  const [navigationBySection, setNavigationBySection] =
    useState<INavigationBySection | null>(null);
  const [viewModelLoading, setViewModelLoading] = useState<boolean>(true);

  /**
   * Queries
   */
  const [getNavigationItems, { data, loading, error }] =
    useLazyQuerySingleObj<INavigationModel>(
      GET_NAVIGATION,
      GET_NAVIGATION_TYPE
    );

  // Initial Load
  useEffect(() => {
    getNavigationItems();
  }, []);

  // Process Data
  useEffect(() => {
    if (!loading && !!data) {
      setNavigationBySection(processNavigationData(data));
    }
  }, [data, loading]);

  // Set Viewmodel Loading State
  useEffect(() => {
    if (!!navigationBySection && !!!error) {
      setViewModelLoading(false);
    } else if (!!error) {
      setViewModelLoading(true);
    }
  }, [navigationBySection, error]);

  return {
    data: navigationBySection,
    loading: viewModelLoading,
  };
};

export default useNavigationViewModel;
export { INavigationViewModel };
