import React from "react";

const HomePhoto = (props) => {
  return (
    <div className="w-80 h-44">
      <img
        className="w-full h-full object-cover p-3"
        src={props.image}
        alt={props.image}
      />
    </div>
  );
};

export default HomePhoto;
