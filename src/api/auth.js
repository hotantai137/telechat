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

const SERVER_HOSTNAME = window.location.hostname;
const SERVER_PORT = 3000;
const SERVER_URL = `http://${SERVER_HOSTNAME}:${SERVER_PORT}`

export default{    
    checkToken: async (token) => {
      console.log(window.location.hostname);
        return await postData(SERVER_URL + '/users/token', { token: token});
    },
    login: async (email, password) => {
      return await postData(SERVER_URL + '/users/login', { email: email, password: password});
  }
}