// This file contains the function to fetch data from the backend API

async function fetchData(status) {
    try {
        const response = await fetch(`api/v1/request/auth/${status}`);
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

export default fetchData;
