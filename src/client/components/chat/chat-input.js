import React, {useState, setState, useEffect} from "react";
import sentIcon from '../../assets/image/sent-icon.png';
import moment from 'moment';

function ChatInput(props){
    const [userInfo, setUserInfo] = useState(null);
    const [chatContent, setChatContent] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    useEffect(() => {
        let user = JSON.parse(localStorage.getItem('userInfo'));
        setUserInfo(user);
    }, []);

    function onChatPush(event){
        if(event.key === 'Enter' && !event.shiftKey){
            // props.pushMessage(event.target.innerText);
            let bubble = {
                date: 'November 5, 2020',
                userName: userInfo.fullName,
                message: event.target.innerText,
                sendTime: moment().format('LT'),
                isOut: true,
                isGroupFirst: true,
                isGroupLast: true,
                isHideName: false
            }
            let data = {
                messageBubble: bubble,
                socketId: props.socket.id
            }
            props.socket.emit('pushMessageToServer', data);
            event.target.textContent  = '';  
            setIsTyping(false);          
            event.preventDefault();
        }
    }

    function onInput(event){
        setIsTyping(event.target.innerHTML ? true : false);
    }

    function onKeyUp(event){
        // if(event.keyCode === 8){//backspace
        //     let selection = window.getSelection();
        //     let selectionRange = selection.getRangeAt(0);
        //     let startOffset = selectionRange.startOffset;
        //     let endOffset = selection.endOffset;
        //     let selectedText = selection.toString();
        //     let value = selection.focusNode.nodeValue;
        //     let newValue = value.slice(0, startOffset) + value.slice(endOffset);
        //     console.log(newValue);
        // }
    }

    return <div className="chat-input">
        <div className="chat-input-container">
            <div className="rows-wrapper-wrapper">
                <div className="rows-wrapper chat-input-wrapper">
                    <svg viewBox="0 0 11 20" width="11" height="20" className="bubble-tail">
                        <use href="#message-tail-filled">
                        <svg id="message-tail-filled" viewBox="0 0 11 20"><g transform="translate(9 -14)" fill="inherit" fillRule="evenodd"><path d="M-6 16h6v17c-.193-2.84-.876-5.767-2.05-8.782-.904-2.325-2.446-4.485-4.625-6.48A1 1 0 01-6 16z" transform="matrix(1 0 0 -1 0 49)" id="corner-fill" fill="inherit"></path></g></svg>
                        </use>
                    </svg>
                    <div className="new-message-wrapper">
                        <button className="btn-icon tgico-none toggle-emoticons">
                            <i className="far fa-smile"></i>
                        </button>
                        <div className="input-message-container">
                            <div className="input-message-input scrollable scrollable-y i18n no-scrollbar"
                                id="input-message"
                                dir="auto" data-placeholder="Message" style={{transitionDuration: '152ms', height: '37px'}} contentEditable="true"
                                onKeyPress={onChatPush}
                                onKeyUp={onKeyUp}
                                onInput={onInput}
                                >
                            </div>
                        </div>
                        <div className="btn-icon btn-menu-toggle attach-file tgico-attach">
                            <i className="far fa-paperclip"></i>
                            {/* <div class="btn-menu top-left">
                                <div class="btn-menu-item rp-overflow tgico-image rp">
                                    <div class="c-ripple"></div>
                                        <span class="i18n btn-menu-item-text">Photo or Video</span>
                                </div>
                                <div class="btn-menu-item rp-overflow tgico-document rp">
                                    <div class="c-ripple"></div>
                                    <span class="i18n btn-menu-item-text">Document</span>
                                </div>
                                <div class="btn-menu-item rp-overflow tgico-poll rp hide">
                                    <div class="c-ripple"></div>
                                    <span class="i18n btn-menu-item-text">Poll</span>
                                </div>
                            </div> */}
                    </div>
                    </div>
                </div>
            </div>
            <div className="btn-send-container">
                <div className="record-ripple"></div>
                <button className={`btn-icon tgico-none btn-circle z-depth-1 btn-send animated-button-icon rp ${isTyping ? "send" : "record"}`}>
                    <span className="tgico tgico-send"><img src={sentIcon} style={{with: "24px", height: "24px", marginLeft: "5px"}}></img></span>
                    <span className="tgico tgico-schedule"></span>
                    <span className="tgico tgico-check"></span>
                    <span className="tgico tgico-microphone"><i className="fal fa-microphone"></i></span>
                    <div className="c-ripple"></div>
                </button>
                {/* <div className="btn-menu menu-send top-left">
                    <div className="btn-menu-item rp-overflow tgico-mute rp">
                        <div className="c-ripple"></div>
                        <span className="i18n btn-menu-item-text">Send Without Sound</span></div>
                        <div className="btn-menu-item rp-overflow tgico-schedule rp">
                            <div className="c-ripple"></div>
                            <span className="i18n btn-menu-item-text">Schedule Message</span>
                        </div>
                        <div className="btn-menu-item rp-overflow tgico-schedule rp">
                        <div className="c-ripple"></div>
                        <span className="i18n btn-menu-item-text">Set a Reminder</span>
                    </div>
                </div> */}
            </div>
        </div>
        {/* <div className="emoji-dropdown" id="emoji-dropdown">
        </div> */}
    </div>
}

export default ChatInput;