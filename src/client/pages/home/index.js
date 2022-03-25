import {React, useEffect, useRef, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import { Cookies } from 'react-cookie';
import './index.scss';
import Login from '../login';
import auth from '../../../api/auth';
import socketIOClient from "socket.io-client";
import ColumnCenter from '../../components/chat/column-center';
import ColumnLeft from '../../components/chat/column-left';
// import { Button } from 'semantic-ui-react';

// const SERVER_URL = process.env.HOST;
// const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;

function Home(){
    const [socket, setSocket] = useState(null);
    const [selectedChatId, setSelectedChatId] = useState('');
    const navigate = useNavigate();
    const cookies = new Cookies();

    useEffect(async () => {
        let userInfo = JSON.parse(localStorage.getItem('userInfo'));
        let userToken = cookies.get('user-token');
        if(!userToken){
            redirectLoginPage();
            return;
        } 

        if(!userInfo){
            auth.checkToken(userToken).then(data => 
                {
                    if(data.user){
                        localStorage.setItem('userInfo', JSON.stringify(data.user));
                        localStorage.setItem('contactList', JSON.stringify(data.contacts));
                        const newSocket = socketIOClient();
                        setSocket(newSocket);
                    }else{
                        redirectLoginPage();
                    }     
                }
            )           
        }else{
            const newSocket = socketIOClient();
            setSocket(newSocket);
        }
    }, []);
    
    useEffect(() => {
        // const newSocket = socketIOClient();
        // setSocket(newSocket);
        // newSocket.close();
        return () => {
            if(socket) socket.close();
        }
      }, [setSocket]);    
    

    const redirectLoginPage = () => {
        navigate("/login");
        return <Login/>;
    }

    const selectChatItem = (id) => {
        setSelectedChatId(id);
        // document.body.classList.remove('is-left-column-shown');
    }

    const removeSelectedChat = () => {
        setSelectedChatId('');
        // document.body.classList.add('is-left-column-shown');
    }

 return(
    <div className='whole page-chats' id='page-chats'>
        <div id='main-columns' className='tabs-container'>
            <ColumnLeft socket={socket} selectChatItem={selectChatItem}/>
            <ColumnCenter socket={socket} selectedChatId={selectedChatId} removeSelectedChat={removeSelectedChat}/>
            {/* <div id='column-right' className='tabs-tab sidebar sidebar-right main-column'></div> */}
        </div>
    </div>
 )
}

export default Home;