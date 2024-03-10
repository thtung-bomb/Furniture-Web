import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { fetchAvailableWorkspace, fetchAvailableProducts } from './http';

function Project() {

    const [availableWorkspace, setAvailableWorkspace] = useState([]);
    const [availableProducts, setAvailableProducts] = useState([]);
    const [selectedWorkspace, setSelectedWorkspace] = useState(null);
    const [error, setError] = useState();

    useEffect(() => {
        async function fetchWorkspace() {
            try {
                const workspace = await fetchAvailableWorkspace();
                setAvailableWorkspace(workspace);
                console.log(availableWorkspace);
            } catch (error) {
                setError({ message: error.message || 'Could not fetch places, please  try again later.' });
            }
        }
        fetchWorkspace();
    }, []);

    useEffect(() => {
        async function fetchProducts(workspaceName) {
            try {
                const products = await fetchAvailableProducts(workspaceName);
                setAvailableProducts(products);
                console.log(products);
            } catch (error) {
                setError({ message: error.message || 'Could not fetch products, please try again later.' });
            }
        }
        if (selectedWorkspace) {
            fetchProducts(selectedWorkspace.workspace_name);
            console.log(selectedWorkspace.workspace_name);
        }
    }, [selectedWorkspace]);

    return (
        <div className='flex flex-col gap-6'>
            <TextField
                id="outlined-basic"
                label="Your Name"
                variant="outlined"
                sx={{ width: 300 }}
                fullWidth
            />

            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={availableWorkspace}
                getOptionLabel={(option) => option.workspace_name}
                onChange={(event, newValue) => setSelectedWorkspace(newValue)}
                renderInput={(params) => <TextField {...params} key={availableWorkspace.id} label="Room" variant="outlined" sx={{ width: 300 }} />}
                fullWidth
            />

            <div className='flex gap-6'>
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={availableProducts.map(product => product.name)}
                    renderInput={(params) => <TextField {...params} label="Product" variant="outlined" sx={{ width: 300 }} />}
                />
                <TextField
                    id="number"
                    label="Product Quantity"
                    type="number"
                    variant="outlined"
                    sx={{ width: 150 }}
                />
            </div>

            <TextField
                id="outlined-basic"
                label="Description"
                variant="outlined"
                multiline
                size='medium'
                sx={{ width: 300 }}
            />
        </div>
    );
}

export default Project;
