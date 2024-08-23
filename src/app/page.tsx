"use client";

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './redux/store';
import { fetchCards } from './redux/likesSlice';

import Header from './components/Header';
import Banner from './components/Banner';
import Text from './components/Text';
import ResponsiveCardLayout from './components/ResponsiveCardLayout';
import Footer from './components/Footer';
import Modal from './components/Modal';


const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { cards, status, error } = useSelector((state: RootState) => state.likes);

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchCards());
  }, [dispatch]);

  useEffect(() => {
    if (status === 'failed') {
      setIsModalOpen(true); 
    }
  }, [status]);

  const handleRetry = () => {
    setIsModalOpen(false);
    dispatch(fetchCards()); 
  };

  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className='md:space-y-6'>
        <Banner />
        
        <Text content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." />
        
        {status === 'loading' && <p>Loading...</p>}
        {status === 'succeeded' && 
          <ResponsiveCardLayout cards={cards} />}
        
        <Text 
          content="Lorem ipsum odor amet, consectetuer adipiscing elit. Commodo scelerisque elit habitasse quisque elementum non senectus. Dictum fames cras condimentum convallis ultrices, per dolor. Elit vehicula sagittis accumsan malesuada sapien litora maximus ullamcorper. Ipsum sodales vestibulum pretium finibus odio finibus tortor. Ante interdum ac placerat fusce donec mus curabitur; ante ornare. At etiam habitasse scelerisque parturient fermentum tempus aenean. Vel himenaeos vel convallis purus massa vitae nulla torquent. Convallis semper orci, proin habitasse eleifend mus iaculis laoreet."           
          mobileNote="Note: Lorem ipsum odor amet..." 
        />
      </main>
      <Footer />
      

      <Modal isOpen={isModalOpen} onClose={closeModal}>

        <div className="flex flex-col items-center">
          
          <p className="text-red-500 text-lg mb-4">Error: failed to load</p>
          
          <button
            onClick={handleRetry}
            className="py-2 px-4 bg-blue-500 text-white rounded shadow">
            Try Again
          
          </button>
        
        </div>
      
      </Modal>
    
    </div>
  );
};

export default Home;
