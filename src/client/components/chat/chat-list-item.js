import React, { useState, useEffect } from 'react';
import messageUtils from '../../../common/message.utils';
import messageService from '../../../api/services/message.js';

const MESSAGE_TYPE = {
    MESSAGE: 0,
    MESSAGE_AND_EMOJI: 1,
    EMOJI_1X: 2,
    EMOJI_2X: 'EMOJI_2X',
    EMOJI_3X: 'EMOJI_3X',
    MEDIA_IMAGE: 'MEDIA_IMAGE',
    MEDIA_VIDEO: 'MEDIA_VIDEO',
    MEDIA_ALBUM: 'MEDIA_ALBUM',
    STICKER: 'STICKER',
    GIF: 'GIF'
}

function ChatListItem(props){
    const [lastMessage, setLastMessage] = useState({
        type: 'text',
        messageBubble: {
            message: props.chatItem.contactName + ' joined TeleChat'
        }
    });

    const listenerReceiveLastMessage = () => {
        if(props.hubConnection){
            // props.hubConnection.off("ReceiveLastMessage");
            props.hubConnection.on("ReceiveLastMessage", (roomId, messageBubble) => {
                if(props.chatItem.chatRoomId == roomId)
                setLastMessage(messageBubble);
              });
        }
    }

    useEffect(() => {
        if(props.hubConnection){
            let user = JSON.parse(localStorage.getItem('userInfo'));
            props.hubConnection.invoke("JoinRoom", user.id, props.chatItem.chatRoomId)
            .catch((err) => console.log(err));
            
        }
        
        // const lastMessageListner = (data) => {
        //     if(props.chatItem.roomId === data.roomId) setLastMessage(data.messageBubble);
        // }
        
        // if(props.socket) props.socket.on('lastMessageReceived', lastMessageListner);
    
        // return () => {
        //     if(props.socket) props.socket.off('lastMessageReceived', lastMessageListner);
        // };
      }, [props.hubConnection]);
    
    //   useEffect(() => {
    //       if(props.lastMessages && props.lastMessages.length > 0 && props.chatItem){
    //         let lastMsg = props.lastMessages.filter(x => x.chatRoomId === props.chatItem.chatRoomId);
    //         if(lastMsg && lastMsg.length > 0) setLastMessage(messageUtils.generateMessageBubble(lastMsg[0]));
    //       }
    //   }, [props.lastMessages, props.chatItem]);

      useEffect(() => {
        // listenerReceiveLastMessage();
        if(props.chatItem){
            listenerReceiveLastMessage();
            messageService.getLastMessage(props.chatItem.chatRoomId)
            .then(res => {
                setLastMessage(messageUtils.generateMessageBubble(res.data));
            })
        }
      }, [props.chatItem]);

    const renderLastMessage = () =>{
        if(!lastMessage) return;
        switch(lastMessage.type){
            case 'MEDIA_IMAGE': 
            return(<>
                <span className="user-last-message" dir="auto">
                    <div className="dialog-subtitle-media media-container" dangerouslySetInnerHTML={{__html: lastMessage.message}}>
                        {/* <img className="media-photo" src={lastMessage.message[0].content}/> */}
                    </div>
                    <i><span className="i18n">&nbsp;Photo</span></i>
                </span>
            </>)
            case 'STICKER':
                return(<>
                    <span className="user-last-message" dir="auto">
                        <span>
                            <i><img src={lastMessage.filePath} className="emoji" alt="💨"/></i>
                            <i><span className="i18n">&nbsp;Sticker</span></i>
                        </span>
                    </span>
                </>)
            case 'GIF':
                return(<>
                    <span className="user-last-message" dir="auto">
                        <span>
                            <i><span className="i18n">&nbsp;GIF</span></i>
                        </span>
                    </span>
                </>)
            // case 'MESSAGE': 
            // case MESSAGE_TYPE.MESSAGE:
            default:
            return (<>
                {/* <b>
                    <span className="peer-title" dir="auto" data-peer-id="1610799485" data-only-first-name="1">Mon</span>: 
                </b> */}
                <span className="user-last-message" dangerouslySetInnerHTML={{__html: lastMessage.message}}></span>
            </>)
        }
    }

 return <li className={`chatlist-chat rp is-muted ${props.isSelected ? "active" : ""}`} data-peer-id="-1583302793">
            <div className="c-ripple" onClick={() => {props.selectChatItem(props.chatItem.chatRoomId)}}></div>
            <avatar-element dialog="1" peer="-1583302793" data-color="" className="avatar-relative dialog-avatar avatar-54">
                <img className="avatar-photo" src="https://www.thestreet.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cq_auto:good%2Cw_1200/MTgxNjM5MTEyMzM0MjU1ODg1/binance_logo2.png"/>
            </avatar-element>
            <div className="user-caption">
                <p className="dialog-title">
                    <span className="user-title tgico">
                        <span className="peer-title" dir="auto" data-peer-id="-1583302793" data-from-name="0" data-dialog="1" data-only-first-name="0" data-plain-text="0">{props.chatItem.contactFirstName + " " + props.chatItem.contactLastName}</span>
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