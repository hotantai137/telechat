import React, { useEffect, useState } from "react";
import BubblesDateGroup from "./bubbles-date-group";

function Bubbles(props){
    const [data, setData] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        setData(props.dataBubbles);
        console.log('data1: ' + data);
    }, []);

    useEffect(() => {
        setData(props.dataBubbles);
        setRefreshing(!refreshing);
    }, [props.refreshing]);

    return <div className="bubbles scrolled-down">
        <div className="scrollable scrollable-y">
            <div className="bubbles-inner has-rights is-chat is-channel">
                <BubblesDateGroup dataBubblesDateGroup={data} refreshing={refreshing}/>
            </div>
        </div>
    </div>
}

export default Bubbles;