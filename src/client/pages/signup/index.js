import React, { useState } from 'react';
import './index.css';
import {Route} from 'react-router-dom';
import Home from '../home';
import avatar from '../../assets/image/taiht.jpg';
import { useCookies } from 'react-cookie';
import userService from '../../../api/services/user.js';

function showUsers() {
  alert('showUsers clicked');
    fetch('http://localhost:3001/users')
    .then(res => res.json())
    .then(data => console.log(data));
}



function SignUp() {    
    // const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function onSignUp(){
      // setCookie('user', email, { path: '/' });
      userService.signUp(firstName, email, password);
      alert('onSignUp clicked');
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