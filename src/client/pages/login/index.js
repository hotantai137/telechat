import React, {useState} from 'react';
import './index.css';
import {Route, useNavigate} from 'react-router-dom';
import authService from '../../../api/auth';
import { useCookies, Cookies } from 'react-cookie';

function Login() {
    const navigate = useNavigate();
    const [cookieUser, setCookieUser, removeCookieUser] = useCookies('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function onLogin(){
        try{
            const res = await authService.login(email, password);
            if(!res.success) return;
  
            var today = new Date();   
            var tomorrow = new Date();
            tomorrow.setDate(today.getDate()+1);
            setCookieUser('user-token', res.token, {
            expires: tomorrow,
            // maxAge: 3600 // Will expire after 1hr (value is in number of sec.)
            });
            // this.props.history.push('/');
            navigate("/");
        }catch(error){
            alert(error);
        }
      }

    return( 
        <div className="login">
                <h1 className="login-heading">Login</h1>
                <button className="login-social">
                    <i className="fa fa-google login-social-icon"></i>
                    <span className="login-social-text">Login with Google</span>
                </button>
                <div className="login-or"><span>Or</span></div>
                <form className="login-form" autoComplete="off" 
                // action="../../login/0d3a91ad8bc34c02a7c1b1661bdb853b" method="post"
                >
                    <label htmlFor="email" className="login-label">Email</label>
                    <input type="text" id="email" className="login-input" value={email} onChange={event => setEmail(event.target.value)} placeholder="Eg: taidepzai@gmail.com"/>
                    <label htmlFor="password" className="login-label">Password</label>
                    <input type="password" id="password" className="login-input" value={password} onChange={event => setPassword(event.target.value)} placeholder="Password"/>
                    <button type='button' onClick={onLogin} className="login-submit" >Login</button>
                </form>
        </div>
    )
}
export default Login;