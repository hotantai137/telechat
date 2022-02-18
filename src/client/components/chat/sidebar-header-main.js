import React from "react";

function SideBarHeaderMain(){
    return <div className="sidebar-header topbar is-pinned-message-shown" data-floating="0">
        <div className="chat-info-container">
            <div className="chat-info">
                <div className="person">
                    <avatar-element dialog="1" className="avatar-42 person-avatar" peer="-1583302793" data-color="">
                        <img className="avatar-photo" src="https://www.thestreet.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cq_auto:good%2Cw_1200/MTgxNjM5MTEyMzM0MjU1ODg1/binance_logo2.png"/>
                    </avatar-element>
                    <div className="content">
                        <div className="top">
                            <div className="user-title">
                                <span className="peer-title" dir="auto" data-peer-id="-1583302793" data-dialog="1">Cộng Đồng Sẽ Gầy Việt Nam</span>
                            </div>
                        </div>
                        <div className="bottom">
                            <div className="info">
                                <span>
                                    <span className="i18n">26 124 members</span>
                                    <span className="i18n">, </span>
                                    <span className="i18n">1 821 online</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default SideBarHeaderMain;