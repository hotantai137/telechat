import React, {useState} from 'react';
import './index.css';
import {Route, useNavigate} from 'react-router-dom';
import Home from '../home';
import avatar from '../../assets/image/taiht.jpg';
import userService from '../../../api/services/user.js';
import { useCookies, Cookies } from 'react-cookie';

function Login() {
    const navigate = useNavigate();
    const cookies = new Cookies();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function onLogin(){
      
    //   const res = await userService.signUp(email, password);
    //   setCookie('user-token', email, { path: '/' });
    }
    // function onClickSignUp(){
    //     this.props.history.push('/');
    // }

    // render() {
    //     return (
    //       <div className="App">
    //         <div className="container">
    //             <button id="b1" onClick ={this.try}>Click me</button>
    //             <Route path="/hello" component={Hello}/>
    //         </div>
    //       </div>
    //     );
    //   }

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