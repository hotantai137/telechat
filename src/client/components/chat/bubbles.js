import React, { useEffect } from "react";
import BubblesDateGroup from "./bubbles-date-group";

function Bubbles(props){
    // useEffect(() => {
    // }, []);
    return <div className="bubbles scrolled-down">
        <div className="scrollable scrollable-y">
            <div className="bubbles-inner has-rights is-chat is-channel">
                <BubblesDateGroup dataBubblesDateGroup={props.dataBubbles}/>
            </div>
        </div>
    </div>
}

export default Bubbles;