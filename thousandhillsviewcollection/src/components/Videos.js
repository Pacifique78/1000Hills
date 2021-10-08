import React, { useState } from "react";
import ReactPlayer from "react-player";
import Video from "./Video";
import { HiSearch } from "react-icons/hi";
import { GrFormNextLink } from "react-icons/gr";

const Videos = () => {
  const [mainVideo, setMainVideo] = useState(
    `${process.env.REACT_APP_BACKEND_URL}/uploads/LakeKivu.mp4`
  );
  return (
    <div className="w-full">
      <ReactPlayer
        className="m-auto p-10 object-cover"
        width="70%"
        height="650px"
        url={mainVideo}
        playIcon={<button>Play</button>}
        playing
        controls
        muted
      />
      <div
        className="flex justify-between m-auto px-10"
        style={{ width: "70%" }}
      >
        <div className="flex items-center text-gray-500">
          <HiSearch />
          <input
            className="outline-none placeholder-gray-500 pl-2"
            type="text"
            placeholder="Search Video"
          />
        </div>
        <select className="outline-none text-main-button-color">
          <option>ALL Categories</option>
          <option>Extrem</option>
          <option>Travel</option>
        </select>
      </div>
      <div className="flex justify-center m-auto" style={{ width: "70%" }}>
        <Video
          width="30%"
          url={`${process.env.REACT_APP_BACKEND_URL}/uploads/LakeKivu.mp4`}
          name="Lake Kivu"
          clicked={() =>
            setMainVideo(
              `${process.env.REACT_APP_BACKEND_URL}/uploads/LakeKivu.mp4`
            )
          }
        />
        <Video
          width="30%"
          url={`${process.env.REACT_APP_BACKEND_URL}/uploads/SorwatheTeaFactory.mp4`}
          name="Cyohoha Tea Plantation"
          clicked={() =>
            setMainVideo(
              `${process.env.REACT_APP_BACKEND_URL}/uploads/SorwatheTeaFactory.mp4`
            )
          }
        />
        <Video
          width="30%"
          url={`${process.env.REACT_APP_BACKEND_URL}/uploads/LakeKivuGisenyi.mp4`}
          name="Ikirenge Cya Ruganzu"
          clicked={() =>
            setMainVideo(
              `${process.env.REACT_APP_BACKEND_URL}/uploads/LakeKivuGisenyi.mp4`
            )
          }
        />
      </div>
      <div className="flex justify-end m-auto px-10" style={{ width: "70%" }}>
        <div className="flex items-center cursor-pointer">
          <span className="pr-2">Next</span>
          <GrFormNextLink size="30" />
        </div>
      </div>
    </div>
  );
};

export default Videos;
