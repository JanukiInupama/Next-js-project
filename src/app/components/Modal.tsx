import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-65 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-2xl text-gray-700"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
