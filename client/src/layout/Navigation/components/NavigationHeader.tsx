import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faSnowflake } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const NavigationHeader = (): JSX.Element => {
  return (
    <>
      <Link to={"/"}>
        <div className={`mt-6 px-6 flex`}>
          <span
            // className={`text-xl text-white w-8 h-8 bg-violet-500 flex justify-center items-center rounded-full mr-2`}
            className={`text-xl text-black w-8 h-8 flex justify-center items-center rounded-full mr-2`}
          >
            <FontAwesomeIcon icon={faSnowflake as IconProp} />
          </span>
          <span className={`text-xl font-semibold`}>Frosty</span>
        </div>
      </Link>
    </>
  );
};

export default NavigationHeader;
