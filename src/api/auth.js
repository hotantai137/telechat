import axios from 'axios';

const SERVER_HOSTNAME = window.location.hostname;
// const SERVER_PORT = 3000;
const SERVER_PORT = 7066;
const SERVER_URL = `https://${SERVER_HOSTNAME}:${SERVER_PORT}/api/`

const instance = axios.create({
  baseURL: SERVER_URL,
  // baseURL: `http://localhost:4000/api/`,
  // baseURL: `https://192.168.1.7:4000/api/`,
  headers: {
      "Content-Type": "application/json",
  },
});

// Example POST method implementation:
async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, { 
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}


export default{    
    checkToken: async (token) => {
      console.log(window.location.hostname);
        return await postData(SERVER_URL + '/users/token', { token: token});
    },
    login: async (phoneNumber, password) => {
      return await instance.post('auth', {
        phoneNumber: phoneNumber,
        password: password
      });
  }
}