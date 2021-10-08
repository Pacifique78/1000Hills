import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const NavBarItem = (props) => {
  const [hovered, setHovered] = useState(false);
  let classes =
    "m-2 px-8 py-2 border rounded-full bg-white text-gray-600 cursor-pointer";
  if (props.active || hovered) {
    classes = "m-2 px-8 py-2 rounded-full bg-nav-link-active cursor-pointer";
  }
  return (
    <NavLink
      onMouseOver={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={classes}
      activeClassName="bg-nav-link-active"
      to={props.link}
      exact
    >
      {props.name}
    </NavLink>
    // <li
    //   className={classes}
    // >
    //   <Link to={props.link}>{props.name}</Link>
    // </li>
  );
};

export default NavBarItem;
