import {React, useEffect, useRef, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import { Cookies } from 'react-cookie';
import SideBarHeaderMain from './sidebar-header-main';
import Bubbles from './bubbles';
import ChatInput from './chat-input';

function ColumnCenter(props){
    // const [selectedChatId, setSelectedChatId] = useState('');
    // useEffect(() => {
    //     setSelectedChatId(props.selectedChatId);
    // }, [props.selectedChatId]);

 return(
    <div id='column-center' className='tabs-tab main-column'>
        <div className='chats-container tabs-container' data-animation="navigation">
            <div className='chat tabs-tab active type-chat'>
                <div className='chat-background'>
                    <div className='chat-background-item is-visible' data-type='image'></div>
                </div>
                {
                    props.selectedChatId && (
                        <>
                        <SideBarHeaderMain 
                        removeSelectedChat={props.removeSelectedChat}
                        selectedChatId={props.selectedChatId}
                        socket={props.socket}
                        />
                        <Bubbles socket={props.socket}/>
                        <ChatInput socket={props.socket}
                        selectedChatId={props.selectedChatId}/>
                        </>
                    )
                }
            </div>
        </div>
    </div>
 )
}

export default ColumnCenter;