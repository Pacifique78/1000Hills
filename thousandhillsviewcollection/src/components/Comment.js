import React, { useState } from "react";
import TintEditor from "./TintEditor";
import Rating from "react-rating";
import { BsStar, BsStarFill } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { SiTwitter } from "react-icons/si";
import Button from "./Button";

const Comment = (props) => {
  const [expanded, setExpanded] = useState("hidden");
  const changeVisual = (value) => {
    setExpanded(value);
  };
  return (
    <div className="w-2/5 bg-gray-300 rounded-xl m-10 box-border p-2">
      <span className="font-bold text-gray-700 flex justify-start p-2">
        0 comments
      </span>
      <div className="flex">
        <div className="w-20 h-20 mx-1 rounded-lg overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src={`${process.env.REACT_APP_BACKEND_URL}${props.profile}`}
          />
        </div>
        <div className="flex flex-col items-start">
          <div className="">
            <TintEditor clicked={changeVisual} />
          </div>
          <div className={`${expanded} flex-col items-start w-full`}>
            <Rating
              className="py-2"
              emptySymbol={<BsStar color="rgba(81, 113, 75, 1)" />}
              fullSymbol={<BsStarFill color="rgba(81, 113, 75, 1)" />}
            />
            <span className="font-bold text-xs text-gray-700">
              CONNECT WITH
            </span>
            <div className="flex">
              <div className="p-2 border border-main-button-color rounded-md my-2 mr-2 bg-white">
                <FcGoogle />
              </div>
              <div className="p-2 border border-main-button-color rounded-md my-2 mr-2 bg-white">
                <SiTwitter color="#1DA1F2" />
              </div>
            </div>
            <span className="font-bold text-xs text-gray-700">
              OR ENTER YOUR DETAILS
            </span>
            <input
              type="text"
              placeholder="Your name"
              className="w-full rounded-sm p-1 font-bold my-1 outline-none text-gray-700"
            />
            <input
              type="email"
              placeholder="Your email"
              className="w-full rounded-sm p-1 font-bold my-1 outline-none text-gray-700"
            />
            <Button type="action">Comment</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
