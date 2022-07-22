import { createContext, useState } from "react";

export interface IActionMenuState {
  isActive: boolean;
  posX: number;
  posY: number;
}
export interface IActionMenuStore {
  actionMenuState: IActionMenuState;
  setActionMenuState: Function;
}

export const ActionMenuStore = createContext<IActionMenuStore>({
  actionMenuState: { isActive: false, posX: 0, posY: 0 },
  setActionMenuState: () => {},
});

export const ActionMenuProvider = ({ children }: any) => {
  const [actionMenuState, setActionMenuState] = useState<IActionMenuState>({
    isActive: false,
    posX: 0,
    posY: 0,
  });

  return (
    <ActionMenuStore.Provider value={{ actionMenuState, setActionMenuState }}>
      {children}
    </ActionMenuStore.Provider>
  );
};
