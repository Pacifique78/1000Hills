import React, { useCallback, useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/NavBar/Navbar';
import axios from '../axios-base';
import Button from '../components/Button';
import Modal from '../components/Modal';
import Spinner from '../components/Spinner';
import { jsPDF } from 'jspdf';

const Adminpage = (props) => {
  const [newUsers, setNewUsers] = useState([]);
  const [activeUsersLogins, setActiveUsersLogins] = useState([]);
  const [messages, setMessages] = useState([]);
  const [replyTo, setReplyTo] = useState('');
  const [reply, setReply] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated, history } = props;
  useEffect(() => {
    if (!isAuthenticated) {
      history.push('/');
      window.location.reload();
    }
    axios
      .get('/api/users/today')
      .then((response) => {
        setNewUsers(response?.data?.results);
      })
      .catch((err) => {});
    axios
      .get('/api/users/active')
      .then((response) => {
        setActiveUsersLogins(response?.data?.results);
      })
      .catch((err) => {});
    axios
      .get('/api/messages')
      .then((response) => {
        setMessages(response?.data?.results);
      })
      .catch((err) => {});
  }, [isAuthenticated, history]);

  const replyBtnClicked = (id) => {
    setReplyTo(id);
    setIsModalOpen(true);
  };
  const sendReply = useCallback(() => {
    setLoading(true);
    setResponse(null);
    axios
      .patch(`/api/messages/${replyTo}`, {
        reply: reply,
      })
      .then((response) => {
        setLoading(false);
        setResponse(response?.data?.message);
        setIsModalOpen(false);
        window.location.reload();
      })
      .catch((err) => {
        setLoading(false);
        setResponse(err?.message);
      });
  }, [reply, replyTo]);
  const printDiv = ({ divId, title }) => {
    let mywindow = window.open(
      '',
      'PRINT',
      'height=650,width=900,top=100,left=150'
    );

    mywindow.document.write(`<html><head><title>${title}</title>`);
    mywindow.document.write('</head><body >');
    mywindow.document.write(document.getElementById(divId).innerHTML);
    mywindow.document.write('</body></html>');

    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/

    mywindow.print();
    mywindow.close();

    return true;
  };
  const downloadReport = () => {
    const doc = new jsPDF();
    const elementHandler = {
      '#ignorePDF': function (element, renderer) {
        return true;
      },
    };
    let source = printDiv({ divId: 'div1', title: 'DAILY REPORT' });
    doc.fromHTML(source, 15, 15, {
      width: 180,
      elementHandlers: elementHandler,
    });

    doc.save('report.pdf');
  };
  return (
    <div>
      <Modal show={isModalOpen} modalClosed={() => setIsModalOpen(false)} small>
        <textarea
          className="w-full m-1 mt-4 p-2 placeholder-gray-500 font-bold rounded border outline-none"
          placeholder="Enter your message"
          value={reply}
          onChange={(event) => setReply(event.target.value)}
        ></textarea>
        {loading ? <Spinner /> : null}
        {response ? <p>{response}</p> : null}
        <Button type="action" clicked={sendReply}>
          Send
        </Button>
      </Modal>
      <div
        className="container m-auto box-border"
        style={{ backgroundColor: 'rgb(237, 223, 228)' }}
      >
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
        <div id="div1" className="flex justify-around">
          <div className="rounded border border-header-color m-2 p-4 w-1/4">
            <span className="text-header-color text-xl font-bold italic font-serif p-2">
              New Users({newUsers?.length ?? 0})
            </span>
            <ul className="">
              {newUsers.map((user, index) => (
                <li
                  key={index}
                  className="p-3 m-3 bg-white rounded-lg shadow box-border"
                >
                  <span className="block">
                    <strong>Name:</strong> {user.name}
                  </span>
                  <span className="block">
                    <strong>Email:</strong> {user.email}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded border border-header-color m-2 p-4 w-1/4">
            <span className="text-header-color text-xl font-bold italic font-serif p-2">
              User who logged in today({activeUsersLogins?.length ?? 0})
            </span>
            <ul className="">
              {activeUsersLogins.map((login, index) => (
                <li
                  key={index}
                  className="p-3 m-3 bg-white rounded-lg shadow box-border"
                >
                  <span className="block">
                    <strong>Name:</strong> {login.user.name}
                  </span>
                  <span className="block">
                    <strong>Email:</strong> {login.user.email}
                  </span>
                  <span className="block">
                    <strong>Logins:</strong> {login.numberOfTimes}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <Button clicked={downloadReport}>Download Report</Button>
        <div className="rounded border border-header-color m-2 p-4 w-1/2 mx-auto">
          <span className="text-header-color text-xl font-bold italic font-serif p-2">
            Messages
          </span>
          <ul>
            {messages.map((message, index) => (
              <li
                key={index}
                className="p-3 m-3 bg-white rounded-lg shadow box-border"
              >
                <span className="block text-left">
                  <strong>Name:</strong> {message.name}
                </span>
                <span className="block text-left">
                  <strong>messages:</strong> {message.message}
                </span>
                <Button clicked={() => replyBtnClicked(message._id)}>
                  Reply
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Footer {...props} />
    </div>
  );
};

export default Adminpage;
