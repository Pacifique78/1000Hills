import React from "react";

const Button = (props) => {
  let classes =
    "px-8 py-px bg-transparent hover:bg-main-button-color text-main-button-color hover:text-white border border-main-button-color hover:border-opacity-0 font-medium rounded";
  if (props.type === "action") {
    classes =
      "px-8 py-px bg-main-button-color hover:bg-transparent text-white hover:text-main-button-color border hover:border-main-button-color border-opacity-0 font-medium rounded";
  }
  return (
    <button className={classes} onClick={props.clicked}>
      {props.children}
    </button>
  );
};

export default Button;
