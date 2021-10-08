import React, { useEffect } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/NavBar/Navbar';

const Gallery = (props) => {
  const { name } = props.match.params;
  const places = [
    {
      number: '01',
      name: 'Lake Kivu',
      nickname: 'kivu',
      images: ['/uploads/kivu.jpg', '/uploads/kivu2.jpg', '/uploads/kivu3.jpg'],
      description:
        'Lake Kivu is one of the African Great Lakes. It lies on the border between the Democratic Republic of the Congo and Rwanda, and is in the Albertine Rift, the western branch of the East African Rift. Lake Kivu empties into the Ruzizi River, which flows southwards into Lake Tanganyika. ',
    },
    {
      number: '02',
      name: 'Cyohoha Tea Plantation',
      nickname: 'tea',
      images: [
        '/uploads/cyohoha.jpg',
        '/uploads/cyohoha2.jpg',
        '/uploads/cyohoha3.jpg',
      ],
      description:
        "I'm a paragraph. Click here to add your own text and edit me. It’s easy. Just click “Edit Text” or double click me to add your own content and make changes to the font. Feel free to drag and drop me anywhere you like on your page. I’m a great place for you to tell a story and let your users know a little more about you.",
    },
    {
      number: '03',
      name: 'Ikirenge Cya Ruganzu',
      nickname: 'foot',
      images: [
        '/uploads/ruganzu.jpg',
        '/uploads/ruganzu2.jpg',
        '/uploads/ruganzu3.jpg',
      ],
      description:
        'Ikirenge cya Ruganzu is the name of landmark in Rwanda, Rulindo district in Rusiga sector. This place named after King Ruganzu II Ndili.',
    },
  ];
  const { isAuthenticated, history } = props;
  useEffect(() => {
    if (!isAuthenticated) {
      history.push('/');
      window.location.reload();
    }
  }, [isAuthenticated, history]);
  return (
    <div>
      <div
        className={`container bg-places-${name}-img h-3/4 w-full bg-no-repeat bg-cover`}
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
          <span className="text-white font-bold italic font-serif p-2">
            September 2021
          </span>
          <span className="text-white text-6xl font-bold italic font-serif p-2">
            {places.filter((place) => place.nickname === name)[0].name}
          </span>
        </div>
      </div>
      <div className="flex justify-center items-center w-3/4 m-auto p-20">
        <div className="flex box-border border-b border-main-button-color">
          <span className="text-main-button-color text-xs">
            {places.filter((place) => place.nickname === name)[0].number}
          </span>
        </div>
        <span className="box-border p-10 text-main-button-color pl-20">
          {places.filter((place) => place.nickname === name)[0].description}
        </span>
      </div>
      <div>
        {places
          .filter((place) => place.nickname === name)[0]
          .images.map((image) => (
            <div className="w-3/5 h-96 mx-auto my-5">
              <img
                className="w-full h-full object-cover"
                src={`${process.env.REACT_APP_BACKEND_URL}${image}`}
                alt=""
              />
            </div>
          ))}
      </div>
      <Footer {...props} />
    </div>
  );
};

export default Gallery;
