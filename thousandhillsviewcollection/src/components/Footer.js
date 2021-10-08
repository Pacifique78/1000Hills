import React from 'react';
import { FaFacebookF } from 'react-icons/fa';
import { FiInstagram } from 'react-icons/fi';
import { useHistory } from 'react-router';
import Button from './Button';

const Footer = (props) => {
  const history = useHistory();

  const logout = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    localStorage.removeItem('role');
    history.push('/');
    window.location.reload();
  };
  return (
    <div className="m-auto flex justify-around items-center py-10 bg-main-button-color text-white">
      <span>© 2021 by 1000 Hills View</span>
      {props.isAuthenticated ? (
        <button className="text-white" onClick={logout}>
          Logout
        </button>
      ) : null}
      <div className="flex">
        <a
          target="_blank"
          href="https://www.facebook.com/people/Noella-Promise-Claizo/100009298528375/"
          rel="noreferrer"
        >
          <FaFacebookF className="m-2" size="20" />
        </a>
        <a
          target="_blank"
          href="https://www.instagram.com/noella_promise/"
          rel="noreferrer"
        >
          <FiInstagram className="m-2" size="20" />
        </a>
      </div>
    </div>
  );
};

export default Footer;
