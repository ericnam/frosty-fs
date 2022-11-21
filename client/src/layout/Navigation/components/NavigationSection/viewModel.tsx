import { INavigationModel } from "@data/navigation/model";
import { useEffect, useState } from "react";

interface INavigationSectionViewModel {
  api: { onMouseEnterSection(): void; onMouseLeaveSection(): void };
  state: { mouseEntered: boolean };
}

const useNavigationSectionViewModel = (
  sectionData: INavigationModel[] | null | undefined,
  mouseEnteredSection?: boolean
): INavigationSectionViewModel => {
  /**
   * State
   */
  const [isFileSystem] = useState<boolean>(
    !!sectionData ? sectionData[0].isFileSystem : false
  );
  const [mouseEntered, setMouseEntered] = useState<boolean>(false);

  /**
   * Effects
   */
  useEffect(() => {
    if (!!mouseEnteredSection) {
      setMouseEntered(mouseEnteredSection);
    }
  }, [mouseEnteredSection]);

  /**
   * Event Handlers
   */
  function onMouseEnterSection() {
    if (isFileSystem && !mouseEnteredSection) {
      setMouseEntered(true);
    }
  }
  function onMouseLeaveSection() {
    if (isFileSystem && !mouseEnteredSection) {
      setMouseEntered(false);
    }
  }

  return {
    api: { onMouseEnterSection, onMouseLeaveSection },
    state: {
      mouseEntered,
    },
  };
};

export default useNavigationSectionViewModel;
export { INavigationSectionViewModel };
