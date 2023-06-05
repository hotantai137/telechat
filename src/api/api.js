import axios from 'axios';

const SERVER_HOSTNAME = window.location.hostname;
// const SERVER_PORT = 3000;
const SERVER_PORT = 7066;
const SERVER_URL = `https://${SERVER_HOSTNAME}:${SERVER_PORT}/api/`

const instance = axios.create({
  baseURL: SERVER_URL,
  headers: {
      "Content-Type": "application/json",
  },
});

export default instance;