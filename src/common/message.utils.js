import moment from "moment";

const MESSAGE_TYPE = {
    MESSAGE: 0,
    MESSAGE_AND_EMOJI: 1,
    EMOJI: 2,
    EMOJI_1X: 'EMOJI_1X',
    EMOJI_2X: 'EMOJI_2X',
    EMOJI_3X: 'EMOJI_3X',
    MEDIA_IMAGE: 'MEDIA_IMAGE',
    MEDIA_VIDEO: 'MEDIA_VIDEO',
    MEDIA_ALBUM: 'MEDIA_ALBUM',
    STICKER: 'STICKER',
    GIF: 'GIF'
}
const userInfo = JSON.parse(localStorage.getItem('userInfo'));
export default{
    generateMessageBubble: (data) => {
        if(!data || !data.message) return;
        if(!userInfo){
            userInfo = JSON.parse(localStorage.getItem('userInfo'));
        }

        let isOut = data.userId === userInfo.id ? true : false;
        // let isContentImage = data.type === MESSAGE.MESSAGE_TYPE.MESSAGE && data.message.some(e => e.contentType === 'image') ? true : false;
        // let isContentText = data.type === MESSAGE.MESSAGE_TYPE.MESSAGE && data.message.some(e => e.contentType === 'text') ? true : false;
        let isContentImage = [MESSAGE_TYPE.MESSAGE_AND_EMOJI, MESSAGE_TYPE.EMOJI, MESSAGE_TYPE.MEDIA_IMAGE].includes(data.type) ? true : false;
        let isContentText = [MESSAGE_TYPE.MESSAGE_AND_EMOJI, MESSAGE_TYPE.MESSAGE].includes(data.type) ? true : false;
        let messageText = '';
        let messageType = data.type === 'image' ? 'MEDIA_IMAGE' : '';
        let filePath = '';
        if(isContentText && isContentImage){
            messageType = 'MESSAGE_AND_EMOJI';
        }else if(isContentText){
            messageType = 'MESSAGE';
        }else if(isContentImage){
            // const myRex = /<emoji\s*.*>\s*.*<\/emoji>/gm;
            // const myRex = /<img.*?src=[^\>]+>/gm;
            const myArray = data.message.match(/<img[^>]*src="([^"]+)"[^>]*>/gm);
            if(myArray.length === 1){
                messageType = 'EMOJI_1X';
            }else if(myArray.length === 2){
                messageType = 'EMOJI_2X';
            }else if(myArray.length === 3){
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
            messageText = data.message;
        }else if(messageType === 'MEDIA_IMAGE'){
            messageText = `<img class="media-photo" src="${data.message[0].content}">`;
            filePath = data.message[0].content;
        }else if(messageType === 'STICKER'){
            messageText = `<img class="media-sticker" src="${data.message[0].content}"/>`;
            filePath = data.message[0].content;
        }else if(messageType === 'GIF'){
            messageText = data.message[0].content;
        }else{
            // let message = data.message.replace('<emoji>', '').replace('</emoji>', '');
            // messageText += `<img src="/emoji/${message}" alt="🙄" class="emoji" loading="lazy"/>`;
            messageText += data.message;
            // data.message.map(messageItem => {
            //     if(messageItem.contentType === 'text'){
            //         messageText += messageItem.content;
            //     }else if(messageItem.contentType === 'image'){
            //         messageText += `<img src="/${messageItem.content}" alt="🙄" class="emoji" loading="lazy"/>`;
            //     }
            // });
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
    },
    generateMessageBubbleFromServer: (data) => {
        if(!data || !data.message) return;
        if(!userInfo){
            userInfo = JSON.parse(localStorage.getItem('userInfo'));
        }

        let isOut = data.userId === userInfo.id ? true : false;
        let isContentImage = [MESSAGE_TYPE.MESSAGE_AND_EMOJI, MESSAGE_TYPE.EMOJI, MESSAGE_TYPE.MEDIA_IMAGE].includes(data.messageType) ? true : false;
        let isContentText = [MESSAGE_TYPE.MESSAGE_AND_EMOJI, MESSAGE_TYPE.MESSAGE].includes(data.messageType) ? true : false;
        let messageText = '';
        let messageType = data.messageType === 'image' ? 'MEDIA_IMAGE' : '';
        let filePath = '';
        if(isContentText && isContentImage){
            messageType = 'MESSAGE_AND_EMOJI';
        }else if(isContentText){
            messageType = 'MESSAGE';
        }else if(isContentImage){
            // const myRex = /<emoji\s*.*>\s*.*<\/emoji>/gm;
            // const myRex = /<img[^>]*src="([^"]+)"[^>]*>/gm;
            // const myArray = data.message.match(/<img [^>]*src="[^"]*"[^>]*>/gm);
            const myArray = data.message.match(/<img[^>]*src="([^"]+)"[^>]*>/gm);
            if(myArray.length === 1){
                messageType = 'EMOJI_1X';
            }else if(myArray.length === 2){
                messageType = 'EMOJI_2X';
            }else if(myArray.length === 3){
                messageType = 'EMOJI_3X';
            }else{
                messageType = 'MESSAGE_AND_EMOJI';
            }
        }else if(data.messageType === 'sticker'){
            messageType = 'STICKER';
        }else if(data.messageType === 'gif'){
            messageType = 'GIF';
        }

        if(messageType === 'MESSAGE'){
            messageText = data.message;
        }else if(messageType === 'MEDIA_IMAGE'){
            messageText = `<img class="media-photo" src="${data.message[0].content}">`;
            filePath = data.message[0].content;
        }else if(messageType === 'STICKER'){
            messageText = `<img class="media-sticker" src="${data.message[0].content}"/>`;
            filePath = data.message[0].content;
        }else if(messageType === 'GIF'){
            messageText = data.message[0].content;
        }else{
            messageText += data.message;
            // let message = data.message.replace('<emoji>', '').replace('</emoji>', '');
            // messageText += `<img src="/emoji/${message}" alt="🙄" class="emoji" loading="lazy"/>`;
            // data.message.map(messageItem => {
            //     if(messageItem.contentType === 'text'){
            //         messageText += messageItem.content;
            //     }else if(messageItem.contentType === 'image'){
            //         messageText += `<img src="/${messageItem.content}" alt="🙄" class="emoji" loading="lazy"/>`;
            //     }
            // });
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