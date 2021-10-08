import React from "react";
import { BsArrowRight } from "react-icons/bs";

const Place = (props) => {
  const handleClick = (value) => {
    props.history.push(`/gallery/${value}`);
  };
  return (
    <div className="w-3/4 h-96 m-10">
      <div
        className="flex justify-between items-center my-3 cursor-pointer"
        onClick={() => handleClick(props.nickname)}
      >
        <span className="flex justify-center items-center">
          <div className="flex box-border border-b border-main-button-color">
            <span className="text-main-button-color text-xs">
              {props.number}
            </span>
          </div>
          <span className="pl-2 font-bold italic font-serif text-main-button-color">
            {props.name}
          </span>
        </span>
        <BsArrowRight onClick={() => handleClick(props.nickname)} />
      </div>
      <div
        className="h-full w-full cursor-pointer"
        onClick={() => handleClick(props.nickname)}
      >
        <img
          className="h-full w-full object-cover"
          src={`${process.env.REACT_APP_BACKEND_URL}${props.image}`}
        />
      </div>
    </div>
  );
};

export default Place;
