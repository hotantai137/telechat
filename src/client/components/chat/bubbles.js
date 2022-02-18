import React from "react";
import BubblesDateGroup from "./bubbles-date-group";

function Bubbles(){
    return <div className="bubbles scrolled-down">
        <div className="scrollable scrollable-y">
            <div className="bubbles-inner has-rights is-chat is-channel">
                <BubblesDateGroup/>
            </div>
        </div>
    </div>
}

export default Bubbles;