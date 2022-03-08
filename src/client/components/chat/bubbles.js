import React, { useEffect, useState, useRef } from "react";
import BubblesDateGroup from "./bubbles-date-group";
import _ from 'lodash';

function Bubbles(props){
    const [data, setData] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const messagesEndRef = useRef(null);

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

    useEffect(() => {        
        setData(groupDataBubbles(props.dataBubbles));
        // scrollToBottom();
    }, []);

    useEffect(() => {
        setData(groupDataBubbles(props.dataBubbles));
        setRefreshing(!refreshing);
        // scrollToBottom();
    }, [props.dataBubbles]);

    return <div className="bubbles scrolled-down">
        <div className="scrollable scrollable-y">
            <div className="bubbles-inner has-rights is-chat is-channel">
                {
                    data && data.map((dateGroup, index) => {
                        if(index === (data.length - 1)){
                            return <BubblesDateGroup isLastGroup={true} messagesEndRef={messagesEndRef} dataBubblesDateGroup={dateGroup} refreshing={refreshing}/>
                        }else{
                            return <BubblesDateGroup isLastGroup={false} messagesEndRef={messagesEndRef} dataBubblesDateGroup={dateGroup} refreshing={refreshing}/>
                        }
                        
                    })
                }                
            </div>
            <div ref={messagesEndRef} />
        </div>
        
    </div>
}

export default Bubbles;