import React from "react";
import { FaFacebookF } from "react-icons/fa";
import { FiInstagram } from "react-icons/fi";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="m-auto flex justify-around items-center py-10 bg-main-button-color text-white">
      <span>© 2021 by 1000 Hills View</span>
      <div className="flex">
        <a
          target="_blank"
          href="https://www.facebook.com/people/Noella-Promise-Claizo/100009298528375/"
        >
          <FaFacebookF className="m-2" size="20" />
        </a>
        <a target="_blank" href="https://www.instagram.com/noella_promise/">
          <FiInstagram className="m-2" size="20" />
        </a>
      </div>
    </div>
  );
};

export default Footer;
