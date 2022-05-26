import moment from "moment";

const userInfo = JSON.parse(localStorage.getItem('userInfo'));
export default{
    generateMessageBubble: (data) => {
        if(!data || !data.message) return;
        if(!userInfo){
            userInfo = JSON.parse(localStorage.getItem('userInfo'));
        }

        let isOut = data.userId === userInfo._id ? true : false;
        let isContentImage = data.type === 'text' && data.message.some(e => e.contentType === 'image') ? true : false;
        let isContentText = data.type === 'text' && data.message.some(e => e.contentType === 'text') ? true : false;
        let messageText = '';
        let messageType = data.type === 'image' ? 'MEDIA_IMAGE' : '';
        let filePath = '';
        if(isContentText && isContentImage){
            messageType = 'MESSAGE_AND_EMOJI';
        }else if(isContentText){
            messageType = 'MESSAGE';
        }else if(isContentImage){
            if(data.message.length === 1){
                messageType = 'EMOJI_1X';
            }else if(data.message.length === 2){
                messageType = 'EMOJI_2X';
            }else if(data.message.length === 3){
                messageType = 'EMOJI_3X';
            }else{
                messageType = 'MESSAGE_AND_EMOJI';
            }
        }else if(data.type === 'sticker'){
            messageType = 'STICKER';
        }else if(data.type === 'gif'){
            messageType = 'GIF';
        }

        if(messageType === 'MESSAGE'){
            messageText = data.message[0].content;
        }else if(messageType === 'MEDIA_IMAGE'){
            messageText = `<img class="media-photo" src="${data.message[0].content}">`;
            filePath = data.message[0].content;
        }else if(messageType === 'STICKER'){
            messageText = `<img class="media-sticker" src="${data.message[0].content}"/>`;
            filePath = data.message[0].content;
        }else if(messageType === 'GIF'){
            messageText = data.message[0].content;
        }else{
            data.message.map(messageItem => {
                if(messageItem.contentType === 'text'){
                    messageText += messageItem.content;
                }else if(messageItem.contentType === 'image'){
                    messageText += `<img src="/${messageItem.content}" alt="🙄" class="emoji" loading="lazy"/>`;
                }
            });
        }

        let bubble = {
            date: moment(data.sendTime).format('LL'),
            userName: data.userName,
            message: messageText,
            filePath: filePath,
            messageType: messageType,
            sendTime: moment(data.sendTime).format('LT'),
            isOut: isOut,
            isGroupFirst: true,
            isGroupLast: true,
            isHideName: false
        };

        return bubble;
    }
}