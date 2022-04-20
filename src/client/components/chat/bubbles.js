import React, { useEffect, useState, useRef } from "react";
import BubblesDateGroup from "./bubbles-date-group";
import _ from 'lodash';
import chatRoomService from '../../../api/services/chat-room.js';

function Bubbles(props){
    const [dataBubbles, setDataBubbles] = useState([
        // {
        //     date: 'November 4, 2020',
        //     userName: 'Tấn Tài',
        //     message: 'Hi',
        //     sendTime: '03:11 PM',
        //     isOut: true,
        //     isGroupFirst: true,
        //     isGroupLast: true,
        //     isHideName: false
        // },
        // {
        //     date: 'November 4, 2020',
        //     userName: 'Tấn Tài',
        //     message: "What's up men?",
        //     sendTime: '08:29 PM',
        //     isOut: false,
        //     isGroupFirst: true,
        //     isGroupLast: false,
        //     isHideName: false
        // },
        // {
        //     date: 'November 4, 2020',
        //     userName: 'Tấn Tài',
        //     message: "Do you want fuck me?",
        //     sendTime: '08:29 PM',
        //     isOut: false,
        //     isGroupFirst: true,
        //     isGroupLast: false,
        //     isHideName: false
        // }
        // ,
        // {
        //     date: 'November 5, 2020',
        //     userName: 'Tấn Tài',
        //     message: "Of course! Let's Do it.",
        //     sendTime: '10:27 PM',
        //     isOut: true,
        //     isGroupFirst: true,
        //     isGroupLast: true,
        //     isHideName: false
        // }
    ]);
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
            generateMessageBubbles(data);
            preloaderElement.classList.remove('is-visible');
        })
    }

    const generateMessageBubbles = (data) => {
        let user = userInfo;
        if(!user){
            user = JSON.parse(localStorage.getItem('userInfo'));
        }

        let bubbles = data.map(item => {
            let date = 'November 4, 2020';
            let userName = item.postedByUser.fullName;
            let messageText = '';
            let sendTime = '03:11 PM';
            let isOut = item.postedByUser._id === user._id ? true : false;            
            let isContentImage = item.message.some(e => e.contentType === 'image') ? true : false;
            let isContentText = item.message.some(e => e.contentType === 'text') ? true : false;
            let messageType = '';
            if(isContentText && isContentImage){
                messageType = 'MESSAGE_AND_EMOJI';
            }else if(isContentText){
                messageType = 'MESSAGE';
            }else if(isContentImage){
                if(item.message.length === 1){
                    messageType = 'EMOJI_1X';
                }else if(item.message.length === 2){
                    messageType = 'EMOJI_2X';
                }
            }
            // let messageType = isContentText ? (isContentImage ? 'MESSAGE_AND_EMOJI' : 'MESSAGE') : isContentImage ? ;
            if (isContentImage) {
                item.message.map(messageItem => {
                    if(messageItem.contentType === 'text'){
                        messageText += messageItem.content;
                    }else if(messageItem.contentType === 'image'){
                        messageText += `<img src="/${messageItem.content}" alt="🙄" class="emoji" loading="lazy"/>`;
                    }
                });
            }else{
                messageText= item.message[0].content;
            }
            let bubble = {
                date: date,
                userName: userName,
                message: messageText,
                messageType: messageType,
                sendTime: sendTime,
                isOut: isOut,
                isGroupFirst: true,
                isGroupLast: true,
                isHideName: false
            };

            return bubble;
        });

        setDataBubbles(bubbles);
        setData(groupDataBubbles(bubbles));
        console.log(bubbles);
    }

    const messageListener = (message) => {
        let currentContact = getContact();
        if(currentContact && currentContact.roomId === message.roomId){
            message.messageBubble.isOut = message.socketId === props.socket.id ? true : false;
            let newData = dataBubbles;
            newData.push(message.messageBubble);
            setData(groupDataBubbles(dataBubbles));
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