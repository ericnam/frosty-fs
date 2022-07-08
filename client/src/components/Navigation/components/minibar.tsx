import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faMagnifyingGlass, faBell, faGear } from "@fortawesome/free-solid-svg-icons";
import { IconDefinition } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MiniBar = (): JSX.Element => {
  return (
    <div
      className={
        "h-screen w-20 border-r flex flex-col justify-center items-center"
      }
    >
      <MiniBarButton icon={faBell} />
      <MiniBarButton icon={faMagnifyingGlass} />
      <MiniBarButton icon={faGear} />
    </div>
  );
};

const MiniBarButton = ({ icon }: { icon: IconDefinition }): JSX.Element => {
  return (
    <span
      className={
        "text-violet-500 bg-violet-50 hover:bg-violet-100 w-12 h-12 rounded-xl my-1 flex justify-center items-center cursor-pointer"
      }
    >
      <FontAwesomeIcon icon={icon as IconProp} fontSize="20" />
    </span>
  );
};

export default MiniBar;
