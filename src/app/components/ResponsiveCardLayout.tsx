"use client";

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { fetchCards } from '../redux/likesSlice';

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
  const dispatch = useDispatch<AppDispatch>();
  const { status, error } = useSelector((state: RootState) => state.likes);
  const [isMobile, setIsMobile] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCards());
    }
  }, [status, dispatch]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + cards.length) % cards.length);
  };

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (status === 'failed') {
    return <p>Error: {error}</p>;
  }

  if (isMobile) {
    return (
      <div className="relative w-full max-w-sm mx-auto">
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}>

            {cards.map((card) => (
              <div key={card.id} className="w-full flex-shrink-0">
                <Card id={card.id} imageSrc={card.imageSrc} altText={card.altText} />
              </div>
            ))}

          </div>
        </div>

        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow z-10">
          &lt;
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow z-10">
          &gt;
        </button>

      </div>
    );
  }

  return (
    <div className="flex justify-center items-stretch space-x-4 px-4">
      {cards.map((card) => (
        <div key={card.id} className="flex-1 max-w-sm">
          <Card id={card.id} imageSrc={card.imageSrc} altText={card.altText} />
        </div>
      ))}
    </div>
  );
};

export default ResponsiveCardLayout;


