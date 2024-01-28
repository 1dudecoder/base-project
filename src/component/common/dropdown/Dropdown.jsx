import React, { useEffect, useState } from "react";
import "./Dropdown.css";

const NormalDropdown = ({
  myoptions,
  handleSelect,
  setselectedtags,
  selecttags,
  id,
}) => {
  const [show, setShow] = useState(true);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    console.log(options, "options---");
    if (myoptions && myoptions.length > 1) {
      setOptions(myoptions.split(","));
    }
  }, [myoptions]);

  // const handleSelect = (item) => {
  //   console.log(item);
  //   setShow(!show);
  // };

  const handleClick = (e) => {
    console.log(show, "myshow--");
    setShow(!show);
  };

  return (
    <div className="normal-dropdown">
      <div className="drop-button" onClick={handleClick}>
        <p>Select Tags</p>

        <div className={` ${show == true ? "arrow-down" : "arrow-up"}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="17"
            height="16"
            viewBox="0 0 17 16"
            fill="none"
          >
            <path
              d="M13 5.75L8.5 10.25L4 5.75"
              stroke="#999CA0"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>

        <div className={`dropdown-items ${show == false ? "show" : "hide"}`}>
          {options &&
            options.map((item) => {
              return (
                <>
                  <div
                    className="drop-item"
                    onClick={() => {
                      handleSelect(id, item);
                    }}
                  >
                    <p>{item}</p>
                  </div>
                </>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default NormalDropdown;
