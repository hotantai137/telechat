import React from 'react';
import './index.css';
import {Route} from 'react-router-dom';
import Home from '../home';
import avatar from '../../assets/image/taiht.jpg';
import { useCookies } from 'react-cookie';

function showUsers() {
    fetch('http://localhost:3001/users')
    .then(res => res.json())
    .then(data => console.log(data));
}

async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'no-cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    // body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
//   console.log(response);
  return response.json(); // parses JSON response into native JavaScript objects
}




function SignUp() {    
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    function onSignUp(email){
        setCookie('user', email, { path: '/' });
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
                    <input type="text" id="fullname" className="signup-input" placeholder="Eg: Tấn Tài"/>
                    <label htmlFor="email" className="signup-label">Email</label>
                    <input type="text" id="email" className="signup-input" placeholder="Eg: taidepzai@gmail.com"/>
                    <label htmlFor="password" className="signup-label">Password</label>
                    <input type="password" id="password" className="signup-input" placeholder="Password"/>
                    <button onClick={setCookie('taiht')} className="signup-submit" >Sign up</button>
                </form>
                <button onClick={onSignUp('taiht')} className="signup-submit" >Sign up</button>
                <p className="signup-already">
                    <span>Already have an account ?</span>
                    <a href="google.com" className="signup-login-link">Login</a>
                </p>
        </div>
    )
}
export default SignUp;