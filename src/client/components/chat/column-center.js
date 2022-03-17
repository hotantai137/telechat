import {React, useEffect, useRef, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import { Cookies } from 'react-cookie';
import SideBarHeaderMain from './sidebar-header-main';
import Bubbles from './bubbles';
import ChatInput from './chat-input';
import bgImage from './../../assets/image/bg-minimum.png';
import bgAnimals from './../../assets/image/bg-animals.png';
import bgNight from './../../assets/image/bg-night.png';

function ColumnCenter(props){
    // const [selectedChatId, setSelectedChatId] = useState('');
    // useEffect(() => {
    //     setSelectedChatId(props.selectedChatId);
    // }, [props.selectedChatId]);

 return(
    <div id='column-center' className='tabs-tab main-column'>
        <div className='chats-container tabs-container' data-animation="navigation">
            <div className='chat tabs-tab active type-chat'>
                <div className='chat-background'>
                    <div className='chat-background-item is-visible' data-type='image'>
                        <img src={bgNight} id="bg-image" hidden></img>
                        <img src={bgAnimals} id="bg-parent-image" hidden></img>                        
                        {/* <canvas id='color-canvas' width="50" height="50" data-colors="#dbddbb,#6ba587,#d5d88d,#88b884" className="chat-background-item-canvas chat-background-item-color-canvas"></canvas>
                        <canvas id='parent-canvas' width="946" height="937" className="chat-background-item-canvas chat-background-item-pattern-canvas" style={{opacity: ":0.5"}}></canvas> */}
                        <canvas id='color-canvas' width="50" height="50" data-colors="#fec496,#dd6cb9,#962fbf,#4f5bd5" 
                            className="chat-background-item-canvas chat-background-item-color-canvas" 
                            style={{opacity: "0.5", WebkitMaskImage: `url(${bgAnimals})`}} 
                            // style="--opacity-max:0.5;/* -webkit-mask-image: url(&quot;blob:https://web.telegram.org/244ea92f-0fa6-44a2-a6b5-0e20d384abed&quot;); */"
                        >
                        </canvas>
                    </div>
                </div>
                {
                    props.selectedChatId && (
                        <>
                        <SideBarHeaderMain 
                        removeSelectedChat={props.removeSelectedChat}
                        selectedChatId={props.selectedChatId}
                        socket={props.socket}
                        />
                        <Bubbles socket={props.socket}/>
                        <ChatInput socket={props.socket}
                        selectedChatId={props.selectedChatId}/>
                        </>
                    )
                }
            </div>
        </div>
    </div>
 )
}

export default ColumnCenter;