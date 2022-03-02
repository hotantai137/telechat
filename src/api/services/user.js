
function callAPI() {
    fetch("http://localhost:3001/user")
        .then(res => res.text())
        .then(res => this.setState({ apiResponse: res }));
}
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
    signUp: async (userName, email, password) => {
        return await postData('http://localhost:3001/users', { firstName: userName, lastName: '1', email: email, password: password, type: 'consumer'});

        // .then(data => {
        //   console.log(data); // JSON data parsed by `data.json()` call
        //   return data;
        // });
    }    
}