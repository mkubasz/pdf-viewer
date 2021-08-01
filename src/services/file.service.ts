import axios from 'axios';
import {authHeader, config} from '../helpers';
//import { authHeader } from '../helpers';

export const fileService = {
    getAll,
    getByName
};

function handleResponse(response: any) {
    if(response['statusText'] == "OK")
        return response['data'];
}

function handleError(error: any) {
    return Promise.reject(error && error.message);
}

function getAll() {
    const requestOptions = {
        url: config.apiUrl + '/files',
        method: 'get',
        headers: authHeader()
    };
    return axios(requestOptions).then(handleResponse, handleError);
}
 
function getByName(name: string) {
    const url = config.apiUrl + '/files/' + name;
    const requestOptions = {

        headers: authHeader()
    };
 
    return axios.get(url, requestOptions).then(handleResponse, handleError);
}
 