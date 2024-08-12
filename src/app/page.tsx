"use client";

import Header from './components/Header';
import Banner from './components/Banner';
import Text from './components/Text';
import ResponsiveCardLayout from './components/ResponsiveCardLayout';
import Footer from './components/Footer';

export default function Home() {
  const cards = [
    { imageSrc: "/images/image1.jpg", altText: 'image1' },
    { imageSrc: "/images/image2.jpg", altText: 'image2' },
    { imageSrc: "/images/image3.jpg", altText: 'image3' },
  ];

  return (
    <div className="min-h-screen flex flex-col">

      <Header />

      <main className='md:space-y-6'>

        <Banner />

        <Text content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." />

        <ResponsiveCardLayout cards={cards} /> 

        <Text content="Lorem ipsum odor amet, consectetuer adipiscing elit. Commodo scelerisque elit habitasse quisque elementum non senectus. Dictum fames cras condimentum convallis ultrices, per dolor. Elit vehicula sagittis accumsan malesuada sapien litora maximus ullamcorper. Ipsum sodales vestibulum pretium finibus odio finibus tortor. Ante interdum ac placerat fusce donec mus curabitur; ante ornare. At etiam habitasse scelerisque parturient fermentum tempus aenean. Vel himenaeos vel convallis purus massa vitae nulla torquent. Convallis semper orci, proin habitasse eleifend mus iaculis laoreet." 
                mobileNote="Note: Lorem ipsum odor amet, consectetuer adipiscing elit. Sociosqu montes ad sodales egestas turpis eget rhoncus. Cubilia molestie rhoncus; eu natoque praesent luctus. Magnis venenatis iaculis porta senectus maecenas donec platea. Facilisis eu sodales ligula massa odio est torquent eleifend posuere. Sociosqu potenti egestas taciti enim et. Ridiculus magnis velit vestibulum ac facilisi dis vestibulum sed. Primis velit sit consectetur ridiculus aliquam elit phasellus suspendisse. Efficitur conubia nulla nec cubilia id enim."/>

      </main>
      

      <Footer />

    </div>
  );
}