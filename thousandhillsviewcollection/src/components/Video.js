import React, { useState } from "react";
import ReactPlayer from "react-player";
import { BsFillPlayFill } from "react-icons/bs";

const Video = (props) => {
  const [display, setDisplay] = useState("hidden");
  return (
    <div
      style={{ width: props.width }}
      className="relative m-2 cursor-pointer"
      onClick={props.clicked}
      onMouseEnter={() => setDisplay("flex")}
      onMouseLeave={() => setDisplay("hidden")}
    >
      <ReactPlayer width="100%" height="200px" url={props.url} />
      <div
        className={`${display} absolute bg-black h-full w-full top-0 left-0 opacity-40`}
      ></div>
      <span
        className={`${display} absolute top-0 left-0 text-white p-2 w-full flex justify-start items-center`}
      >
        {props.name}
      </span>
      <BsFillPlayFill
        color="white"
        size="40"
        className={`${display} absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}
      />
    </div>
  );
};

export default Video;
