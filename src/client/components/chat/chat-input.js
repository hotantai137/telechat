import React, {useState, setState, useEffect, lazy, Suspense} from "react";
import sentIcon from '../../assets/image/sent-icon.png';
import moment from 'moment';
import imageService from '../../../api/services/image.js';
import s3Service from '../../../api/services/s3.js';
import messageService from '../../../api/services/message.js';

const EmojiContainer = lazy(() => import("./emoji-container"));

function ChatInput(props){
    const [userInfo, setUserInfo] = useState(null);
    const [chatContent, setChatContent] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [contact, setContact] = useState('');
    const [emojis, setEmojis] = useState([]);
    const [messageContentList, setmessageContentList] = useState([]);
    const [isShowMenuAttachment, setIsShowMenuAttachment] = useState(false);

    useEffect(()=>{
        let contactList = JSON.parse(localStorage.getItem('chatRoomList'));
        let currentContact = contactList.find(x => x.chatRoomId === props.selectedChatId);
        setContact(currentContact);

    }, [props.selectedChatId]);

    useEffect(() => {
        let user = JSON.parse(localStorage.getItem('userInfo'));
        setUserInfo(user);
        // let emojiImport = importEmoji(require.context('../../assets/image/emoji', false, /\.(png|jpe?g|svg)$/));
        // setEmojis(emojiImport);
    }, []);

    // function importEmoji(r) {
    //     let emojis = [];
    //     r.keys().forEach((key) => (emojis[key.replace('./', '')] = r(key)));

    //     return emojis;
    // }

    function onChatPush(event){
        if(event.key === 'Enter' && !event.shiftKey){
            onSend(event.target);            
            event.preventDefault();
        }
    }

    function onInput(event){
        setIsTyping(event.target.innerHTML ? true : false);
        // let data = {
        //     userName: userInfo.fullName,
        //     socketId: props.socket.id,
        //     roomId: contact.roomId
        // }
        if(event.target.innerHTML.length > 0){
            props.hubConnection.invoke("StartTyping", contact.userId, contact.chatRoomId);
        }else{
            props.hubConnection.invoke("StopTyping", contact.userId, contact.chatRoomId);
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

    function onSend(input){
        let inputEle = document.getElementById('input-message');
        messageService.sendMessage({
            ChatRoomId: contact.chatRoomId,
            Type: getTypeMessage(inputEle.innerHTML),
            Message: inputEle.innerHTML,
            userId: contact.userId
        });
        input.textContent  = '';
        setmessageContentList([]);
        setIsTyping(false);
        props.hubConnection.invoke("StopTyping", contact.userId, contact.chatRoomId);
        input.focus();
        // let bubble = {
        //     date: moment().format('LL'),
        //     userName: userInfo.fullName,
        //     message: input.innerHTML,
        //     sendTime: moment().format('LT'),
        //     isOut: true,
        //     isGroupFirst: true,
        //     isGroupLast: true,
        //     isHideName: false
        // }
        // let data = {
        //     messageBubble: bubble,
        //     messageList: splitMessage(),
        //     type: 'text',
        //     socketId: props.socket.id,
        //     roomId: contact.roomId,
        //     userId: userInfo._id
        // }
        if(input.innerHTML){
            // let data = {
            //     message: splitMessage(),
            //     type: 'text',
            //     socketId: props.socket.id,
            //     roomId: contact.roomId,
            //     userId: userInfo._id,
            //     userName: userInfo.fullName,
            //     sendTime: new Date(),
            // }

            // props.socket.emit('pushMessageToServer', data);
            // input.textContent  = '';
            // setmessageContentList([]);
            // setIsTyping(false);
            // input.focus();

            // let dataTyping = {
            //     userName: userInfo.fullName,
            //     socketId: props.socket.id,
            //     roomId: contact.roomId
            // }
            // props.socket.emit('stopTyping', dataTyping);
        }
    }

    function sendFile(filePath, type){        
        // let bubble = {
        //     // date: moment().format('LL'),
        //     userName: userInfo.fullName,
        //     message: '',
        //     sendTime: new Date(),
        //     isOut: true,
        //     isGroupFirst: true,
        //     isGroupLast: true,
        //     isHideName: false
        // }
        // let messageList = [
        //     {
        //         content: filePath,
        //         index: 0,
        //         contentType: type
        //     }
        // ]
        // let data = {
        //     messageBubble: bubble,
        //     message: messageList,
        //     type: 'image',
        //     socketId: props.socket.id,
        //     roomId: contact.roomId,
        //     userId: userInfo._id
        // }
        // props.socket.emit('pushMessageToServer', data);

        let urls = [];
        urls.push(filePath);
        messageService.sendMessage({
            ChatRoomId: contact.chatRoomId,
            Type: 3,
            Message: '',
            Urls: urls,
            userId: contact.userId
        });
    }

    function sendSticker(filePath, type){        
        let bubble = {
            userName: userInfo.fullName,
            message: '',
            sendTime: new Date(),
            isOut: true,
            isGroupFirst: true,
            isGroupLast: true,
            isHideName: false
        }
        let messageList = [
            {
                content: filePath,
                index: 0,
                contentType: 'sticker'
            }
        ]
        let data = {
            messageBubble: bubble,
            message: messageList,
            type: 'sticker',
            socketId: props.socket.id,
            roomId: contact.roomId,
            userId: userInfo._id
        }
        props.socket.emit('pushMessageToServer', data);
    }

    function sendGIF(gifId, type){        
        let bubble = {
            userName: userInfo.fullName,
            message: '',
            sendTime: new Date(),
            isOut: true,
            isGroupFirst: true,
            isGroupLast: true,
            isHideName: false
        }
        let messageList = [
            {
                content: gifId,
                index: 0,
                contentType: 'gif'
            }
        ]
        let data = {
            messageBubble: bubble,
            message: messageList,
            type: 'gif',
            socketId: props.socket.id,
            roomId: contact.roomId,
            userId: userInfo._id
        }
        props.socket.emit('pushMessageToServer', data);
    }

    function splitMessage(){
        let messageList = [];
        let input = document.getElementById('input-message');
        let inputValue = input.innerHTML;
        // let emojiArr = inputValue.match(/(<.*?>|[^<]+)\s*/g);
        let emojiArr = inputValue.match(/(<.*?>)|([^<.?*^>])*/g);
        for(let i = 0; i < emojiArr.length; i++){
            if(emojiArr[i].length === 0) continue;
            if(emojiArr[i].includes('<img src')){
                //Emoji
                let message = {
                    content: emojiArr[i].match(/emoji.*?png/g)[0],
                    index: i,
                    contentType: 'image'
                }
                messageList.push(message);
            }else{
                //Text
                let message = {
                    content: emojiArr[i],
                    index: i,
                    contentType: 'text'
                }
                messageList.push(message);
            }
        }

        return messageList;
    }

    function getTypeMessage(message){
        const arrEmoji = message.match(/<img[^>]*src="([^"]+)"[^>]*>/gm);
        let messageText = message;
        if(!arrEmoji || arrEmoji.length == 0) return 0;

        arrEmoji.forEach(emoji => {
            messageText = messageText.replace(emoji, '');
        });

        messageText = messageText.replace(' ', '');

        if(messageText.length == 0) return 2;

        return 1;
    }

    function onShowEmoji(){
        let emojiDropdown = document.getElementById('emoji-dropdown');
        // emojiDropdown.classList.remove("emoji-dropdown");
        emojiDropdown.classList.add("active");
        // let input = document.getElementById('input-message').firstChild;
        // var range = document.createRange();
        // range.setStart(input, 4);
        // range.setEnd(input, 4);
        // var selection = window.getSelection();
        // selection.removeAllRanges();
        // selection.addRange(range);
        // if(document.activeElement === document.getElementById('input-message')){
        //     document.getSelection
        // }else{

        // }
        // document.getElementById('input-message').setSelectionRange(document.getElementById('input-message').innerText.length -1,document.getElementById('input-message').innerText.length -1);
        // document.getElementById('input-message').focus();
        // emojiDropdown.addClass
    }

    function onCloseEmoji(){
        let emojiDropdown = document.getElementById('emoji-dropdown');
        emojiDropdown.classList.remove("active");
    }

    function onToggleMenuAttachMent(){
        setIsShowMenuAttachment(!isShowMenuAttachment);
    }

    function attachImage(){
        var inputImage = document.createElement("input");   
        inputImage.type = "file";
        inputImage.accept = 'image/*';
        inputImage.addEventListener("change", ()=>{showImage(inputImage.files);console.log(inputImage.value);});   
        inputImage.click();
    }

    async function showImage(files){
        let fileName = files[0].name;
        let res = await s3Service.uploadImage(fileName, files[0]);
        let filePath = res ? res.Location : '';
        sendFile(filePath, 'image');
        // getBase64(files[0]).then(
        //      async data =>{
        //         var strImage = data.replace(/^data:image\/[a-z]+;base64,/, "");
        //         // const res = await imageService.uploadImage(strImage);
        //         let blob = new Blob(await file.arrayBuffer());
        //         s3Service.uploadImage(files[0].name, files[0]);
        //         // console.log(res.status_code);
        //     }
        // );
    }

    function getBase64(file) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
        });
    }

    function selectSticker(path){
        console.log(path);
        sendSticker(path, 'sticker');
    }

    function selectGIF(id){
        console.log(id);
        sendGIF(id, 'gif');
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
                            {/* <i className="far fa-smile"></i> */}
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
                        <div className={`btn-icon btn-menu-toggle attach-file tgico-attach ${isShowMenuAttachment ? "menu-open" : ""}`}
                        onClick={onToggleMenuAttachMent}>
                            {/* <i className="far fa-paperclip"></i> */}
                            {
                                isShowMenuAttachment && (<div className="btn-menu-overlay"></div>)
                            }
                            
                            <div className={`btn-menu top-left ${isShowMenuAttachment ? "active" : ""}`}>
                                <div className="btn-menu-item rp-overflow tgico-image rp" onClick={attachImage}>
                                    {/* <i className="fas fa-image"></i> */}
                                    <div className="c-ripple"></div>
                                    <span className="i18n btn-menu-item-text">Photo or Video</span>
                                </div>
                                <div className="btn-menu-item rp-overflow tgico-document rp">
                                    {/* <i className="fas fa-file"></i> */}
                                    <div className="c-ripple"></div>
                                    <span className="i18n btn-menu-item-text">Document</span>
                                </div>
                                {/* <div className="btn-menu-item rp-overflow tgico-poll rp hide">
                                    <div className="c-ripple"></div>
                                    <span className="i18n btn-menu-item-text">Poll</span>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="btn-send-container">
                <div className="record-ripple"></div>
                <button className={`btn-icon tgico-none btn-circle z-depth-1 btn-send animated-button-icon rp ${isTyping ? "send" : "record"}`}
                onClick={onSend}>
                    <span className="tgico tgico-send">
                        {/* <img src={sentIcon} style={{with: "24px", height: "24px", marginLeft: "5px"}}></img> */}
                    </span>
                    <span className="tgico tgico-schedule"></span>
                    <span className="tgico tgico-check"></span>
                    <span class="tgico tgico-microphone_filled"></span>
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
            <Suspense fallback={<div>Loading Emoji...</div>}>
                <EmojiContainer selectSticker={selectSticker} selectGIF={selectGIF}/>
            </Suspense>
        </div>        
    </div>
}

export default ChatInput;