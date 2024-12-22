import { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios

export const useFetch = (url, method = 'GET', body = null) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null); 
            try {
                let response;

                if (method === 'POST') {
                    response = await axios.post(url, body); 
                } else {
                    response = await axios.get(url);
                }

                setData(response.data);
            } catch (err) {
                setError(err); 
            } finally {
                setIsLoading(false); 
            }
        };

        fetchData();

        return () => {
            setData(null);
            setError(null);
        };
    }, [url, method, body]); 

    return { data, isLoading, error }; 
};
