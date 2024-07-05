import React, { useEffect, useRef, ReactNode } from "react";

type ModalProps = {
  isOpen?: boolean;
  onPrimaryAction?: () => void;
  onSecondaryAction?: () => void;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  title?: string;
  dialogRef?: React.RefObject<HTMLDialogElement>;
  children?: ReactNode; // Accept children
};

const DynamicDialogModal: React.FC<ModalProps> = ({
  isOpen,
  title,
  dialogRef,
  children,
}) => {
  // const dialogRef = useRef<HTMLDialogElement | null>(null); // Step 1: Create a ref for the dialog element or lets pass it as a prop

  useEffect(() => {
    if (isOpen) {
      dialogRef?.current?.showModal();
    } else {
      dialogRef?.current?.close();
    }
  }, [isOpen, dialogRef]);

  return (
    <dialog ref={dialogRef} className="bg-white shadow-xl">
      {title && <h2 className="text-xl font-semibold mb-4 p-5">{title}</h2>}
      {children}
    </dialog>
  );
};

export default DynamicDialogModal;
