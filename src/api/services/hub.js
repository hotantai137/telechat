import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";

const SERVER_HOSTNAME = window.location.hostname;
const SERVER_PORT = 7066;
const SERVER_URL = `https://${SERVER_HOSTNAME}:${SERVER_PORT}/hubs`

export default{    
    connect: (userId) => {
      return new HubConnectionBuilder()
      .withUrl(`${SERVER_URL}/message?userId=${userId}`)            
      .withAutomaticReconnect()
      .build();
  }
}