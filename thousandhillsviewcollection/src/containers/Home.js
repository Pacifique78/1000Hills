import React, { useCallback, useEffect, useState } from 'react';
import HomePhoto from '../components/HomePhoto';
import Navbar from '../components/NavBar/Navbar';
import image1 from '../assets/images/53c598_87785380900045e49bd42aac1cadd474.webp';
import image2 from '../assets/images/cyohoha.jpg';
import image3 from '../assets/images/images.jpg';
import Button from '../components/Button';
import HomePhotoCard from '../components/HomePhotoCard';
import Footer from '../components/Footer';
import { useHistory } from 'react-router';
import Modal from '../components/Modal';
import axios from '../axios-base';
import Spinner from '../components/Spinner';

const Home = (props) => {
  const history = useHistory();
  const [isModalOpen, setIsModalOpen] = useState(!props.isAuthenticate);
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('User');
  const { setisAuthenticated } = props;
  useEffect(() => {
    const token = localStorage.getItem('jwt');
    const isAdmin = localStorage.getItem('role');
    if (token) {
      console.log(isAdmin === 'true');
      if (isAdmin === 'true') {
        setisAuthenticated(true);
        history.push('/admin');
      } else {
        setIsModalOpen(false);
        setisAuthenticated(true);
      }
    }
  }, [setisAuthenticated, history]);
  const authHandler = useCallback(() => {
    setIsLoading(true);
    setError(null);
    let data = {};
    let url = '';
    if (isSignup) {
      data = { name: name, email: email, phone: phone, password: password };
      url = '/api/auth/signup';
    } else {
      data = { email: email, password: password };
      url = '/api/auth/signin';
    }
    axios
      .post(url, data)
      .then((response) => {
        setIsLoading(false);
        localStorage.setItem('jwt', response?.data?.results?.token ?? '');
        localStorage.setItem('name', response?.data?.results?.name ?? '');
        localStorage.setItem('email', response?.data?.results?.email ?? '');
        localStorage.setItem('role', response?.data?.results?.isAdmin ?? '');
        setisAuthenticated(true);
        if (response?.data?.results?.isAdmin) {
          history.push('/admin');
        } else {
          setIsModalOpen(false);
        }
      })
      .catch((err) => {
        setIsLoading(false);
        localStorage.removeItem('jwt');
        setError(err?.response?.data ?? { error: 'Something wrong happened' });
        console.log(err.message);
      });
  }, [isSignup, name, email, phone, password, setisAuthenticated, history]);
  let form = null;
  if (isSignup) {
    form = (
      <div>
        <span className="text-header-color text-xl font-bold font-serif p-2">
          Sign Up
        </span>
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <input
              className="w-full m-1 p-2 placeholder-gray-500 font-bold rounded outline-none border"
              type="text"
              placeholder="Name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            <input
              className="w-full m-1 p-2 placeholder-gray-500 font-bold rounded outline-none border"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <input
              className="w-full m-1 p-2 placeholder-gray-500 font-bold rounded outline-none border"
              type="text"
              placeholder="Phone"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
            />
            <input
              className="w-full m-1 p-2 placeholder-gray-500 font-bold rounded outline-none border"
              type="password"
              placeholder="*******"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </>
        )}
        {error ? (
          <span className="text-header-color text-sm font-bold font-serif p-2 block">
            {error.error}
          </span>
        ) : null}
        <Button clicked={authHandler}>Sign Up</Button>
        <div>
          <span>Already have an account?</span>
          <span
            className="pl-2 cursor-pointer hover:underline text-header-color"
            onClick={() => setIsSignup(false)}
          >
            Sign In
          </span>
        </div>
      </div>
    );
  } else {
    form = (
      <div>
        <span className="text-header-color text-xl font-bold font-serif p-2">
          Sign In
        </span>
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <input
              className="w-full m-1 p-2 placeholder-gray-500 font-bold rounded outline-none border"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <input
              className="w-full m-1 p-2 placeholder-gray-500 font-bold rounded outline-none border"
              type="password"
              placeholder="*******"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <select
              className="w-full m-1 p-2 placeholder-gray-500 font-bold rounded outline-none border"
              value={role}
              onChange={(event) => setRole(event.target.value)}
            >
              <option value="Admin">Admin</option>
              <option value="User">User</option>
            </select>
          </>
        )}

        {error ? (
          <span className="text-header-color text-sm font-bold font-serif p-2 block">
            {error.error}
          </span>
        ) : null}
        <Button clicked={authHandler}>Sign In</Button>
        <div>
          <span>Don't have an account?</span>
          <span
            className="pl-2 cursor-pointer hover:underline text-header-color"
            onClick={() => setIsSignup(true)}
          >
            Sign Up
          </span>
        </div>
      </div>
    );
  }
  return (
    <div>
      <Modal show={isModalOpen} small>
        {form}
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
        <div className="flex flex-col">
          <span className="text-header-color text-4xl font-bold italic font-serif p-2">
            Thousand
          </span>
          <span className="text-header-color text-4xl font-bold italic font-serif p-2">
            Hills View
          </span>
        </div>
        <div className="flex justify-center ">
          <HomePhoto image={image1} />
          <HomePhoto image={image2} />
          <HomePhoto image={image3} />
        </div>
        <div className="p-20">
          <span
            style={{ padding: '50px !important' }}
            className="text-header-color text-4xl italic"
          >
            YOUR MEMORIES OUR PRIORITY
          </span>
        </div>
        <div className="p-10">
          <Button
            clicked={() => {
              history.push('/places');
            }}
          >
            GET IN THE MOOD
          </Button>
        </div>
      </div>
      <div className="container m-auto box-border bg-gradient-to-br from-gradient-1 via-gradient-3 to-gradient-4">
        <div className="flex justify-center items-center p-5">
          <HomePhotoCard
            {...props}
            images={[
              '/uploads/kivu.jpg',
              '/uploads/kivu2.jpg',
              '/uploads/kivu3.jpg',
            ]}
            albumNumber="1"
            albumName="Lake Kivu"
            name="kivu"
          />
          <HomePhotoCard
            {...props}
            images={[
              '/uploads/cyohoha.jpg',
              '/uploads/cyohoha2.jpg',
              '/uploads/cyohoha3.jpg',
            ]}
            albumNumber="2"
            albumName="Cyohoha Tea Plantation"
            name="tea"
          />
          <HomePhotoCard
            {...props}
            images={[
              '/uploads/ruganzu.jpg',
              '/uploads/ruganzu2.jpg',
              '/uploads/ruganzu3.jpg',
            ]}
            albumNumber="3"
            albumName="Ikirenge cya Ruganzu"
            name="foot"
          />
        </div>
        <div className="w-full flex justify-center items-center p-12">
          <div className=" w-2/3 border-8 rounded-3xl border-violent-color p-4">
            <span>
              Thousands hills view collection website is new modality of helping
              the Tourists, travelers and foreigners to resolve visits and place
              Issues, It utilize the power and convenience of internet to allow
              the Tourists to know the unknown or hidden places they can visit,
              and well as cultural activities and centers.
            </span>
          </div>
        </div>
      </div>
      <Footer {...props} />
    </div>
  );
};

export default Home;
