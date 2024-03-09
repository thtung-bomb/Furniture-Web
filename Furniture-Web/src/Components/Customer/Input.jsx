import React from 'react';
import { forwardRef } from 'react';

const Input = forwardRef(function Input({ textarea, label, ...props }, ref) {
    return (
        <p>
            <label>{label}</label>
            {textarea ? <textarea className='border:' ref={ref} {...props} /> : <input ref={ref} {...props} />}
        </p>
    )
}
)
export default Input