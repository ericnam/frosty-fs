import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SearchBar = (): JSX.Element => {
  return (
    <div className={`w-1/2 flex relative`}>
      <input
        className={`px-4 py-3 w-full bg-gray-100 rounded-lg text-sm`}
        placeholder={"Search all files..."}
        type={"text"}
      />
      <span className={`absolute right-0 px-4 py-3 text-sm text-slate-500`}>
        <FontAwesomeIcon icon={faMagnifyingGlass as IconProp} />
      </span>
    </div>
  );
};

export default SearchBar;
