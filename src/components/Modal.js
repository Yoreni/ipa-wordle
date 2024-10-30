import { useEffect, useRef, useState } from "react";
import { useKey } from "../useKey";

export function Modal({ isOpen, hasCloseBtn, onClose, children })
{
    const [isModalOpen, setModalOpen] = useState(isOpen);
    const modalRef = useRef(null);

    useEffect(() => 
    {
        setModalOpen(isOpen);
    }, [isOpen]);

    useEffect(() => 
    {
        const modalElement = modalRef.current;
        if (modalElement) 
        {
            if (isModalOpen)
                modalElement.showModal();
            else
                modalElement.close();
        }
    }, [isModalOpen]);

    const handleCloseModal = () => 
    {
        if (onClose)
            onClose();
        setModalOpen(false);
    };

    useKey(event => {
        if (event.key === "Escape") 
          handleCloseModal();
    });

    const closeButton = (
    <button className="modal-close-btn" onClick={handleCloseModal}>
        Close
    </button>)

    return (
        <dialog ref={modalRef} className="modal">
            {hasCloseBtn && closeButton}
            {children}
        </dialog>
      );
}