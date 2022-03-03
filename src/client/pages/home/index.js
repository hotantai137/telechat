import {React, Component, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import { Cookies } from 'react-cookie';
import './index.scss';
import ChatList from '../../components/chat/chat-list';
import SideBarHeaderMain from '../../components/chat/sidebar-header-main';
import Bubbles from '../../components/chat/bubbles';
import ChatInput from '../../components/chat/chat-input';
import Login from '../login';
import auth from '../../../api/auth';
 
function Home(){
    const navigate = useNavigate();
    const cookies = new Cookies();

    useEffect(() => {
        let userInfo = JSON.parse(localStorage.getItem('userInfo'));
        let userToken = cookies.get('user-token');
        if(!userToken){
            navigate("/login");
            return <Login/>;
        }

        if(!userInfo){
            auth.checkToken(userToken).then(data => 
                {
                    if(data.user){
                        localStorage.setItem('userInfo', JSON.stringify(data.user));
                    }else{
                        navigate("/login");
                        return <Login/>;
                    }     
                }
            )           
        }
    }, []);
 return(
    <div className='whole page-chats' id='page-chats'>
        <div id='main-columns' className='tabs-container'>
            <div id='column-left' className='tabs-tab chatlist-container sidebar sidebar-left main-column'>
                <div className='sidebar-slider tabs-container' data-animation='navigation'>
                    <div className='tabs-tab sidebar-slider-item item-main active'>
                        <div className='sidebar-header'>
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
                        <div className='sidebar-content transition zoom-fade' data-animation="zoom-fade">
                            <div className='transition-item active' id='chatlist-container'>
                                <div className='connection-status'></div>
                                <div className='connection-status-bottom'>
                                    <div className='folders-tabs-scrollable menu-horizontal-scrollable hide'></div>
                                    <div className='tabs-container' id='folders-container' data-animation="tabs">
                                        <div className='scrollable scrollable-y tabs-tab chatlist-parts active' data-filter-id="0">
                                            <ChatList />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id='column-center' className='tabs-tab main-column'>
                <div className='chats-container tabs-container' data-animation="navigation">
                    <div className='chat tabs-tab active type-chat'>
                        <div className='chat-background'>
                            <div className='chat-background-item is-visible' data-type='image'></div>
                        </div>
                        <SideBarHeaderMain/>
                        <Bubbles/>
                        <ChatInput/>
                    </div>
                </div>
            </div>
            {/* <div id='column-right' className='tabs-tab sidebar sidebar-right main-column'></div> */}
        </div>
    </div>
 )
}

export default Home;