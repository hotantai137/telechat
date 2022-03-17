import React, { useEffect, useState } from "react";

function SideBarHeaderMain(props){
    const [contact, setContact] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [typingName, setTypingName] = useState('');

    useEffect(()=>{
        let contactList = JSON.parse(localStorage.getItem('contactList'));
        let currentContact = contactList.find(x => x._id === props.selectedChatId);
        setContact(currentContact);

    }, [props.selectedChatId]);

    useEffect(() => {
        const isTypingListener = (data) => {
            // if(contact.roomId === message.roomId) setIsTyping(true);
            setIsTyping(true);
            setTypingName(data.userName);
          };

        const isStopTypingListener = (data) => {
          // if(contact.roomId === message.roomId) setIsTyping(true);
          setIsTyping(false);
          setTypingName('');
        };
        
          if(props.socket) props.socket.on('isTyping', isTypingListener);
          if(props.socket) props.socket.on('stopTyping', isStopTypingListener);
    
        return () => {
            // if(props.socket) props.socket.off('receivedMessage', messageListener);
        };
      }, [props.socket]);

    const bottomInfo = () => {
        if(isTyping){
            return (<span class="online peer-typing-container">
                        <span class="peer-typing peer-typing-text" data-action="sendMessageTypingAction">
                            <span class="peer-typing-text-dot"></span>
                            <span class="peer-typing-text-dot"></span>
                            <span class="peer-typing-text-dot"></span>
                        </span>
                        <span class="i18n peer-typing-description">
                            <span class="peer-title" dir="auto" data-peer-id="1659502781" data-only-first-name="1">{typingName}</span> 
                            <>&nbsp;</> is typing
                        </span>
                    </span>)
        }else{
            if(contact.roomType === 'personal'){
                return (<><span className="i18n">last seen just now</span></>);
            }else{
                return (<span>
                    <span className="i18n">26 124 members</span>
                    <span className="i18n">, </span>
                    <span className="i18n">1 821 online</span>
                </span>)
            }
        }
    }

    return <div className="sidebar-header topbar is-pinned-message-shown" data-floating="0">
        <div className="chat-info-container">
        <button className="btn-icon tgico-left sidebar-close-button"
        onClick={props.removeSelectedChat}>
            <i className="fa fa-arrow-left" aria-hidden="true"></i>
        </button>
            <div className="chat-info">
                <div className="person">
                    <avatar-element dialog="1" class="avatar-42 person-avatar" peer="-1583302793" data-color="">
                        <img className="avatar-photo" src="https://www.thestreet.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cq_auto:good%2Cw_1200/MTgxNjM5MTEyMzM0MjU1ODg1/binance_logo2.png"/>
                    </avatar-element>
                    <div className="content">
                        <div className="top">
                            <div className="user-title">
                                <span className="peer-title" dir="auto" data-peer-id="-1583302793" data-dialog="1">{contact.contactName}</span>
                            </div>
                        </div>
                        <div className="bottom">
                            <div className="info">
                                {bottomInfo()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default SideBarHeaderMain;