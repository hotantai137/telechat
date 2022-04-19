import React, {useState, setState, useEffect} from "react";
import sentIcon from '../../assets/image/sent-icon.png';
import CONSTANTS from '../../../common/constants.json';
import moment from 'moment';

function ChatInput(props){
    const [userInfo, setUserInfo] = useState(null);
    const [chatContent, setChatContent] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [contact, setContact] = useState('');
    const [emojis, setEmojis] = useState([]);

    useEffect(()=>{
        let contactList = JSON.parse(localStorage.getItem('contactList'));
        let currentContact = contactList.find(x => x._id === props.selectedChatId);
        setContact(currentContact);

    }, [props.selectedChatId]);

    useEffect(() => {
        let user = JSON.parse(localStorage.getItem('userInfo'));
        setUserInfo(user);
        let emojiImport = importEmoji(require.context('../../assets/image/emoji', false, /\.(png|jpe?g|svg)$/));
        setEmojis(emojiImport);        
    }, []);

    function importEmoji(r) {
        let emojis = [];
        r.keys().forEach((key) => (emojis[key.replace('./', '')] = r(key)));

        return emojis;
    }

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
                socketId: props.socket.id,
                roomId: contact.roomId,
                userId: userInfo._id
            }

            if(event.target.innerText){
                props.socket.emit('pushMessageToServer', data);
                event.target.textContent  = '';  
                setIsTyping(false);
                let dataTyping = {
                    userName: userInfo.fullName,
                    socketId: props.socket.id,
                    roomId: contact.roomId
                }
                props.socket.emit('stopTyping', dataTyping);
            }
            
            event.preventDefault();
        }
    }

    function onInput(event){
        setIsTyping(event.target.innerHTML ? true : false);
        let data = {
            userName: userInfo.fullName,
            socketId: props.socket.id,
            roomId: contact.roomId
        }
        if(event.target.innerHTML.length > 0){
            props.socket.emit('typing', data);
        }else{
            props.socket.emit('stopTyping', data);
        }
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

    function onSend(){
        let input = document.getElementById('input-message');
        
        let bubble = {
            date: 'November 5, 2020',
            userName: userInfo.fullName,
            message: input.innerText,
            sendTime: moment().format('LT'),
            isOut: true,
            isGroupFirst: true,
            isGroupLast: true,
            isHideName: false
        }
        let data = {
            messageBubble: bubble,
            socketId: props.socket.id,
            roomId: contact.roomId,
            userId: userInfo._id
        }
        if(input.innerText){
            props.socket.emit('pushMessageToServer', data);
            input.textContent  = '';  
            setIsTyping(false);
            input.focus();

            let dataTyping = {
                userName: userInfo.fullName,
                socketId: props.socket.id,
                roomId: contact.roomId
            }
            props.socket.emit('stopTyping', dataTyping);
        }
    }

    function onShowEmoji(){
        let emojiDropdown = document.getElementById('emoji-dropdown');
        // emojiDropdown.classList.remove("emoji-dropdown");
        emojiDropdown.classList.add("active");
        // emojiDropdown.addClass
    }

    function onCloseEmoji(){
        let emojiDropdown = document.getElementById('emoji-dropdown');
        emojiDropdown.classList.remove("active");
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
                        <button className="btn-icon tgico-none toggle-emoticons"
                        onClick={onShowEmoji}>
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
                            {/* <div className="btn-menu top-left">
                                <div className="btn-menu-item rp-overflow tgico-image rp">
                                    <div className="c-ripple"></div>
                                        <span className="i18n btn-menu-item-text">Photo or Video</span>
                                </div>
                                <div className="btn-menu-item rp-overflow tgico-document rp">
                                    <div className="c-ripple"></div>
                                    <span className="i18n btn-menu-item-text">Document</span>
                                </div>
                                <div className="btn-menu-item rp-overflow tgico-poll rp hide">
                                    <div className="c-ripple"></div>
                                    <span className="i18n btn-menu-item-text">Poll</span>
                                </div>
                            </div> */}
                    </div>
                    </div>
                </div>
            </div>
            <div className="btn-send-container">
                <div className="record-ripple"></div>
                <button className={`btn-icon tgico-none btn-circle z-depth-1 btn-send animated-button-icon rp ${isTyping ? "send" : "record"}`}
                onClick={onSend}>
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
        <div className="emoji-dropdown" id="emoji-dropdown"
        onMouseLeave={onCloseEmoji}>
            <div className="emoji-container">
                <div className="tabs-container" data-animation="tabs">
                    <div className="tabs-tab emoji-padding active">
                        <nav className="menu-horizontal-div no-stripe">
                            <button className="menu-horizontal-div-item btn-icon tgico-recent rp active"><i className="far fa-smile"></i></button>
                            <button className="menu-horizontal-div-item btn-icon tgico-smile rp"><i className="far fa-smile"></i></button>
                            <button className="menu-horizontal-div-item btn-icon tgico-animals rp"><i className="far fa-smile"></i></button>
                            <button className="menu-horizontal-div-item btn-icon tgico-eats rp"><i className="far fa-smile"></i></button>
                            <button className="menu-horizontal-div-item btn-icon tgico-car rp"><i className="far fa-smile"></i></button>
                            <button className="menu-horizontal-div-item btn-icon tgico-sport rp"><i className="far fa-smile"></i></button>
                            <button className="menu-horizontal-div-item btn-icon tgico-lamp rp"><i className="far fa-smile"></i></button>
                            <button className="menu-horizontal-div-item btn-icon tgico-flag rp"><i className="far fa-smile"></i></button>
                        </nav>
                        <div className="emoticons-content" id="content-emoji">
                            <div className="scrollable scrollable-y">
                                <div className="emoji-category">
                                    <div className="category-title">
                                        <span className="i18n">Frequently Used</span>
                                    </div>
                                    <div className="super-emojis">
                                        <span className="super-emoji">
                                            <img src={emojis['1f692.png']} alt="🙄" className="emoji" loading="lazy"/>
                                            <span className="emoji-placeholder"></span>
                                        </span>
                                        <span className="super-emoji">
                                            <img src={emojis['1f692.png']} alt="😉" className="emoji" loading="lazy"/>
                                            <span className="emoji-placeholder"></span>
                                        </span>
                                        <span className="super-emoji">
                                            <img src={emojis['1f692.png']} alt="😏" className="emoji"/>
                                        </span>
                                        <span className="super-emoji">
                                            <img src={emojis['1f970.png']} alt="🇯🇵" className="emoji" loading="lazy"/>
                                            <span className="emoji-placeholder"></span>
                                        </span>
                                    </div>
                                    <div className="sticky_sentinel sticky_sentinel--top"></div>
                                </div>
                                <div className="emoji-category">
                                    <div className="category-title">
                                        <span className="i18n">Smileys & People</span>
                                    </div>
                                    <div className="super-emojis">
                                        {
                                            CONSTANTS.EMOJIS.SMILEYS_AND_PEOPLE_EMOJIS && CONSTANTS.EMOJIS.SMILEYS_AND_PEOPLE_EMOJIS.map(emojiName => {
                                                return <span className="super-emoji">
                                                    <img src={emojis[emojiName]} alt="🙄" className="emoji" loading="lazy"/>
                                                    <span className="emoji-placeholder"></span>
                                                </span>
                                            })
                                        }
                                    </div>
                                    <div className="sticky_sentinel sticky_sentinel--top"></div>
                                </div>                                
                                <div className="emoji-category">
                                    <div className="category-title">
                                        <span className="i18n">Animals & Nature</span>
                                    </div>
                                    <div className="super-emojis">
                                        {
                                            CONSTANTS.EMOJIS.ANIMALS_AND_NATUR_MOJIS && CONSTANTS.EMOJIS.ANIMALS_AND_NATUR_MOJIS.map(emojiName => {
                                                return <span className="super-emoji">
                                                    <img src={emojis[emojiName]} alt="🙄" className="emoji" loading="lazy"/>
                                                    <span className="emoji-placeholder"></span>
                                                </span>
                                            })
                                        }
                                    </div>
                                    <div className="sticky_sentinel sticky_sentinel--top"></div>
                                </div>
                                <div className="emoji-category">
                                    <div className="category-title">
                                        <span className="i18n">Food & Drink</span>
                                    </div>
                                    <div className="super-emojis">
                                        {
                                            CONSTANTS.EMOJIS.FOOD_AND_DRINK_EMOJIS && CONSTANTS.EMOJIS.FOOD_AND_DRINK_EMOJIS.map(emojiName => {
                                                return <span className="super-emoji">
                                                    <img src={emojis[emojiName]} alt="🙄" className="emoji" loading="lazy"/>
                                                    <span className="emoji-placeholder"></span>
                                                </span>
                                            })
                                        }
                                    </div>
                                    <div className="sticky_sentinel sticky_sentinel--top"></div>
                                </div>
                                <div className="emoji-category">
                                    <div className="category-title">
                                        <span className="i18n">Travel & Places</span>
                                    </div>
                                    <div className="super-emojis">
                                        {
                                            CONSTANTS.EMOJIS.TRAVEL_AND_PLACES_EMOJIS && CONSTANTS.EMOJIS.TRAVEL_AND_PLACES_EMOJIS.map(emojiName => {
                                                return <span className="super-emoji">
                                                    <img src={emojis[emojiName]} alt="🙄" className="emoji" loading="lazy"/>
                                                    <span className="emoji-placeholder"></span>
                                                </span>
                                            })
                                        }
                                    </div>
                                    <div className="sticky_sentinel sticky_sentinel--top"></div>
                                </div>
                                <div className="emoji-category">
                                    <div className="category-title">
                                        <span className="i18n">Activity & Sport</span>
                                    </div>
                                    <div className="super-emojis">
                                        {
                                            CONSTANTS.EMOJIS.ACTIVITY_AND_SPORT_EMOJIS && CONSTANTS.EMOJIS.ACTIVITY_AND_SPORT_EMOJIS.map(emojiName => {
                                                return <span className="super-emoji">
                                                    <img src={emojis[emojiName]} alt="🙄" className="emoji" loading="lazy"/>
                                                    <span className="emoji-placeholder"></span>
                                                </span>
                                            })
                                        }
                                    </div>
                                    <div className="sticky_sentinel sticky_sentinel--top"></div>
                                </div>
                                <div className="emoji-category">
                                    <div className="category-title">
                                        <span className="i18n">Objects</span>
                                    </div>
                                    <div className="super-emojis">
                                        {
                                            CONSTANTS.EMOJIS.OBJECTS_EMOJIS && CONSTANTS.EMOJIS.OBJECTS_EMOJIS.map(emojiName => {
                                                return <span className="super-emoji">
                                                    <img src={emojis[emojiName]} alt="🙄" className="emoji" loading="lazy"/>
                                                    <span className="emoji-placeholder"></span>
                                                </span>
                                            })
                                        }
                                    </div>
                                    <div className="sticky_sentinel sticky_sentinel--top"></div>
                                </div>
                                <div className="emoji-category">
                                    <div className="category-title">
                                        <span className="i18n">Flags</span>
                                    </div>
                                    <div className="super-emojis">
                                        {
                                            CONSTANTS.EMOJIS.FLAGS_EMOJIS && CONSTANTS.EMOJIS.FLAGS_EMOJIS.map(emojiName => {
                                                return <span className="super-emoji">
                                                    <img src={emojis[emojiName]} alt="🙄" className="emoji" loading="lazy"/>
                                                    <span className="emoji-placeholder"></span>
                                                </span>
                                            })
                                        }
                                    </div>
                                    <div className="sticky_sentinel sticky_sentinel--top"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="emoji-tabs menu-horizontal-div no-stripe">
                <button className="menu-horizontal-div-item emoji-tabs-search justify-self-start btn-icon tgico-search rp hide" data-tab="-1">
                    <div className="c-ripple"><i className="far fa-smile"></i></div>
                </button>
                <button className="menu-horizontal-div-item emoji-tabs-emoji btn-icon tgico-smile rp active" data-tab="0">
                    <div className="c-ripple"><i className="far fa-smile"></i></div>
                </button>
                <button className="menu-horizontal-div-item emoji-tabs-stickers btn-icon tgico-stickers rp" data-tab="1">
                    <div className="c-ripple"><i className="far fa-smile"></i></div>
                </button>
                <button className="menu-horizontal-div-item emoji-tabs-gifs btn-icon tgico-gifs rp" data-tab="2">
                    <div className="c-ripple"><i className="fa-light fa-gif"></i></div>
                </button>
                <button className="menu-horizontal-div-item emoji-tabs-delete justify-self-end btn-icon tgico-deleteleft rp" data-tab="-1">
                    <div className="c-ripple"><i className="far fa-smile"></i></div>
                </button>
            </div>
        </div>        
    </div>
}

export default ChatInput;