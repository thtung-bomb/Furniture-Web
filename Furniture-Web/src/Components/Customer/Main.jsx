import React, { useState, useEffect } from 'react';
import NewProject from './NewProject';
import SelectedProject from './SelectedProject';

function Main() {

    // Load projectState from localStorage or set default value
    const [projectState, setProjectState] = useState(() => {
        const savedState = localStorage.getItem('projectState');
        return savedState ? JSON.parse(savedState) : {
            selectedProjectId: undefined,
            projects: []
        };
    });

    // Save projectState to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('projectState', JSON.stringify(projectState));
    }, [projectState]);

    // // Manage state to switch between components
    // const [projectState, setProjectState] = useState({
    //     const savedState = localStorage.getItem('projectState');
    //     return savedState ? JSON.parse(savedState) : {
    //         selectedProjectId: undefined,
    //         projects: []
    //     };
    // });

    function handleSelectProject(id) {
        setProjectState(prevState => ({
            ...prevState,
            selectedProjectId: id
        }));
    }

    function handleDeleteProject() {
        setProjectState(prevState => ({
            ...prevState,
            selectedProjectId: undefined,
            projects: prevState.projects.filter((project) => project.id !== prevState.selectedProjectId)
        }));
    }

    function handleStartAddProject() {
        setProjectState(prevState => ({
            ...prevState,
            selectedProjectId: null
        }));
    }

    function handleAddProject(projectData) {
        setProjectState(prevState => {
            const projectId = Math.random();
            const newProject = {
                ...projectData,
                id: projectId
            };

            return {
                ...prevState,
                selectedProjectId: undefined,
                projects: [...prevState.projects, newProject]
            };
        });
    }

    const selectedProject = projectState.projects.find(project => project.id === projectState.selectedProjectId)

    let content = <SelectedProject project={selectedProject} onDelete={handleDeleteProject} />;

    if (projectState.selectedProjectId === null) {
        content = <NewProject onAdd={handleAddProject} />;
    }

    return (
        <div className="h-[700px]">
            {content}
            <ul>
                {projectState.projects.map(project => (
                    <li
                        className='bg-black text-white'
                        key={project.id}
                        onClick={() => handleSelectProject(project.id)} // Pass the project id to handleSelectProject
                    >
                        <h1>{project.id}</h1>
                        <h3>{project.product}</h3>
                        <h3>{project.quantity}</h3>
                        <h3>{project.workspaceName}</h3>
                        <h3>{project.description}</h3>
                    </li>
                ))}
            </ul>
            <div className="p-20 border-gray-200">
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center justify-center bg-gray-50 h-28 dark:bg-gray-800 cursor-pointer" onClick={handleStartAddProject}>
                        <p className="text-2xl text-gray-400 dark:text-gray-500">
                            <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                            </svg>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Main;
