import React, {useEffect, useState} from "react";
import Bubble from "./bubble";

function BubblesDateGroup({dataBubblesDateGroup}){
    const [dataDateGroup, setdataDateGroup] = useState('');


    useEffect(() => {
        setdataDateGroup(dataBubblesDateGroup);
    }, []);
    return <><section className="bubbles-date-group">
        <div className="bubble service is-date">
            <div className="bubble-content">
                <div className="service-msg">
                    <span className="i18n">November 4, 2020</span>
                </div>
            </div>
        </div>
        <Bubble dataBubble={dataDateGroup[0]}/>
    </section>
    <section className="bubbles-date-group">
        <div className="bubble service is-date">
            <div className="bubble-content">
                <div className="service-msg">
                    <span className="i18n">November 5, 2020</span>
                </div>
            </div>
        </div>
        <Bubble dataBubble={dataDateGroup[1]}/>
        <Bubble dataBubble={dataDateGroup[2]}/>
        <Bubble dataBubble={dataDateGroup[3]}/>
    </section>
    </>
}

export default BubblesDateGroup;