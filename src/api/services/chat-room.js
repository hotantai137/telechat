import instance from '../api.js';

const SERVER_HOSTNAME = window.location.hostname;
const SERVER_PORT = 3000;
const SERVER_URL = `http://${SERVER_HOSTNAME}:${SERVER_PORT}`
export default{
  // getConversationByRoomId: async (roomId) => {
  //       return await postData(`http://localhost:3000/room/${roomId}`, { messageText: message, userId: userId});
  //   },
  // getLastMessage: async () => {
  //     const res = await fetch(`${SERVER_URL}/message/last-messages`);
  //     let data = await res.json();
  //     return data.messages;
  // }
  getChatRoomConversation: async (chatRoomId) => {
    const url = `message/chat-room?chatRoomId=${chatRoomId}`
      var res = await instance.get(url);
      return res.data;
  }
}