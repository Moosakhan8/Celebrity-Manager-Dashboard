import React, { useEffect } from 'react';

interface DeleteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  userName: string;
}

const DeleteDialog: React.FC<DeleteDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  userName,
}) => {


  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'; 
    } else {
      document.body.style.overflow = 'auto'; 
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  
  if (!isOpen) return null;

  // Handle click outside to close the dialog
  const handleOverlayClick = (e: React.MouseEvent) => {
    // Close the dialog if the overlay is clicked (but not the modal itself)
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      onClick={handleOverlayClick}
    >
      <div className="relative bg-white rounded-lg shadow-lg p-6 max-w-lg w-full m-[26px] md:m-[30px]">
        {/* Close button in the top right corner */}
        <button
          className="absolute top-2 right-2 text-xl font-bold text-gray-600"
          onClick={onClose}
        >
          &times;
        </button>
        
        <h2 className="text-base md:text-lg font-bold mb-4">Confirm Deletion</h2>
        <p className="mb-6 text-sm md:text-base">
          Are you sure you want to delete <strong>{userName}</strong>? <br />This action cannot be undone.
        </p>
        <div className="flex justify-center md:justify-end space-x-4">
          <button
            className="text-sm md:text-base px-[30px] py-3 bg-white text-black rounded-[10px] border border-solid border-gray-500"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="text-sm md:text-base px-[30px] py-3 bg-red-500 text-white rounded-[10px]"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteDialog;

