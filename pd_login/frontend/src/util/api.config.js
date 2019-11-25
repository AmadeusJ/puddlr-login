// Define URLs for communicate with django APIs.
import axios from 'axios';

/* 
    Get the csrftoken from cookie
*/
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        let cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            let cookie = jQuery.trim(cookies[i]);
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
            }
        }
    }
    return cookieValue;
}

var csrftoken = getCookie('csrftoken');

axios.defaults.headers.post['Accept'] = 'application/json'
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.post['X-CSRFToken'] = csrftoken      // Add header 'X-CSRFToken' to axios 


function handleResponse(response) {
    if (!response.data.status) {
        const error = (response && response.message) || response.statusText;
        return Promise.reject(error);
    }
    return response.data
}


/* 
    Define functions for django API 
*/
export function submitEmailData(data) {
    return axios.post('/api/user/get_groupset/', {email: data}).then(handleResponse);
}


export function getSaltKey() {
    return axios.post('/api/user/get_saltkey/', {request: 'Please give me the new salt & key!'}).then(handleResponse);
}


export function submitPassword(server, passwdToken) {
    const staticServer = '192.168.20.68:8000'
    const url = 'http://' + staticServer + '/'
    const context = {
        passwd_token: passwdToken,
        server: staticServer
    }
    return axios.post(url, context).then(handleResponse)
    // return axios.post('/api/user/submit_password/', context).then(handleResponse)
}
