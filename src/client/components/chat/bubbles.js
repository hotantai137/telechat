import React, { useEffect, useState, useRef } from "react";
import BubblesDateGroup from "./bubbles-date-group";
import _ from 'lodash';
import chatRoomService from '../../../api/services/chat-room.js';
import moment from "moment";
import messageUtils from '../../../common/message.utils';

function Bubbles(props){
    const [dataBubbles, setDataBubbles] = useState([]);
    const [data, setData] = useState([]);
    const messagesEndRef = useRef(null);
    const [contact, setContact] = useState(null);
    const [userInfo, setUserInfo] = useState(null);

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    };

    const groupDataBubbles = (data) => {
        return _.chain(data)
                // Group the elements of Array based on `date` property
                .groupBy("date")
                // `key` is group's name (date), `value` is the array of objects
                .map((value, key) => ({ date: key, bubbles: value }))
                .value();
    }

    const getContact = () => {
        return contact;
    }

    const getCurrentContact = () => {
        if(!props.selectedChatId) return null;
        let contactList = JSON.parse(localStorage.getItem('contactList'));
        let currentContact = contactList.find(x => x._id === props.selectedChatId);
        return currentContact;
    }

    const getConversationByRoom = (roomId) => {
        let preloaderElement = document.querySelector('.preloader-container.preloader-swing');
        preloaderElement.classList.add('is-visible');
        chatRoomService.getConversationByRoomId(roomId)
        .then(res => {
            return res.conversation;
        })
        .then(data => {
            let newDataBubbles = generateMessageBubbles(data);
            setDataBubbles(newDataBubbles);
            setData(groupDataBubbles(newDataBubbles));
            let dataLastMessage = {
                messageBubble: newDataBubbles[newDataBubbles.length - 1],
                socketId: props.socket.id,
                roomId: roomId
            }
            props.socket.emit('lastMessageReceived', dataLastMessage);
            preloaderElement.classList.remove('is-visible');
        })
    }

    const generateMessageBubbles = (data) => {
        let user = userInfo;
        if(!user){
            user = JSON.parse(localStorage.getItem('userInfo'));
        }

        let bubbles = data.map(item => {
            return messageUtils.generateMessageBubble(item);
        });

        // let bubble = Object.assign({}, bubbles[0]);
        // bubble.messageType = 'MEDIA_IMAGE';
        // bubble.message = '<img class="media-photo" src="https://iili.io/VODrG4.jpg">';

        // bubbles.push(bubble);
        return bubbles;
    }

    const messageListener = (message) => {
        let currentContact = getContact();
        if(currentContact && currentContact.roomId === message.roomId){
            let newData = dataBubbles;
            let messageBubble = messageUtils.generateMessageBubble(message);
            newData.push(messageBubble);
            setData(groupDataBubbles(dataBubbles));
            let dataLastMessage = {
                messageBubble: messageBubble,
                socketId: props.socket.id,
                roomId: contact.roomId
            }
            props.socket.emit('lastMessageReceived', dataLastMessage);
        }            
    };

    useEffect(async ()=>{
        let currentContact = await getCurrentContact();
        setContact(currentContact);
        getConversationByRoom(currentContact.roomId);
    }, [props.selectedChatId]);

    useEffect(() => {
        let user = JSON.parse(localStorage.getItem('userInfo'));
        setUserInfo(user);
        setData(groupDataBubbles(dataBubbles));
    }, []);

    useEffect(() => {
      
        // const deleteMessageListener = (messageID) => {
        //   setMessages((prevMessages) => {
        //     const newMessages = {...prevMessages};
        //     delete newMessages[messageID];
        //     return newMessages;
        //   });
        // };
      
        if(props.socket) props.socket.on('receivedMessage', messageListener);
        // socket.on('deleteMessage', deleteMessageListener);
        // socket.emit('getMessages');
    
        return () => {
            if(props.socket) props.socket.off('receivedMessage', messageListener);
            // props.socket.off('deleteMessage', deleteMessageListener);
        };
      }, [props.socket, contact, dataBubbles]);

    return <div className="bubbles scrolled-down">
        <div className="scrollable scrollable-y">
            <div className="bubbles-inner has-rights is-chat is-channel">
                {
                    data && data.map((dateGroup, index) => {
                        if(index === (data.length - 1)){
                            return <BubblesDateGroup key={index} isLastGroup={true} messagesEndRef={messagesEndRef} dataBubblesDateGroup={dateGroup}/>
                        }else{
                            return <BubblesDateGroup key={index} isLastGroup={false} messagesEndRef={messagesEndRef} dataBubblesDateGroup={dateGroup}/>
                        }                        
                    })
                }                
            </div>
            <div ref={messagesEndRef} />
        </div>
        <div className="preloader-container preloader-swing is-visible">
            <div className="you-spin-me-round">
                <svg xmlns="http://www.w3.org/2000/svg" className="preloader-circular" viewBox="27 27 54 54">
                    <circle className="preloader-path-new" cx="54" cy="54" r="24" fill="none" strokeMiterlimit="10"></circle>
                </svg>
            </div>
        </div>
    </div>
}

export default Bubbles;