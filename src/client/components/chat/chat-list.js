import React, { useEffect, useState } from 'react';
import ChatListItem from './chat-list-item';
import userService from '../../../api/services/user.js';
 
function ChatList(props){
    const [chatList, setChatList] = useState([]);
    const [selectedId, setSelectedId] = useState('');
    const getContacts = () => {
        let userInfo = JSON.parse(localStorage.getItem('contactList'));
        setChatList(userInfo);
        // userService.getUserList()
        // .then(res => {
        //     return res.users;
        // })
        // .then(data => {
        //     setChatList(data);
        // })
      }

    useEffect(() => {
        getContacts();//Get contact list of current user
        //join all chat rooms of current user
    }, []);

    useEffect(() => {
        if(props.socket){
            getContacts();
            let contactList = JSON.parse(localStorage.getItem('contactList'));
            if(contactList){
                let roomIds = contactList.map(contact => {return contact.roomId});
                props.socket.emit('subscribeRooms', roomIds);
            }            
        }
        
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
    
        return () => {
            // if(props.socket) props.socket.off('receivedMessage', messageListener);
            if(props.socket){
                let chatRooms = JSON.parse(localStorage.getItem('chatrooms'));
                props.socket.emit('unsubscribeRooms', chatRooms);
            }
        };
      }, [props.socket]);
      

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
                        key={item._id} 
                        chatItem={item} 
                        isSelected={selectedId === item._id ? true : false}
                        selectChatItem={selectChatItem}
                        socket={props.socket}
                        />
                    })
                }                
            </ul>
        </div>
}
 
export default ChatList;