import React from 'react'
import './Modal.css';

export const Modal = ({open, children, onClose}) => {
   if (!open) return null
   const handleCloseModal = (e) => {
    // Sprawdź, czy kliknięto na tło (modal-background)
    if (e.target.classList.contains('modal-background')) {
      onClose(); // Wywołanie funkcji onClose, jeśli kliknięto na tło
    }
  };
  return (
    <div className='modal-background' onClick={handleCloseModal}>
  <div className='modal-container'>
    <button onClick={onClose}>  Close</button>
    {children}</div></div>
  )
}
