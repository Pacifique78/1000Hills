import React, { useCallback, useEffect, useState } from 'react';
import Button from '../components/Button';
import Footer from '../components/Footer';
import Navbar from '../components/NavBar/Navbar';
import axios from '../axios-base';
import Spinner from '../components/Spinner';

const Contact = (props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated, history } = props;
  useEffect(() => {
    if (!isAuthenticated) {
      history.push('/');
      window.location.reload();
    }
  }, [isAuthenticated, history]);
  const sendMessage = useCallback(() => {
    setLoading(true);
    setResponse(null);
    axios
      .post('/api/messages', {
        name: name,
        email: email,
        phone: phone,
        message: message,
      })
      .then((response) => {
        setLoading(false);
        setEmail('');
        setName('');
        setPhone('');
        setMessage('');
        setResponse(response?.data?.message);
      })
      .catch((err) => {
        setLoading(false);
        setResponse(err?.message);
      });
  }, [name, email, phone, message]);
  return (
    <div>
      <div className="container bg-places-main-img h-3/4 w-full bg-no-repeat bg-cover">
        <Navbar />
        <div className="w-10 h-5 m-auto">
          <svg
            preserveAspectRatio="none"
            id="comp-ku6uclzvsvgcontent"
            data-bbox="4.3 53.8 191.6 93.2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="4.3 53.8 191.6 93.2"
            role="img"
          >
            <g>
              <path d="M195.9 147H4.3L40 96l11.2 10.1 23.9-34.2 9.6 8.1 18.2-26.2 43.4 58.4L160.8 95l35.1 52zm-178.2-7h165l-22.5-33.4-14.2 16.9-43-57.7-17 24.5-9.6-8.1-24.1 34.4-11.2-10.1L17.7 140z"></path>
            </g>
          </svg>
        </div>
        <div className="w-52 h-5 m-auto pl-40">
          <svg
            preserveAspectRatio="none"
            id="comp-ku6uclzvsvgcontent"
            data-bbox="4.3 53.8 191.6 93.2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="4.3 53.8 191.6 93.2"
            role="img"
          >
            <g>
              <path d="M195.9 147H4.3L40 96l11.2 10.1 23.9-34.2 9.6 8.1 18.2-26.2 43.4 58.4L160.8 95l35.1 52zm-178.2-7h165l-22.5-33.4-14.2 16.9-43-57.7-17 24.5-9.6-8.1-24.1 34.4-11.2-10.1L17.7 140z"></path>
            </g>
          </svg>
        </div>
        <div className="flex flex-col p-32">
          <span className="text-white text-6xl font-bold italic font-serif p-2">
            Leave a message
          </span>
        </div>
        <div className="m-auto w-3/5 pb-10">
          <input
            className="w-full m-1 p-2 placeholder-gray-500 font-bold rounded outline-none"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <input
            className="w-full m-1 p-2 placeholder-gray-500 font-bold rounded outline-none"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <input
            className="w-full m-1 p-2 placeholder-gray-500 font-bold rounded outline-none"
            type="text"
            placeholder="Phone"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
          />
          <textarea
            className="w-full m-1 p-2 placeholder-gray-500 font-bold rounded outline-none"
            placeholder="Enter your message"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          ></textarea>
          {loading ? <Spinner /> : null}
          {response ? <p className="text-white font-bold">{response}</p> : null}
          <Button type="action" clicked={sendMessage}>
            Submit
          </Button>
        </div>
      </div>
      <Footer {...props} />
    </div>
  );
};

export default Contact;
