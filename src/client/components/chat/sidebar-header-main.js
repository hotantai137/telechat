import React, { useEffect, useState } from "react";

function SideBarHeaderMain(props){
    const [contact, setContact] = useState(null);
    const [isTyping, setIsTyping] = useState(false);
    const [typingName, setTypingName] = useState('');

    useEffect(()=>{
        setContact(getCurrentContact());

    }, [props.selectedChatId]);

    const getContact = () => {
        return contact;
    }

    const isTypingListener = (data) => {
        let currentContact = getContact();
        if(currentContact && currentContact.roomId === data.roomId){
            setIsTyping(true);
            setTypingName(data.userName);
        }        
      };

    const isStopTypingListener = (data) => {
        if(contact.roomId === data.roomId){
            setIsTyping(false);
            setTypingName('');
        }      
    };

    useEffect(() => {
        if(contact){
            if(props.socket) props.socket.on('isTyping', isTypingListener);
            if(props.socket) props.socket.on('stopTyping', isStopTypingListener);
        }
    
        return () => {
            if(props.socket) props.socket.off('isTyping', isTypingListener);
            if(props.socket) props.socket.off('stopTyping', isStopTypingListener);
        };
      }, [props.socket, contact]);

    const getCurrentContact = () => {
        if(!props.selectedChatId) return null;
        let contactList = JSON.parse(localStorage.getItem('contactList'));
        let currentContact = contactList.find(x => x._id === props.selectedChatId);
        return currentContact;
    }
    const bottomInfo = () => {
        if(isTyping){
            return (<span className="online peer-typing-container">
                        <span className="peer-typing peer-typing-text" data-action="sendMessageTypingAction">
                            <span className="peer-typing-text-dot"></span>
                            <span className="peer-typing-text-dot"></span>
                            <span className="peer-typing-text-dot"></span>
                        </span>
                        <span className="i18n peer-typing-description">
                            <span className="peer-title" dir="auto" data-peer-id="1659502781" data-only-first-name="1">{typingName}</span> 
                            <>&nbsp;</> is typing
                        </span>
                    </span>)
        }else{
            if(contact && contact.roomType === 'personal'){
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
                                <span className="peer-title" dir="auto" data-peer-id="-1583302793" data-dialog="1">{contact ? contact.contactName : ''}</span>
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