import React, { useRef } from 'react';
import Input from './Input';
import Modal from './Modal';

function NewProject({ onAdd }) {

    const modal = useRef();
    const productRef = useRef(); // manage all state
    const quantityRef = useRef(); // manage all state
    const workspaceNameRef = useRef();
    const descriptionRef = useRef(); // manage all state

    const handleSave = () => {
        const product = productRef.current.value;
        const quantity = quantityRef.current.value;
        const workspaceName = workspaceNameRef.current.value;
        const description = descriptionRef.current.value;

        //handle error
        // validation
        if (product.trim() === '' || quantity < 0 || quantity.trim === ''
            || workspaceName.trim() === '' || description.trim() === '') {
            // Show the error Modal
            modal.current.open();
            return;
        }

        onAdd({
            product: product,
            quantity: quantity,
            workspaceName: workspaceName,
            description: description
        });
    }

    return (
        <>
            <Modal ref={modal} buttonCaption="Close">
                <h2>Invalid Input</h2>
                <p>Look like you forgot input values</p>
                <p>Provide a valid value for every input field.</p>
            </Modal>
            <div>
                <menu>
                    <li><button className='bg-black text-white px-6 py-3'>Cancel</button></li>
                    <li><button className='bg-black text-white px-6 py-3' onClick={handleSave}>Save</button></li>
                </menu>
                <div>
                    <Input type='text' ref={productRef} label='product' />
                    <Input type='number' ref={quantityRef} label='quantity' />
                    <Input type='text' ref={workspaceNameRef} label='workspaceName' />
                    <Input type='text' ref={descriptionRef} label='description' textarea />
                </div>
            </div>
        </>
    )
}

export default NewProject