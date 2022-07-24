import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faGear, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const UserProfileAndSettings = (): JSX.Element => {
  return (
    <div className={`flex flex-row mr-5`}>
      <span
        className={`text-gray-300 flex items-center justify-center h-10 w-10 cursor-pointer hover:text-gray-500`}
      >
        <FontAwesomeIcon icon={faGear as IconProp} />
      </span>
      <span
        className={`text-gray-500 h-10 w-10 flex items-center justify-center rounded-full ml-4 bg-gray-100 cursor-pointer`}
      >
        <FontAwesomeIcon icon={faUser as IconProp} />
      </span>
    </div>
  );
};

export default UserProfileAndSettings;
