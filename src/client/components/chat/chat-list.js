import React from 'react';
import ChatListItem from './chat-list-item';
 
function ChatList(props){
 return <div className='chatlist-top'>
            <ul className='chatlist' data-autonomous="0">
                <ChatListItem/>
            </ul>
        </div>
}
 
export default ChatList;