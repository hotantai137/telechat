import React, { useEffect, useState, useRef } from "react";
import BubblesDateGroup from "./bubbles-date-group";
import _ from 'lodash';

function Bubbles(props){
    const [dataBubbles, setDataBubbles] = useState([
        {
            date: 'November 4, 2020',
            userName: 'Tấn Tài',
            message: 'Hi',
            sendTime: '03:11 PM',
            isOut: true,
            isGroupFirst: true,
            isGroupLast: true,
            isHideName: false
        },
        {
            date: 'November 4, 2020',
            userName: 'Tấn Tài',
            message: "What's up men?",
            sendTime: '08:29 PM',
            isOut: false,
            isGroupFirst: true,
            isGroupLast: false,
            isHideName: false
        },
        {
            date: 'November 4, 2020',
            userName: 'Tấn Tài',
            message: "Do you want fuck me?",
            sendTime: '08:29 PM',
            isOut: false,
            isGroupFirst: true,
            isGroupLast: false,
            isHideName: false
        }
        ,
        {
            date: 'November 5, 2020',
            userName: 'Tấn Tài',
            message: "Of course! Let's Do it.",
            sendTime: '10:27 PM',
            isOut: true,
            isGroupFirst: true,
            isGroupLast: true,
            isHideName: false
        }
    ]);
    const [data, setData] = useState([]);
    const messagesEndRef = useRef(null);
    const [contact, setContact] = useState(null);

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

    useEffect(()=>{
        setContact(getCurrentContact());

    }, [props.selectedChatId]);

    useEffect(() => {        
        setData(groupDataBubbles(dataBubbles));
    }, []);

    useEffect(() => {
        const messageListener = (message) => {
            let currentContact = getContact();
            if(currentContact && currentContact.roomId === message.roomId){
                message.messageBubble.isOut = message.socketId === props.socket.id ? true : false;
                let newData = dataBubbles;
                newData.push(message.messageBubble);
                setData(groupDataBubbles(dataBubbles));
            }            
        };
      
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
      }, [props.socket, contact]);

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
    </div>
}

export default Bubbles;