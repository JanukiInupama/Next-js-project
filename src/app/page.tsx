"use client";

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from './components/Header';
import Banner from './components/Banner';
import Text from './components/Text';
import ResponsiveCardLayout from './components/ResponsiveCardLayout';
import Footer from './components/Footer';
import { AppDispatch, RootState } from './redux/store';
import { fetchCards } from './redux/likesSlice';

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { cards, status, error } = useSelector((state: RootState) => state.likes);

  useEffect(() => {
    dispatch(fetchCards());
  }, [dispatch]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className='md:space-y-6'>
        <Banner />
        
        <Text content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." />
        
        {status === 'loading' && <p>Loading...</p>}
        {status === 'failed' && <p>Error: {error}</p>}
        {status === 'succeeded' && <ResponsiveCardLayout cards={cards} />}
        
        <Text 
          content="Lorem ipsum odor amet, consectetuer adipiscing elit. Commodo scelerisque elit habitasse quisque elementum non senectus. Dictum fames cras condimentum convallis ultrices, per dolor. Elit vehicula sagittis accumsan malesuada sapien litora maximus ullamcorper. Ipsum sodales vestibulum pretium finibus odio finibus tortor. Ante interdum ac placerat fusce donec mus curabitur; ante ornare. At etiam habitasse scelerisque parturient fermentum tempus aenean. Vel himenaeos vel convallis purus massa vitae nulla torquent. Convallis semper orci, proin habitasse eleifend mus iaculis laoreet."           
          mobileNote="Note: Lorem ipsum odor amet..." 
        />
      </main>
      <Footer />
    </div>
  );
};

export default Home;