import React, {useEffect, useState} from "react";
import Bubble from "./bubble";

function BubblesDateGroup(props){
    const [dataDateGroup, setdataDateGroup] = useState('');


    useEffect(() => {
        setdataDateGroup(props.dataBubblesDateGroup);
    }, []);

    useEffect(() => {
        setdataDateGroup(props.dataBubblesDateGroup);
    }, [props.refreshing]);

    function Buble(data) {
        if(data){
            return (
                <Bubble dataBubble={data}/>
              );
        }        
      }

    return <><section className="bubbles-date-group">
        <div className="bubble service is-date">
            <div className="bubble-content">
                <div className="service-msg">
                    <span className="i18n">November 4, 2020</span>
                </div>
            </div>
        </div>
        {
            dataDateGroup && dataDateGroup.map(bubble => {
                return <Bubble dataBubble={bubble}/>
            })
        }
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
        {
            dataDateGroup[4] && <Bubble dataBubble={dataDateGroup[4]}/>
        }
    </section>
    </>
}

export default BubblesDateGroup;