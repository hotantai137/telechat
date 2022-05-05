
function callAPI() {
    fetch("http://localhost:3001/user")
        .then(res => res.text())
        .then(res => this.setState({ apiResponse: res }));
}
// Example POST method implementation:
async function postData(url = '', data = {}, method = 'POST', contentType = 'application/json') {
    // Default options are marked with *
    const response = await fetch(url, {
      method: method, // *GET, POST, PUT, DELETE, etc.
      mode: 'no-cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': contentType
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: data // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}

export default{
    uploadImage: async (base64) => {
      var bodyFormData = new FormData();
      bodyFormData.append('source', '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');
      const res = await fetch('https://freeimage.host/api/1/upload?key=6d207e02198a847aa98d0a2a901485a5', {
        method: 'POST',
        mode: 'no-cors',
        vary: 'Accept-Encoding',
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        body: bodyFormData
      });
      let data = await res.json();
      
      return data;
      // return await postData('https://freeimage.host/api/1/upload?key=6d207e02198a847aa98d0a2a901485a5&format=json', bodyFormData, 'POST', 'multipart/form-data');
    },
}