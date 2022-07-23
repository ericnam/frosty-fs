import { createContext, useReducer } from "react";

export interface IActionMenuState {
  isActive: boolean;
  menuWidth: number;
  posX: number;
  posY: number;
}
export interface IActionMenuAction {
  type: string;
  payload: IActionMenuActionPayload;
}
export interface IActionMenuActionPayload {
  x: number;
  y: number;
  elementWidth: number;
  isActive: boolean;
}
export interface IActionMenuStore {
  actionMenuState: IActionMenuState;
  dispatchActionMenuState: Function;
}

export enum ActionMenuActionType {
  TOGGLE = "TOGGLE",
  HIDE = "HIDE",
}
const reducer = (state: IActionMenuState, action: IActionMenuAction) => {
  switch (action.type) {
    case ActionMenuActionType.TOGGLE:
      let clientWidth = document.body.clientWidth;
      let menuWidth = state.menuWidth;
      let { x, y, elementWidth } = action.payload;

      let posX;

      if (x + elementWidth + menuWidth >= clientWidth) {
        posX = x - menuWidth - elementWidth;
      } else {
        posX = x + elementWidth;
      }

      return {
        ...state,
        posX,
        posY: y,
        isActive: !state.isActive,
      };
    case ActionMenuActionType.HIDE:
      return { ...state, isActive: false };
    default:
      break;
  }
};

export const ActionMenuStore = createContext<IActionMenuStore>({
  actionMenuState: { isActive: false, posX: 0, posY: 0, menuWidth: 250 },
  dispatchActionMenuState: () => {},
});

export const ActionMenuProvider = ({ children }: any) => {
  const [actionMenuState, dispatchActionMenuState] = useReducer<any>(reducer, {
    isActive: false,
    posX: 0,
    posY: 0,
    menuWidth: 250,
  } as IActionMenuState);

  return (
    <ActionMenuStore.Provider
      value={{
        actionMenuState: actionMenuState as IActionMenuState,
        dispatchActionMenuState,
      }}
    >
      {children}
    </ActionMenuStore.Provider>
  );
};
