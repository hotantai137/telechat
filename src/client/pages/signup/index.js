import React, { useState } from 'react';
import './index.css';
import {Route, useNavigate } from 'react-router-dom';
import Home from '../home';
import avatar from '../../assets/image/taiht.jpg';
import { useCookies, Cookies } from 'react-cookie';
import userService from '../../../api/services/user.js';

function showUsers() {
  alert('showUsers clicked');
    fetch('http://localhost:3001/users')
    .then(res => res.json())
    .then(data => console.log(data));
}



function SignUp() {    
    const navigate = useNavigate();
    const [cookieUser, setCookieUser, removeCookieUser] = useCookies('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function onSignUp(){
      const res = await userService.signUp(firstName, email, password); 
      var today = new Date();   
      var tomorrow = new Date();
      tomorrow.setDate(today.getDate()+1);
      setCookieUser('user-token', res.token, {
        expires: tomorrow,
        // maxAge: 3600 // Will expire after 1hr (value is in number of sec.)
      });
      // this.props.history.push('/');
      navigate("/");
    }
    
    
    // function onClickSignUp(){
    //     this.props.history.push('/');
    // }

    return( 
        <div className="signup">
                <h1 className="signup-heading">Sign up</h1>
                <button className="signup-social">
                    <i className="fa fa-google signup-social-icon"></i>
                    <span className="signup-social-text">Sign up with Google</span>
                </button>
                <div className="signup-or"><span>Or</span></div>
                <form className="signup-form" autoComplete="off" 
                // action="../../login/0d3a91ad8bc34c02a7c1b1661bdb853b" method="post"
                >
                    <label htmlFor="fullname" className="signup-label">Full name</label>
                    <input type="text" id="fullname" className="signup-input" value={firstName} onChange={event => setFirstName(event.target.value)} placeholder="Eg: Tấn Tài"/>
                    <label htmlFor="email" className="signup-label">Email</label>
                    <input type="text" id="email" className="signup-input" value={email} onChange={event => setEmail(event.target.value)} placeholder="Eg: taidepzai@gmail.com"/>
                    <label htmlFor="password" className="signup-label">Password</label>
                    <input type="password" id="password" className="signup-input" value={password} onChange={event => setPassword(event.target.value)} placeholder="Password"/>
                    {/* <button onClick={setCookie('taiht')} className="signup-submit" >Sign up</button> */}
                    <button type="button" onClick={onSignUp} className="signup-submit" >Sign up</button>
                </form>
                <p className="signup-already">
                    <span>Already have an account ?</span>
                    <a href="google.com" className="signup-login-link">Login</a>
                </p>
        </div>
    )
}
export default SignUp;