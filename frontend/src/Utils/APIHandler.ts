import axios from 'axios';

export const APIHandler = async (method: string, url: string, payload: any) => {
    const baseURL = "http://localhost:8000/api";

    try {
        let response = await axios.request({
            method: method,
            url: baseURL + url,
            data: payload
          });
        return response;
    } catch (error: any) {
        throw error?.response;
    }
    
}

