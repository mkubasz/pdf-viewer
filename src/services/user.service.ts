//import axios from 'axios';
import { config } from '../helpers';

export const userService = {
    login,
    logout
};

function handleResponse(response: any) {
    return new Promise((resolve, reject) => {
        if(response.ok) {
            const contentType: string = response.headers.get("content-type");
            if(contentType && contentType.includes("application/json")) {
                response.json().then(json => resolve(json));
            } else {
                resolve();
            }
        } else {
            response.text().then(text => reject(text));
        }
    });
}

function handleError(error: any) {
    return Promise.reject(error && error.message);
}

function login(username: string, password: string) {
    const requestOptions = {

        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ "username": username, "password": password })
    };
    const url= config.apiUrl + '/identity/authenticate';
    //const body= JSON.stringify({ "username": username, "password": password })
    return fetch(url, requestOptions)
        .then(handleResponse, handleError)
        .then(user  => {
            if(user && (user as any).token) {
                localStorage.setItem('user', JSON.stringify(user));
            }
            return user;
        });
}

function logout() {
    localStorage.removeItem('user');
}