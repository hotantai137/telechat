import React from "react";

const MESSAGE_TYPE = {
    MESSAGE: 'MESSAGE',
    MESSAGE_AND_EMOJI: 'MESSAGE_AND_EMOJI',
    EMOJI_1X: 'EMOJI_1X',
    EMOJI_2X: 'EMOJI_2X',
    EMOJI_3X: 'EMOJI_3X'
}
function Bubble({dataBubble}){
    const renderBubble = () =>{
        switch(dataBubble.messageType){
            case 'MESSAGE': return renderMessage(); break;
            case 'MESSAGE_AND_EMOJI': return renderMessage(); break;
            case 'EMOJI_1X': return renderEmoji1X(); break;
            case 'EMOJI_2X': break;
            case 'EMOJI_3X': break;
        }
    }

    function createMarkup() {
        return {
           __html: dataBubble.message};
     }; 

    const renderMessage = () =>{
        return (
            <div className={`bubble is-read ${dataBubble.isOut ? "is-out" : "is-in"} ${dataBubble.isHideName ? "hide-name" : ""} can-have-tail is-group-first is-group-last`} data-mid="8144224255" data-peer-id="520885308" data-timestamp="1604477469">
                    <div className="bubble-content-wrapper">
                        <div className="bubble-content">
                            <div className="message" dir="auto" >
                                <section dangerouslySetInnerHTML={createMarkup()}></section>
                                <span className="time tgico">
                                {/* <reactions-element className="reactions reactions-inline has-no-reactions"></reactions-element> */}
                                    <span className="i18n">{dataBubble.sendTime}</span>
                                    <div className="inner tgico" title="4 November 2020, 15:11:09">
                                    {/* <reactions-element className="reactions reactions-inline has-no-reactions"></reactions-element> */}
                                        <span className="i18n">{dataBubble.sendTime}</span>
                                    </div>
                                </span>
                            </div>
                            {/* <div className="attachment media-sticker-wrapper" data-doc-id="1258816259753961" style={{width: "112px", height: "112px"}}><canvas className="rlottie" width="112" height="112"></canvas></div> */}
                            <div data-peer-id="435185804" className="name" style={{color: "rgb(0, 193, 166)"}}>
                                <span className="peer-title" dir="auto" data-peer-id="435185804">{dataBubble.userName}</span>
                            </div>
                            <svg viewBox="0 0 11 20" width="11" height="20" className="bubble-tail">
                                <use href="#message-tail-filled">
                                <svg id="message-tail-filled" viewBox="0 0 11 20"><g transform="translate(9 -14)" fill="inherit" fillRule="evenodd"><path d="M-6 16h6v17c-.193-2.84-.876-5.767-2.05-8.782-.904-2.325-2.446-4.485-4.625-6.48A1 1 0 01-6 16z" transform="matrix(1 0 0 -1 0 49)" id="corner-fill" fill="inherit"></path></g></svg>
                                </use>
                            </svg>
                        </div>
                    </div>
                </div>
            )
    }
    const renderEmoji1X = () => {
        return (
            <div className={`bubble emoji-1x is-message-empty emoji-big is-read can-have-big-emoji just-media ${dataBubble.isOut ? "is-out" : "is-in"} ${dataBubble.isHideName ? "hide-name" : ""} `} data-mid="8144224255" data-peer-id="520885308" data-timestamp="1604477469">
                    <div className="bubble-content-wrapper">
                        <div className="bubble-content">
                            <div className="message" dir="auto">
                                <span className="time tgico">
                                    <span className="i18n">{dataBubble.sendTime}</span>
                                    <div className="inner tgico" title="4 November 2020, 15:11:09">
                                        <span className="i18n">{dataBubble.sendTime}</span>
                                    </div>
                                </span>
                            </div>
                            <div className="attachment">
                                <img src="/emoji/1fae0.png" alt="🫠" className="emoji" />
                            </div>
                        </div>
                    </div>
                </div>
            )
    }
    if(!dataBubble) return(<></>);
    return (<>{renderBubble()}</>
    // <div className={`bubble is-read ${dataBubble.isOut ? "is-out" : "is-in"} ${dataBubble.isHideName ? "hide-name" : ""} can-have-tail is-group-first is-group-last`} data-mid="8144224255" data-peer-id="520885308" data-timestamp="1604477469">
    //         <div className="bubble-content-wrapper">
    //             <div className="bubble-content">
    //                 <div className="message" dir="auto">
    //                     {/* {dataBubble.message} */}
    //                     <span className="time tgico">
    //                     {/* <reactions-element className="reactions reactions-inline has-no-reactions"></reactions-element> */}
    //                         <span className="i18n">{dataBubble.sendTime}</span>
    //                         <div className="inner tgico" title="4 November 2020, 15:11:09">
    //                         {/* <reactions-element className="reactions reactions-inline has-no-reactions"></reactions-element> */}
    //                             <span className="i18n">{dataBubble.sendTime}</span>
    //                         </div>
    //                     </span>
    //                 </div>
    //                 <div className="attachment">
    //                     <img src="/emoji/1fae0.png" alt="🫠" className="emoji" />
    //                 </div>
    //                 {/* <div className="attachment media-sticker-wrapper" data-doc-id="1258816259753961" style={{width: "112px", height: "112px"}}><canvas className="rlottie" width="112" height="112"></canvas></div> */}
    //                 {/* <div data-peer-id="435185804" className="name" style={{color: "rgb(0, 193, 166)"}}>
    //                     <span className="peer-title" dir="auto" data-peer-id="435185804">{dataBubble.userName}</span>
    //                 </div>
    //                 <svg viewBox="0 0 11 20" width="11" height="20" className="bubble-tail">
    //                     <use href="#message-tail-filled">
    //                     <svg id="message-tail-filled" viewBox="0 0 11 20"><g transform="translate(9 -14)" fill="inherit" fillRule="evenodd"><path d="M-6 16h6v17c-.193-2.84-.876-5.767-2.05-8.782-.904-2.325-2.446-4.485-4.625-6.48A1 1 0 01-6 16z" transform="matrix(1 0 0 -1 0 49)" id="corner-fill" fill="inherit"></path></g></svg>
    //                     </use>
    //                 </svg> */}
    //             </div>
    //         </div>
    //     </div>
    )
}

export default Bubble;