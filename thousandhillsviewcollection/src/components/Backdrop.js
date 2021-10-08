import React from 'react';

const Backdrop = (props) =>
  props.show ? (
    <div
      className="fixed top-0 left-0 w-full h-full z-30 bg-black bg-opacity-70"
      onClick={props.clicked}
    ></div>
  ) : null;

export default Backdrop;