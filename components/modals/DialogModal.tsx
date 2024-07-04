import React, { useEffect, useRef } from 'react';

type DeleteConfirmationDialogProps = {
    isOpen: boolean;
    onConfirm: () => void;
    onCancel: () => void;
    message: string;
    };


const DeleteConfirmationDialog:React.FC<DeleteConfirmationDialogProps> = ({ isOpen, onConfirm, onCancel, message }) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isOpen]);

  return (
    <dialog ref={dialogRef} className="rounded-lg p-5 bg-white shadow-xl">
      <p className="text-lg">{message}</p>
      <div className="flex justify-end gap-4 mt-4">
        <button
          onClick={() => {
            onConfirm();
            dialogRef.current?.close();
          }}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition duration-300"
        >
          Yes
        </button>
        <button
          onClick={() => {
            onCancel();
            dialogRef.current?.close();
          }}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition duration-300"
        >
          No
        </button>
      </div>
    </dialog>
  );
};

export default DeleteConfirmationDialog;



// USAGE OF THE COMPONENT
/**
 * 
 * import React, { useState } from 'react';
import DeleteConfirmationDialog from './DeleteConfirmationDialog';

const App = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDelete = () => {
    console.log('Item deleted');
    setIsDialogOpen(false);
  };

  return (
    <div>
      <button onClick={() => setIsDialogOpen(true)}>Delete Item</button>
      <DeleteConfirmationDialog
        isOpen={isDialogOpen}
        onConfirm={handleDelete}
        onCancel={() => setIsDialogOpen(false)}
        message="Are you sure you want to delete this item?"
      />
    </div>
  );
};

export default App;
 */