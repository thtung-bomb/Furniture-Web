import React from 'react';
import { TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete'; // Correct import statement

function Quotation() {

    const rooms = [
        { id: 1, room: "Bath Room" },
        { id: 2, room: "Living Room" },
        { id: 3, room: "Work Room" },
        { id: 4, room: "Dining Room" },
        // Add more movie titles as needed
    ];

    const products = [
        { id: 1, name: "Chair" },
        { id: 2, name: "Table" },
        { id: 3, name: "Bath" },
    ]

    return (
        <div className='flex flex-col gap-6'>
            <TextField id="outlined-basic" label="Your Name" variant="outlined" size='medium' />

            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={rooms}
                getOptionLabel={(option) => option.room}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Room" />}
            />

            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={products}
                getOptionLabel={(option) => option.name}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Product" />}
            />
        </div>
    )
}

export default Quotation