import instance from '../api.js';

export default{
    // signUp: async (fullName, email, password) => {
    //     return await postData(`${SERVER_URL}/users`, { fullName: fullName, email: email, password: password, type: 'consumer'});
    // },
    getContacts: async (userId) => {
      const url = `contact?userId=${userId}`
      var res = await instance.get(url);
      return res.data;
    },
    getChatRooms: async (userId) => {
      const url = `chat-room?userId=${userId}`
      var res = await instance.get(url);
      return res.data;
    }
}