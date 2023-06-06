import {React, useState} from 'react';
import ChatList from './chat-list';

function ColumnLeft(props){
    const selectChatItem = (id) => {
        props.selectChatItem(id);
    }
 return(
    <div id='column-left' className='tabs-tab chatlist-container sidebar sidebar-left main-column'>
        <div className='sidebar-slider tabs-container' data-animation='navigation'>
            <div className='tabs-tab sidebar-slider-item item-main active'>
                <div className='sidebar-header can-have-forum'>
                    <div className="sidebar-header__btn-container">
                        <div className="animated-menu-icon"></div>
                        <div className="btn-icon btn-menu-toggle rp sidebar-tools-button is-visible">
                            <div className="c-ripple"></div>
                            {/* <div className="btn-menu bottom-right has-footer">
                                <div className="btn-menu-item rp-overflow tgico-saved rp">
                                    <div className="c-ripple"></div>
                                    <span className="i18n btn-menu-item-text">Saved Messages</span>
                                </div>
                                <div className="btn-menu-item rp-overflow tgico-archive rp">
                                    <div className="c-ripple"></div>
                                    <span className="i18n btn-menu-item-text">Archived Chats</span>
                                    <span className="archived-count badge badge-24 badge-gray">14</span>
                                </div>
                                <div className="btn-menu-item rp-overflow tgico-user rp">
                                    <div className="c-ripple"></div>
                                    <span className="i18n btn-menu-item-text">Contacts</span>
                                </div>
                                <div className="btn-menu-item rp-overflow tgico-settings rp">
                                    <div className="c-ripple"></div>
                                    <span className="i18n btn-menu-item-text">Settings</span>
                                </div>
                                <div className="btn-menu-item rp-overflow tgico-darkmode rp">
                                    <div className="c-ripple"></div>
                                    <span className="i18n btn-menu-item-text">Dark Mode</span>
                                    <label className="checkbox-field checkbox-without-caption checkbox-field-toggle">
                                        <input className="checkbox-field-input" type="checkbox"/>
                                        <div className="checkbox-toggle"></div>
                                    </label>
                                </div>
                                <div className="btn-menu-item rp-overflow tgico-animations rp">
                                    <div className="c-ripple"></div>
                                    <span className="i18n btn-menu-item-text">Animations</span>
                                    <label className="checkbox-field checkbox-without-caption checkbox-field-toggle">
                                        <input className="checkbox-field-input" type="checkbox"/>
                                            <div className="checkbox-toggle"></div>
                                    </label>
                                </div>
                                <div className="btn-menu-item rp-overflow tgico-help rp">
                                    <div className="c-ripple"></div>
                                    <span className="i18n btn-menu-item-text">Telegram Features</span>
                                </div><div className="btn-menu-item rp-overflow tgico-bug rp">
                                <div className="c-ripple"></div>
                                <span className="i18n btn-menu-item-text">Report Bug</span>
                            </div>
                            <div className="btn-menu-item rp-overflow tgico-char z rp">
                                <div className="c-ripple"></div>
                                <span className="i18n btn-menu-item-text">Switch to Z version</span>
                            </div>
                            <div className="btn-menu-item rp-overflow tgico-char w rp">
                                <div className="c-ripple"></div>
                                <span className="i18n btn-menu-item-text">Switch to Old Version</span>
                            </div>
                            </div> */}
                        </div>
                        <div className="btn-icon sidebar-back-button"></div>
                    </div>
                    <div className="input-search">
                        <input type="text" autoComplete="off" className="input-field-input i18n input-search-input" dir="auto" placeholder="Search"/>
                        <div className="input-field-border"></div>
                        <i className="far fa-search tgico tgico-search"></i>
                        {/* <i className="tgico btn-icon tgico-close"></i> */}
                    </div>
                </div>
                <div className='sidebar-content transition zoom-fade can-have-forum' data-animation="zoom-fade">
                    <div className='transition-item active' id='chatlist-container'>
                        <div className='connection-status'>
                        <button className="btn-primary bg-warning connection-status-button">
                            <span className="i18n">Updating...</span>
                            <div className="preloader-container preloader-transparent preloader-bold preloader-swing is-visible">
                                <div className="you-spin-me-round">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="preloader-circular" viewBox="27 27 54 54">
                                        <circle className="preloader-path-new" cx="54" cy="54" r="24" fill="none" strokeMiterlimit="10"></circle>
                                    </svg>
                                </div>
                            </div>
                        </button>
                        </div>
                        <div className='connection-status-bottom'>
                            <div className='folders-tabs-scrollable menu-horizontal-scrollable hide'>
                                <div className="scrollable scrollable-x">
                                    <nav className="menu-horizontal-div" id="folders-tabs">
                                        <div className="menu-horizontal-div-item rp active" data-filter-id="0">
                                            <div className="c-ripple"></div>
                                            <span>
                                                <span className="text-super">
                                                    <span className="i18n">All Chats</span>
                                                </span>
                                                <div className="badge badge-20 badge-primary badge-gray"></div><i></i>
                                            </span>
                                        </div>
                                    </nav>
                                </div>
                            </div>
                            <div className='tabs-container' id='folders-container' data-animation="tabs">
                                <div className='scrollable scrollable-y tabs-tab chatlist-parts active' data-filter-id="0">
                                    {/* <ChatList socket={props.socket}
                                        selectChatItem={selectChatItem}/> */}
                                    <ChatList hubConnection={props.hubConnection}
                                        selectChatItem={selectChatItem}/>
                                    <div className="chatlist-bottom"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="topics-slider"></div>
            </div>
        </div>
    </div>
 )
}

export default ColumnLeft;