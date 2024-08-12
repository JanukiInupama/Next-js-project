import React from 'react';
import Image from 'next/image';

type CardProps = {
  imageSrc: string;
  altText: string;
};

const Card: React.FC<CardProps> = ({ imageSrc, altText }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-5 m-6 md:w-72 lg:w-96">
      <Image
        src={imageSrc}
        alt={altText}
        width={400} 
        height={200} 
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default Card;
