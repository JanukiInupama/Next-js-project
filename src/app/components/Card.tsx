"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { toggleLike } from '../redux/likesSlice';
import { RootState } from '../redux/store';

import Modal from './Modal';

type CardProps = {
  id: string;
  imageSrc: string;
  altText: string;
};

const Card: React.FC<CardProps> = ({ id, imageSrc, altText }) => {
  const dispatch = useDispatch();
  const card = useSelector((state: RootState) =>
    state.likes.cards.find(card => card.id === id) || { count: 0, liked: false }
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLike = () => {
    dispatch(toggleLike(id));
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className="bg-white shadow-md rounded-lg p-5 w-full md:w-1/3 max-w-sm">
        <div 
          className="relative w-full h-96 cursor-pointer" 
          onClick={openModal}
        > 
          <Image
            src={imageSrc}
            alt={altText}
            layout="fill"
            objectFit="contain"
            className="rounded-lg"
          />
        </div>

        {/* Like Button and Count */}
        <div className="flex items-center space-x-4 mt-4">
          <button
            onClick={handleLike}
            className={`py-2 px-4 rounded ${card.liked ? 'bg-blue-700' : 'bg-blue-500'} hover:bg-blue-700 text-white font-bold`}
          >
            {card.liked ? 'Unlike' : 'Like'}
          </button>
          <span className="text-gray-700 font-semibold">{card.count} likes</span>
        </div>
      </div>

      {/* Render Modal outside the carousel */}
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <div className="flex flex-col items-center">
            <Image
              src={imageSrc}
              alt={altText}
              width={400}
              height={400}
              objectFit="contain"
              className="rounded-lg mb-4"
            />
            <h2 className="text-xl font-bold mb-4">{altText}</h2>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleLike}
                className={`py-2 px-4 rounded ${card.liked ? 'bg-blue-700' : 'bg-blue-500'} hover:bg-blue-700 text-white font-bold`}
              >
                {card.liked ? 'Unlike' : 'Like'}
              </button>
              <span className="text-gray-700 font-semibold">{card.count} likes</span>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default Card;
