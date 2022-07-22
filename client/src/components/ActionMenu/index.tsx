import { useContext, useState } from "react";
import {
  ActionMenuStore,
  IActionMenuStore,
} from "contexts/actionMenu.provider";

const ActionMenu = () => {
  const [actionIconWidth] = useState<number>(300);
  const { actionMenuState } = useContext<IActionMenuStore>(ActionMenuStore);

  return (
    <div
      className={`${
        actionMenuState.isActive ? "" : "hidden"
      } absolute bg-gray-50 p-4 z-10`}
      style={{
        left: actionMenuState.posX + 10,
        top: actionMenuState.posY,
        width: actionIconWidth,
        height: "auto",
      }}
    >
      asdf
    </div>
  );
};

export default ActionMenu;
