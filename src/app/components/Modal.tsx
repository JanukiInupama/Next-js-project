import React from "react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({isOpen, onClose, children}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-65 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-xl w-fulll">
                <div className="flex flex-col justify-end">
                    <button onClick={onClose} className="text-xl place-self-end">
                        &times;
                    </button>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;