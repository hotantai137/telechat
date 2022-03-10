import React, { useEffect, useState } from 'react';
import ChatListItem from './chat-list-item';
import userService from '../../../api/services/user.js';
 
function ChatList(props){
    const [chatList, setChatList] = useState([]);
    const [selectedId, setSelectedId] = useState('');
    const fetchData = () => {
        userService.getUserList()
        .then(res => {
            return res.users;
        })
        .then(data => {
            setChatList(data);
        })
      }

    useEffect(() => {
        fetchData();
    }, []);

    const selectChatItem = (id) => {
        setSelectedId(id);
    }

 return <div className='chatlist-top'>
            <ul className='chatlist' data-autonomous="0">
                {
                    chatList.length > 0 && chatList.map(item => {
                        return <ChatListItem 
                        key={item._id} 
                        chatItem={item} 
                        isSelected={selectedId === item._id ? true : false}
                        selectChatItem={selectChatItem}
                        />
                    })
                }                
            </ul>
        </div>
}
 
export default ChatList;