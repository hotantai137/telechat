import React, { useState } from "react";
import { GiphyFetch } from "@giphy/js-fetch-api";
import { useAsync } from "react-async-hook";
// import { IGif } from "@giphy/js-types";
import {
  Gif,
  Grid
} from "@giphy/react-components";

const MESSAGE_TYPE = {
    MESSAGE: 'MESSAGE',
    MESSAGE_AND_EMOJI: 'MESSAGE_AND_EMOJI',
    EMOJI_1X: 'EMOJI_1X',
    EMOJI_2X: 'EMOJI_2X',
    EMOJI_3X: 'EMOJI_3X',
    MEDIA_IMAGE: 'MEDIA_IMAGE',
    MEDIA_VIDEO: 'MEDIA_VIDEO',
    MEDIA_ALBUM: 'MEDIA_ALBUM',
    STICKER: 'STICKER',
    GIF: 'GIF'
}
function Bubble({dataBubble}){
    const giphyFetch = new GiphyFetch("sXpGFDGZs0Dv1mmNFvYaGUvYwKX0PWIh");
    const {heightGIF, setHeightGIF} = useState('200px');
    const {widthGIF, setWidthGIF} = useState('200px');
    const GifComp = () => {        
        const [gif, setGif] = useState(null);
        useAsync(async () => {
        //   const { data } = await giphyFetch.gif("fpXxIjftmkk9y");
        const { data } = await giphyFetch.gif(dataBubble.message);
          setGif(data);
          setHeightGIF(gif.images.fixed_height.height + 'px');
          setWidthGIF(gif.images.fixed_height.width + 'px');
        }, []);
        return gif && <Gif gif={gif} width={gif.images.fixed_height.width} height={gif.images.fixed_height.height} />;
    }
    const calSizeEmoji = () => {
        if(dataBubble.emojiCount <= 3){
            return 96 - 6 * (dataBubble.emojiCount - 1);
        }else if(dataBubble.emojiCount <= 6){
            return 96 - 6 * 4 - 12 * (dataBubble.emojiCount - 4);
        }else return 36;
    }
    const renderBubble = () =>{
        switch(dataBubble.messageType){
            case MESSAGE_TYPE.MESSAGE: return renderMessage();
            case MESSAGE_TYPE.MESSAGE_AND_EMOJI: return renderMessage();
            case MESSAGE_TYPE.EMOJI_1X:
            case MESSAGE_TYPE.EMOJI_2X:
            case MESSAGE_TYPE.EMOJI_3X: return renderEmoji();
            case MESSAGE_TYPE.MEDIA_IMAGE: return renderImage();
            case MESSAGE_TYPE.GIF: return renderGif();
            case MESSAGE_TYPE.MEDIA_VIDEO: return renderEmoji();
            case MESSAGE_TYPE.MEDIA_ALBUM: return renderEmoji();
            case MESSAGE_TYPE.STICKER: return renderSticker();
        }
    }
    const renderMessage = () =>{
        return (
            <div className={`bubble is-read ${dataBubble.isOut ? "is-out" : "is-in"} ${dataBubble.isHideName ? "hide-name" : ""} can-have-tail is-group-first is-group-last`} data-mid="8144224255" data-peer-id="520885308" data-timestamp="1604477469">
                    <div className="bubble-content-wrapper">
                        <div className="bubble-content">
                            <div className="message" dir="auto" >
                                <section dangerouslySetInnerHTML={{__html: dataBubble.message}}></section>
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
    const renderEmoji = () => {
        return (
            <div className={`bubble is-message-empty emoji-big is-read can-have-big-emoji just-media ${dataBubble.isOut ? "is-out" : "is-in"} ${dataBubble.isHideName ? "hide-name" : ""} `}
            style={{"--emoji-size": calSizeEmoji().toString() + "px"}} data-mid="8144224255" data-peer-id="520885308" data-timestamp="1604477469">
                    <div className="bubble-content-wrapper">
                        <div className="bubble-content" style={dataBubble.emojiCount == 1 ? {minWidth: "112px", minHeight: "112px"} : {}}>
                            <div className="message spoilers-container" dir="auto">
                                <span className="time tgico">
                                    <span className="i18n">{dataBubble.sendTime}</span>
                                    <div className="inner tgico" title="4 November 2020, 15:11:09">
                                        <span className="i18n">{dataBubble.sendTime}</span>
                                    </div>
                                </span>
                            </div>
                            <div className="attachment spoilers-container" dangerouslySetInnerHTML={{__html: dataBubble.message}} style={dataBubble.emojiCount == 1 ? {width: "112px", height: "112px"} : {}}></div>
                        </div>
                    </div>
                </div>
            )
    }
    const renderImage = () => {
        return (
            <div className={`bubble is-message-empty photo is-read ${dataBubble.isOut ? "is-out" : "is-in"} hide-name`} data-mid="8144224255" data-peer-id="520885308" data-timestamp="1604477469">
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
                            <div className="attachment media-container" style={{width: "191px", height: "340px"}}
                             dangerouslySetInnerHTML={{__html: dataBubble.message}}></div>
                        </div>
                    </div>
                </div>
            )
    }
    const renderSticker = () => {
        return (
            <div className={`bubble is-read is-message-empty sticker just-media ${dataBubble.isOut ? "is-out" : "is-in"} ${dataBubble.isHideName ? "hide-name" : ""} is-group-first is-group-last`}>
                <div className="bubble-content-wrapper">
                    <div className="bubble-content" style={{width: "200px", height: "200px"}}>
                        <div className="message" dir="auto">
                            <span className="time tgico">
                                <span className="i18n">{dataBubble.sendTime}</span>
                                <div className="inner tgico" title="20 May 2022, 12:45:12">
                                    <span className="i18n">{dataBubble.sendTime}</span>
                                </div>
                            </span>
                        </div>
                        <div className="attachment media-sticker-wrapper" data-doc-id="1592756632805186062" 
                            style={{width: "200px", height: "200px"}}
                            dangerouslySetInnerHTML={{__html: dataBubble.message}}>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    const renderGif = () => {
        return(<>
            <div className={`bubble is-read is-message-empty video ${dataBubble.isOut ? "is-out" : "is-in"} ${dataBubble.isHideName ? "hide-name" : ""} is-group-first is-group-last`}>
                <div className="bubble-content-wrapper">
                    <div className="bubble-content" style={{width: widthGIF, height: heightGIF}}>
                        <div className="message" dir="auto">
                            <span className="time tgico">
                                <span className="i18n">{dataBubble.sendTime}</span>
                                <div className="inner tgico" title="20 May 2022, 12:45:12">
                                    <span className="i18n">{dataBubble.sendTime}</span>
                                </div>
                            </span>
                        </div>
                        <div className="attachment media-container" data-doc-id="1592756632805186062" 
                            style={{width: widthGIF, height: heightGIF}}>
                            <span className="video-time">GIF</span>
                            <GifComp/>
                        </div>
                    </div>
                </div>
            </div>
            {/* <a href="https://giphy.com/gifs/fpXxIjftmkk9y" className="giphy-gif  css-16k37tz" style="width: 200px; height: 214px;">
                <div style="width: 200px; height: 214px; position: relative;">
                    <picture>
                        <source type="image/webp" srcset="https://media4.giphy.com/media/fpXxIjftmkk9y/200w.webp?cid=9f0f6425cd984b54ff35f0a11beaa0b933262df678d2cc51&amp;rid=200w.webp&amp;ct=g"/>
                            <img className="giphy-gif-img giphy-img-loaded" src="https://media4.giphy.com/media/fpXxIjftmkk9y/200w.gif?cid=9f0f6425cd984b54ff35f0a11beaa0b933262df678d2cc51&amp;rid=200w.gif&amp;ct=g" width="200" height="214" alt="Oh My God Reaction GIF" style="background: rgb(255, 102, 102);"/>
                    </picture>
                </div>
            </a> */}
        </>)
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