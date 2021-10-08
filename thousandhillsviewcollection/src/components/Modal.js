import React, { Fragment } from "react";
import { IoClose } from "react-icons/io5";
import Backdrop from "./Backdrop";

const Modal = (props) => {
  return (
    <Fragment>
      <Backdrop show={props.show} clicked={props.modalClosed} />
      <div
        className="fixed z-50 bg-white border border-solid border-gray-500 shadow p-4 box-border transition-all duration-300 ease-out rounded-lg"
        style={{
          top: "30%",
          left: props.small ? "38%" : "15%",
          width: props.small ? "25%" : "70%",
          transform: props.show ? "translate(0,0)" : "translate(-15%,-30%)",
          opacity: props.show ? "1" : "0",
        }}
      >
        <div
          className="absolute top-1 right-1 cursor-pointer"
          onClick={props.modalClosed}
        >
          <IoClose size={28} />
        </div>
        {props.children}
      </div>
    </Fragment>
  );
};

export default Modal;
