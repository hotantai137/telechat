import moment from "moment";

const MESSAGE_TYPE = {
    MESSAGE: 0,
    MESSAGE_AND_EMOJI: 1,
    EMOJI: 2,
    EMOJI_1X: 'EMOJI_1X',
    EMOJI_2X: 'EMOJI_2X',
    EMOJI_3X: 'EMOJI_3X',
    MEDIA_IMAGE: 3,
    MEDIA_VIDEO: 'MEDIA_VIDEO',
    MEDIA_ALBUM: 'MEDIA_ALBUM',
    STICKER: 4,
    GIF: 5
}
const userInfo = JSON.parse(localStorage.getItem('userInfo'));
export default{
    generateMessageBubble: (data) => {
        if(!data) return;
        if(!userInfo){
            userInfo = JSON.parse(localStorage.getItem('userInfo'));
        }

        let emojiCount = 0;
        let isOut = data.userId === userInfo.id ? true : false;
        // let isContentImage = data.type === MESSAGE.MESSAGE_TYPE.MESSAGE && data.message.some(e => e.contentType === 'image') ? true : false;
        // let isContentText = data.type === MESSAGE.MESSAGE_TYPE.MESSAGE && data.message.some(e => e.contentType === 'text') ? true : false;
        let isContentEmoji = [MESSAGE_TYPE.MESSAGE_AND_EMOJI, MESSAGE_TYPE.EMOJI].includes(data.type) ? true : false;
        let isContentText = [MESSAGE_TYPE.MESSAGE_AND_EMOJI, MESSAGE_TYPE.MESSAGE].includes(data.type) ? true : false;
        let messageText = '';
        let messageType = data.type === MESSAGE_TYPE.MEDIA_IMAGE ? 'MEDIA_IMAGE' : '';
        let filePath = '';
        if(isContentText && isContentEmoji){
            messageType = 'MESSAGE_AND_EMOJI';
        }else if(isContentText){
            messageType = 'MESSAGE';
        }else if(isContentEmoji){
            // const myRex = /<emoji\s*.*>\s*.*<\/emoji>/gm;
            // const myRex = /<img.*?src=[^\>]+>/gm;
            const myArray = data.message.match(/<img[^>]*src="([^"]+)"[^>]*>/gm);
            emojiCount = myArray.length;
            messageType = 'EMOJI_1X';
        }else if(data.type == MESSAGE_TYPE.STICKER){
            messageType = 'STICKER';
        }else if(data.type === MESSAGE_TYPE.GIF){
            messageType = 'GIF';
        }

        if(messageType === 'MESSAGE'){
            messageText = data.message;
        }else if(messageType === 'MEDIA_IMAGE'){
            const arrImg = data.urls.split(';');
            arrImg.forEach(imgUrl => {
                if(imgUrl){
                    messageText += `<img class="media-photo" src="${imgUrl}">`;
                }
            });
            // messageText = `<img class="media-photo" src="${data.message[0].content}">`;
            // filePath = data.message[0].content;
        }else if(messageType === 'STICKER'){
            messageText = `<img class="media-sticker" src="${data.message}"/>`;
        }else if(messageType === 'GIF'){
            messageText = data.message;
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
            isHideName: false,
            emojiCount: emojiCount
        };

        return bubble;
    },
    generateMessageBubbleFromServer: (data) => {
        if(!data) return;
        if(!userInfo){
            userInfo = JSON.parse(localStorage.getItem('userInfo'));
        }

        let emojiCount = 0;
        let isOut = data.userId === userInfo.id ? true : false;
        let isContentEmoji = [MESSAGE_TYPE.MESSAGE_AND_EMOJI, MESSAGE_TYPE.EMOJI].includes(data.messageType) ? true : false;
        let isContentText = [MESSAGE_TYPE.MESSAGE_AND_EMOJI, MESSAGE_TYPE.MESSAGE].includes(data.messageType) ? true : false;
        let messageText = '';
        let messageType = data.messageType === MESSAGE_TYPE.MEDIA_IMAGE ? 'MEDIA_IMAGE' : '';
        let filePath = '';
        if(isContentText && isContentEmoji){
            messageType = 'MESSAGE_AND_EMOJI';
        }else if(isContentText){
            messageType = 'MESSAGE';
        }else if(isContentEmoji){
            // const myRex = /<emoji\s*.*>\s*.*<\/emoji>/gm;
            // const myRex = /<img[^>]*src="([^"]+)"[^>]*>/gm;
            // const myArray = data.message.match(/<img [^>]*src="[^"]*"[^>]*>/gm);
            const myArray = data.message.match(/<img[^>]*src="([^"]+)"[^>]*>/gm);
            emojiCount = myArray.length;
            messageType = 'EMOJI_1X';
        }else if(data.messageType == MESSAGE_TYPE.STICKER){
            messageType = 'STICKER';
        }else if(data.messageType === MESSAGE_TYPE.GIF){
            messageType = 'GIF';
        }

        if(messageType === 'MESSAGE'){
            messageText = data.message;
        }else if(messageType === 'MEDIA_IMAGE'){
            data.filePath.foreach(imgUrl => {
                if(imgUrl){
                    messageText += `<img class="media-photo" src="${imgUrl}">`;
                }
            });
            // messageText = `<img class="media-photo" src="${data.message[0].content}">`;
            // filePath = data.message[0].content;
        }else if(messageType === 'STICKER'){
            messageText = `<img class="media-sticker" src="${data.message}"/>`;
        }else if(messageType === 'GIF'){
            messageText = data.message;
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
            isHideName: false,
            emojiCount: emojiCount
        };

        return bubble;
    }
}