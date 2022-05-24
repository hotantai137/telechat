import React, { useState, useEffect } from 'react';
 
function ChatListItem(props){
    const [lastMessage, setLastMessage] = useState({
        type: 'text',
        messageBubble: {
            message: props.chatItem.contactName + ' joined TeleChat'
        }
    });

    useEffect(() => {
        const lastMessageListner = (data) => {
            if(props.chatItem.roomId === data.roomId) setLastMessage(data.messageBubble);
        }
        
        if(props.socket) props.socket.on('lastMessageReceived', lastMessageListner);
    
        return () => {
            if(props.socket) props.socket.off('lastMessageReceived', lastMessageListner);
        };
      }, [props.socket]);
    const renderLastMessage = () =>{
        if(!lastMessage) return;
        switch(lastMessage.messageType){
            case 'MESSAGE': 
            return (<>
                {/* <b>
                    <span className="peer-title" dir="auto" data-peer-id="1610799485" data-only-first-name="1">Mon</span>: 
                </b> */}
                <span dangerouslySetInnerHTML={{__html: lastMessage.message}}></span>
            </>)
            case 'MEDIA_IMAGE': 
            return(<>
                <span className="user-last-message" dir="auto">
                    <div className="dialog-subtitle-media media-container" dangerouslySetInnerHTML={{__html: lastMessage.message}}>
                        {/* <img className="media-photo" src={lastMessage.message[0].content}/> */}
                    </div>
                    <i><span className="i18n">Photo</span></i>
                </span>
            </>)
        }
    }

 return <li className={`chatlist-chat rp is-muted ${props.isSelected ? "active" : ""}`} data-peer-id="-1583302793">
            <div className="c-ripple" onClick={() => {props.selectChatItem(props.chatItem._id)}}></div>
            <avatar-element dialog="1" peer="-1583302793" data-color="" className="avatar-relative dialog-avatar avatar-54">
                <img className="avatar-photo" src="https://www.thestreet.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cq_auto:good%2Cw_1200/MTgxNjM5MTEyMzM0MjU1ODg1/binance_logo2.png"/>
            </avatar-element>
            <div className="user-caption">
                <p className="dialog-title">
                    <span className="user-title tgico">
                        <span className="peer-title" dir="auto" data-peer-id="-1583302793" data-from-name="0" data-dialog="1" data-only-first-name="0" data-plain-text="0">{props.chatItem.contactName}</span>
                    </span>
                    <span className="dialog-title-details">
                        <span className="message-status sending-status"></span>
                        <span className="message-time">
                            <span className="i18n">00:07</span>
                        </span>
                    </span>
                </p>
                <div className="dialog-subtitle">
                    {renderLastMessage()}
                    <div className="dialog-subtitle-badge badge badge-24 is-visible unread">1451</div>
                </div>
            </div>
        </li>
}
 
export default ChatListItem;