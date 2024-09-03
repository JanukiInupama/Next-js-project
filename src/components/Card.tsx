"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { toggleLike } from "../redux/likesSlice";
import { RootState } from "../redux/store";

import Modal from "./Modal";

type CardProps = {
  id: string;
  imageSrc: string;
  altText: string;
};

const Card = ({ id, imageSrc, altText }: CardProps) => {
  const dispatch = useDispatch();
  const card = useSelector(
    (state: RootState) =>
      state.likes.cards.find((card) => card.id === id) || {
        count: 0,
        liked: false,
      }
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLike = () => {
    dispatch(toggleLike(id));
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const CardContent = ({ inModal = false }) => (
    <div className={`flex flex-col items-center ${inModal ? "p-4" : ""}`}>
      <div
        className={`relative ${
          inModal ? "w-full h-64 md:h-80" : "w-full h-96"
        } cursor-pointer`}
        onClick={inModal ? undefined : openModal}
      >
        <Image
          src={imageSrc}
          alt={altText}
          layout="fill"
          objectFit="contain"
          className="rounded-lg"
        />
      </div>
      <h2 className="text-xl font-bold my-4">{altText}</h2>
      <div className="flex items-center space-x-4">
        <button
          onClick={handleLike}
          className={`py-2 px-4 rounded ${
            card.liked ? "bg-blue-700" : "bg-blue-500"
          } hover:bg-blue-700 text-white font-bold`}
        >
          {card.liked ? "Unlike" : "Like"}
        </button>
        <span className="text-gray-700 font-semibold">{card.count} likes</span>
      </div>
    </div>
  );

  return (
    <>
      <div className="bg-white shadow-md rounded-lg p-5 h-full flex flex-col">
        <CardContent />
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <CardContent inModal={true} />
      </Modal>
    </>
  );
};

export default Card;
