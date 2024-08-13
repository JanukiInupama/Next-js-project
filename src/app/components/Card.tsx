import React from 'react';
import Image from 'next/image';

type CardProps = {
  imageSrc: string;
  altText: string;
};

const Card: React.FC<CardProps> = ({ imageSrc, altText }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-5 w-full md:w-1/3 max-w-sm">
      <Image
        src={imageSrc}
        alt={altText}
        width={400} 
        height={200} 
        className="w-full h-auto object-cover"
      />
    </div>
  );
};

export default Card;