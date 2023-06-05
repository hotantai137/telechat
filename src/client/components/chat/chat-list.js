import React, { useEffect, useState } from 'react';
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import ChatListItem from './chat-list-item';
import userService from '../../../api/services/user.js';
import messageService from '../../../api/services/message.js';
import hubService from '../../../api/services/hub';
 
function ChatList(props){
    const [hubConnection, setHubConnection] = useState(null);
    const [chatList, setChatList] = useState([]);
    const [selectedId, setSelectedId] = useState('');
    // const [lastMessages, setLastMessages] = useState([]);
    const getContacts = () => {
        // let userInfo = JSON.parse(localStorage.getItem('contactList'));
        // setChatList(userInfo);
        // userService.getContacts(1)
        let userInfo = JSON.parse(localStorage.getItem('userInfo'));
        userService.getChatRooms(userInfo.id)
        .then(res => {
            return res.data;
        })
        .then(data => {
            console.log(data);
            localStorage.setItem('chatRoomList', JSON.stringify(data));
            setChatList(data);
        })
      }

    // const getLastMessages = () => {
    //     messageService.getLastMessage()
    //     .then(messages => {
    //         setLastMessages(messages);
    //     })
    // }

    useEffect(() => {
        // getContacts();//Get contact list of current user
        // getLastMessages();
        //join all chat rooms of current user
    }, []);

    useEffect(() => {
        if (hubConnection) {
            // if(hubConnection){
            //     let contactList = JSON.parse(localStorage.getItem('chatRoomList'));
            //     if(contactList){
            //         contactList.map(async contact => {
            //             hubConnection.invoke("JoinRoom", 'taiht', contact.chatRoomId);
            //         });
            //     }
            // }
            // hubConnection
            // .start()
            // .then(() => {
            //   connection.on("ReceiveMessage", (message) => {
            //     notification.open({
            //       message: "New Notification",
            //       description: message,
            //     });
            //   });
            // })
            // .catch((error) => console.log(error));
        }
      }, [hubConnection]);

    useEffect(() => {
        setHubConnection(props.hubConnection);
        if(props.hubConnection){
            getContacts();
        }
        // if(props.socket){
        //     getContacts();
        //     let contactList = JSON.parse(localStorage.getItem('contactList'));
        //     if(contactList){
        //         let chatRoomIds = contactList.map(contact => {return contact.chatRoomId});
        //         props.socket.emit('subscribeRooms', chatRoomIds);
        //     }            
        // }
        
        // const subscribeRoomSocket = () => {
        //     let chatRooms = JSON.parse(localStorage.getItem('chatrooms'));
        //     socket.emit('subscribeRooms', chatRooms);
        // }
        // const messageListener = (message) => {
        //   message.messageBubble.isOut = message.socketId === props.socket.id ? true : false;
        //   let newData = dataBubbles;
        //   newData.push(message.messageBubble);
        //   setData(groupDataBubbles(dataBubbles));
        // };
      
        // if(props.socket) props.socket.on('receivedMessage', messageListener);
        // // socket.on('deleteMessage', deleteMessageListener);
        // // socket.emit('getMessages');
    
        // return () => {
        //     // if(props.socket) props.socket.off('receivedMessage', messageListener);
        //     if(props.socket){
        //         let chatRooms = JSON.parse(localStorage.getItem('chatrooms'));
        //         props.socket.emit('unsubscribeRooms', chatRooms);
        //     }
        // };
      }, [props.hubConnection]);
      

    const selectChatItem = (id) => {
        setSelectedId(id);
        props.selectChatItem(id);
        // if(socket){
        //     socket.emit('join')
        // }
    }

 return <div className='chatlist-top'>
            <ul className='chatlist' data-autonomous="0">
                {
                    chatList && chatList.length > 0 && chatList.map(item => {
                        return <ChatListItem 
                        key={item.chatRoomId} 
                        chatItem={item} 
                        isSelected={selectedId === item.chatRoomId ? true : false}
                        selectChatItem={selectChatItem}
                        // lastMessages={lastMessages}
                        hubConnection={props.hubConnection}
                        />
                    })
                }                
            </ul>
        </div>
}
 
export default ChatList;