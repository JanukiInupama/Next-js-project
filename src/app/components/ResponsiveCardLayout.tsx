"use client";

import React from 'react';
import Card from './Card';

type CardProps = {
  id: string;
  imageSrc: string;
  altText: string;
};

type ResponsiveCardLayoutProps = {
  cards: CardProps[];
};

const ResponsiveCardLayout = ({ cards }: ResponsiveCardLayoutProps) => {
  const [isMobile, setIsMobile] = React.useState(false);
  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + cards.length) % cards.length);
  };

  if (isMobile) {
    return (
      <div className="relative w-full max-w-sm mx-auto overflow-hidden">
        <div 
          className="flex transition-transform duration-300 ease-in-out" 
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {cards.map((card) => (
            <div key={card.id} className="w-full flex-shrink-0">
              <Card id={card.id} imageSrc={card.imageSrc} altText={card.altText} />
            </div>
          ))}
        </div>
        <button 
          onClick={prevSlide} 
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow"
        >
          &lt;
        </button>
        <button 
          onClick={nextSlide} 
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow"
        >
          &gt;
        </button>
      </div>
    );
  }

  return (
    <div className="flex justify-center space-x-4">
      {cards.map((card) => (
        <Card key={card.id} id={card.id} imageSrc={card.imageSrc} altText={card.altText} />
      ))}
    </div>
  );
};

export default ResponsiveCardLayout;
