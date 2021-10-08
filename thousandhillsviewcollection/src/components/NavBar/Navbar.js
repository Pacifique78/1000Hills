import React from "react";
import NavBarItem from "./NavBarItem";

const Navbar = () => {
  return (
    <nav className="p-5">
      <ul className="flex justify-center items-center">
        <NavBarItem name="Home" link="/" />
        <NavBarItem name="Places" link="/places" />
        <NavBarItem name="Videos" link="/videos" />
        <NavBarItem name="Contact" link="/contact" />
      </ul>
    </nav>
  );
};

export default Navbar;
