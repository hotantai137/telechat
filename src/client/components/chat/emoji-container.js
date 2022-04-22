import React, { useEffect, useState } from "react";
import CONSTANTS from '../../../common/constants.json';

function EmojiContainer(){
    function selectEmoji(emojiName){
        let input = document.getElementById('input-message');
        let imgEmoji = document.createElement('img');
        imgEmoji.src = '/emoji/' + emojiName;
        imgEmoji.classList.add('emoji');
        if(input){
            input.appendChild(imgEmoji);
        }                
    }

    return <>
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
                                        <img src="/emoji/1f692.png" alt="🙄" className="emoji" loading="lazy"/>
                                            {/* <img src={emojis['1f692.png']} alt="🙄" className="emoji" loading="lazy"/>
                                            <img src={require('../../assets/image/emoji/1f692.png')} alt="🙄" className="emoji" loading="lazy"/> */}
                                            <span className="emoji-placeholder"></span>
                                        </span>
                                        <span className="super-emoji">
                                            <img src="/emoji/1f692.png" alt="😉" className="emoji" loading="lazy"/>
                                            <span className="emoji-placeholder"></span>
                                        </span>
                                        <span className="super-emoji">
                                            <img src="/emoji/1f692.png" alt="😏" className="emoji"/>
                                        </span>
                                        <span className="super-emoji">
                                            <img src="/emoji/1f970.png" alt="🇯🇵" className="emoji" loading="lazy"/>
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
                                                return (<span className="super-emoji" onClick={()=>{selectEmoji(emojiName)}} key={emojiName}>
                                                    <img src={"/emoji/" + emojiName } alt="🙄" className="emoji" loading="lazy"/>
                                                    <span className="emoji-placeholder"></span>
                                                </span>)
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
                                                return <span className="super-emoji" onClick={()=>{selectEmoji(emojiName)}} key={emojiName}>
                                                    <img src={"/emoji/" + emojiName } alt="🙄" className="emoji" loading="lazy"/>
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
                                                return <span className="super-emoji" onClick={()=>{selectEmoji(emojiName)}} key={emojiName}>
                                                    <img src={"/emoji/" + emojiName } alt="🙄" className="emoji" loading="lazy"/>
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
                                                return <span className="super-emoji" onClick={()=>{selectEmoji(emojiName)}} key={emojiName}>
                                                    <img src={"/emoji/" + emojiName } alt="🙄" className="emoji" loading="lazy"/>
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
                                                return <span className="super-emoji" onClick={()=>{selectEmoji(emojiName)}} key={emojiName}>
                                                    <img src={"/emoji/" + emojiName } alt="🙄" className="emoji" loading="lazy"/>
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
                                                return <span className="super-emoji" onClick={()=>{selectEmoji(emojiName)}} key={emojiName}>
                                                    <img src={"/emoji/" + emojiName } alt="🙄" className="emoji" loading="lazy"/>
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
                                                return <span className="super-emoji" onClick={()=>{selectEmoji(emojiName)}} key={emojiName}>
                                                    <img src={"/emoji/" + emojiName } alt="🙄" className="emoji" loading="lazy"/>
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
    </>
}

export default EmojiContainer;