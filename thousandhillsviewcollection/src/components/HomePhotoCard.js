import React, { useCallback, useState } from "react";

const HomePhotoCard = (props) => {
  const [image, setImage] = useState(
    `${process.env.REACT_APP_BACKEND_URL}${
      props.images[Math.floor(Math.random() * props.images.length)]
    }`
  );
  let interval;
  const handleMouseOver = useCallback(() => {
    interval = setInterval(() => {
      setImage(
        `${process.env.REACT_APP_BACKEND_URL}${
          props.images[Math.floor(Math.random() * props.images.length)]
        }`
      );
    }, 500);
  }, []);
  const handleMouseLeave = useCallback(() => {
    clearInterval(interval);
    interval = 0;
  }, []);
  return (
    <div className="flex flex-col m-3 justify-center items-center">
      <div
        className="w-72 h-56 cursor-pointer"
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
        onClick={() => {
          props.history.push(`/gallery/${props.name}`);
        }}
      >
        <img className="w-full h-full object-cover" src={image} />
      </div>
      <span className="font-medium text-main-button-color text-xs p-2">
        Album No.{props.albumNumber}
      </span>
      <div className="bg-main-button-color h-px w-1/5"></div>
      <span className="text-2xl text-main-button-color font-bold italic font-serif p-2">
        {props.albumName}
      </span>
    </div>
  );
};

export default HomePhotoCard;
