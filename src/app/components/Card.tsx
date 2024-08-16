"use client";

import React from 'react';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { toggleLike } from '../redux/likesSlice';
import { RootState } from '../redux/store';

type CardProps = {
  id: string;
  imageSrc: string;
  altText: string;
};

const Card: React.FC<CardProps> = ({ id, imageSrc, altText }) => {
  const dispatch = useDispatch();
  const likeState = useSelector((state: RootState) => state.likes.likes[id] || { count: 0, liked: false });

  const handleLike = () => {
    dispatch(toggleLike(id));
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-5 w-full md:w-1/3 max-w-sm">
      <div className="relative w-full h-96"> 
        <Image
          src={imageSrc}
          alt={altText}
          layout="fill"
          objectFit="contain"
          className="rounded-lg"
        />
      </div>
      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={handleLike}
          className={`py-2 px-4 rounded ${likeState.liked ? 'bg-blue-700' : 'bg-blue-500'} hover:bg-blue-700 text-white font-bold`}
        >
          {likeState.liked ? 'Unlike' : 'Like'}
        </button>
        <span className="text-gray-700 font-semibold">{likeState.count} likes</span>
      </div>
    </div>
  );
};

export default Card;
