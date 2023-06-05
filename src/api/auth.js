import instance from './api.js';

export default{    
    // checkToken: async (token) => {
    //   console.log(window.location.hostname);
    //     return await postData(SERVER_URL + '/users/token', { token: token});
    // },
    login: async (phoneNumber, password) => {
      var res = await instance.post('auth', {
        phoneNumber: phoneNumber,
        password: password
      });
      
      return res.data;
  }
}