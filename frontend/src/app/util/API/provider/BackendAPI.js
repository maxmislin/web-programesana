import axios from 'axios';

export const REACT_BACKENDAPI_URL = 'http://localhost:1337';

class BackendAPI {
    async post(url, data) {
        return axios.post(
            `${REACT_BACKENDAPI_URL}${url}`,
            data
        );
    }

    async get(url) {
        return axios.get(
            `${REACT_BACKENDAPI_URL}${url}`
        );
    }

    async delete(url) {
        return axios.delete(`${REACT_BACKENDAPI_URL}${url}`);
    }

    async put(url, data) {
        return axios.put(`${REACT_BACKENDAPI_URL}${url}`, data);
    }
}

export default new BackendAPI();
