import React, { useRef } from 'react';
import Alert from '@mui/material/Alert';
import { createPortal } from 'react-dom';
import { forwardRef, useImperativeHandle } from 'react';

const Modal = forwardRef(function Modal({ children, buttonCaption }, ref) {
    const dialog = useRef();
    useImperativeHandle(ref, () => {
        return {
            // tra ve 1 object sau do muon hien thi properties hay function 
            open() {
                dialog.current.showModal();
            }
        };
    });

    return createPortal(
        <dialog ref={dialog}>
            {children}
            {/* <Alert severity="success">This is a success Alert.</Alert> */}
            <Alert severity="error">This is an error.</Alert>
            <form method='dialog'>
                <button>{buttonCaption}</button>
            </form>
        </dialog>, document.getElementById('modal-root'));
});

export default Modal