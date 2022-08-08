const ItemContainer = ({ children }: any): JSX.Element => {
  return (
    <div
      className={`text-slate-300 hover:bg-gray-800 my-2 mx-6 px-3 py-2 rounded-lg font-sans text-sm cursor-pointer`}
    >
      {children}
    </div>
  );
};

export const FSItemContainer = ({ children }: any): JSX.Element => {
  return (
    <div
      className={`text-slate-300 hover:bg-gray-800 mx-6 rounded-lg font-sans text-sm cursor-pointer`}
    >
      {children}
    </div>
  );
};

export default ItemContainer;
