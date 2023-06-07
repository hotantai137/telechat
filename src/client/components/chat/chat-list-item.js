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
    STICKER: 4,
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
        switch(lastMessage.messageType){
            case 'MEDIA_IMAGE': 
            return(<>
                <div className="dialog-subtitle-media media-container" dangerouslySetInnerHTML={{__html: lastMessage.message}}></div>
                <span>
                    <span className="i18n">Photo</span>
                </span>
            </>)
            case 'MESSAGE':
                return(<>
                    {lastMessage.message}
                </>)
            case 'STICKER':
                return(<>
                    Sticker
                </>)
            case 'GIF':
                return(<>
                    GIF
                </>)
            case 'MESSAGE_AND_EMOJI':
            case 'EMOJI_1X':
            case 'EMOJI_2X':
            case 'EMOJI_3X':
                return(<>
                    <div className="row-subtitle no-wrap" dangerouslySetInnerHTML={{__html: lastMessage.message}}></div>
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

 return <a className={`row no-wrap row-with-padding row-clickable hover-effect rp chatlist-chat chatlist-chat-bigger row-big ${props.isSelected ? "active" : ""}`} data-peer-id="-1583302793">
            <div className="c-ripple" onClick={() => {props.selectChatItem(props.chatItem.chatRoomId)}}></div>
            <div className="row-row row-subtitle-row dialog-subtitle">
                <div className="row-subtitle no-wrap" dir="auto">
                    {renderLastMessage()}
                </div>
            </div>
            <div className="row-row row-title-row dialog-title">
                <div className="row-title no-wrap user-title tgico" dir="auto">
                    <span className="peer-title" dir="auto" data-peer-id="777000" data-from-name="0" data-dialog="1" data-only-first-name="0" data-with-icons="1" data-thread-id="0">
                        {props.chatItem.contactFirstName + " " + props.chatItem.contactLastName}
                        {/* <span className="peer-title-inner" dir="auto">{props.chatItem.contactFirstName + " " + props.chatItem.contactLastName}</span>
                        <span className="verified-icon tgico">
                            <svg viewBox="0 0 26 26" width="26" height="26" className="verified-icon-svg">
                                <use href="#verified-icon-check" className="verified-icon-check"></use>
                                <use href="#verified-icon-background" className="verified-icon-background"></use>
                            </svg>
                        </span> */}
                    </span>
                </div>
                <div className="row-title row-title-right row-title-right-secondary dialog-title-details">
                    <span className="message-status sending-status">
                        <i className="sending-status-icon tgico-checks"></i>
                    </span>
                    <span className="message-time">
                        <span className="i18n" dir="auto">11:44 AM</span>
                    </span>
                </div>
            </div>
            <avatar-element dialog="1" peer="-1583302793" class="avatar-like dialog-avatar avatar-54 row-media row-media-bigger avatar-relative">
                <img className="avatar-photo" src="https://www.thestreet.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cq_auto:good%2Cw_1200/MTgxNjM5MTEyMzM0MjU1ODg1/binance_logo2.png"/>
            </avatar-element>
            {/* <div className="user-caption">
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
            </div> */}
        </a>
}
 
export default ChatListItem;