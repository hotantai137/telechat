import {React, useEffect, useRef, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import { Cookies } from 'react-cookie';
import SideBarHeaderMain from './sidebar-header-main';
import Bubbles from './bubbles';
import ChatInput from './chat-input';
import MenuContext from './menu-context';
import bgImage from './../../assets/image/bg-minimum.png';
import bgAnimals from './../../assets/image/bg-animals.png';
import bgNight from './../../assets/image/bg-night.png';

function ColumnCenter(props){
    // const [selectedChatId, setSelectedChatId] = useState('');
    // useEffect(() => {
    //     setSelectedChatId(props.selectedChatId);
    // }, [props.selectedChatId]);

    const renderBackground = () => {
        var imgColor = document.getElementById('bg-image');
        var imgAnimal = document.getElementById('bg-parent-image');
  
        var canvasColor = document.getElementById('color-canvas');
        // var canvasParent = document.getElementById('parent-canvas');
        if(canvasColor){
          var ctxCanvasColor = canvasColor.getContext("2d");
          ctxCanvasColor.drawImage(imgColor, 0, 0);
        }      
        // var ctxCanvasParent = canvasParent.getContext("2d");
        // ctxCanvasParent.drawImage(imgAnimal, 0, 0);
      }

    useEffect(() => {
        renderBackground();
    
        // function handleResize() {
        //   renderBackground();
        //   console.log('resized to: ', window.innerWidth, 'x', window.innerHeight)
        // }
    
        // handleResize();
        window.addEventListener('load', renderBackground);
        window.addEventListener('resize', renderBackground);
      }, []);

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
                        hubConnection={props.hubConnection}
                        />
                        <Bubbles hubConnection={props.hubConnection}
                        selectedChatId={props.selectedChatId}/>
                        <ChatInput hubConnection={props.hubConnection}
                        selectedChatId={props.selectedChatId}/>
                        <MenuContext/>
                        </>
                    )
                }
            </div>
        </div>
    </div>
 )
}

export default ColumnCenter;