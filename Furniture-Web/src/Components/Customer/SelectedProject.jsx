import React from 'react';

function SelectedProject({ project, onDelete }) {
    if (!project) {
        return null; // Render nothing if project is undefined
    }

    return (
        <div className='w-[35rem] mt-16'>
            <header className='pb-4 mb-4 border-b-2 border-stone-300'>
                <div className='flex items-center justify-between'>
                    <h1>{project.id}</h1>
                    <button className='text-stone-600 hover:text-stone-950' onClick={onDelete}>DELETE</button>
                </div>
                <h3>{project.product}</h3>
                <h3>{project.quantity}</h3>
                <h3>{project.workspaceName}</h3>
                <h3>{project.description}</h3>
            </header>
        </div>
    );
}

export default SelectedProject;
