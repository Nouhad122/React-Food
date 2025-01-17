import { useCallback, useEffect, useState } from 'react';

const sendHTTPRequest = async (url, config) =>{
    const response = await fetch(url, config);
    const resData = await response.json();
    
    if(!response.ok){
        throw new Error("Something went wrong, Failed to send request.");
    }

    return resData;
}

const usehttp = (url, config, initialData) => {
    const [data, setData] = useState(initialData);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    const clearData = () =>{
        setData(initialData);
    }

    const sendRequest = useCallback(async (data) =>{
        setIsLoading(true);
        try{
            const resData = await sendHTTPRequest(url, {...config, body:data});
            setData(resData);
        }
        catch(error){
            setError(error.message || "Something went wrong!")
        }
        setIsLoading(false);

    },[url, config]);

    useEffect(() =>{
        if((config && config.method === "GET" || !config.method) || !config){
            sendRequest();
        }
    },[sendRequest, config])

    return {
        data,
        isLoading,
        error,
        sendRequest,
        clearData
    }
}

export default usehttp
