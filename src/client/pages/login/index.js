import React from 'react';
import './index.css';
import {Route} from 'react-router-dom';
import Home from '../home';

function Login() {
    function onClickSignUp(){
        this.props.history.push('/');
    }

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

    return( <div className="signup">
                <h1 className="signup-heading">Sign up</h1>
                <button className="signup-social">
                    <i className="fa fa-google signup-social-icon"></i>
                    <span className="signup-social-text">Sign up with Google</span>
                </button>
                <div className="signup-or"><span>Or</span></div>
                <form className="signup-form" autoComplete="off">
                    <label htmlFor="fullname" className="signup-label">Full name</label>
                    <input type="text" id="fullname" className="signup-input" placeholder="Eg: Tấn Tài"/>
                    <label htmlFor="email" className="signup-label">Email</label>
                    <input type="text" id="email" className="signup-input" placeholder="Eg: taidepzai@gmail.com"/>
                    <button className="signup-submit" onClick={onClickSignUp}>Sign up</button>
                </form>
                <p className="signup-already">
                    <span>Already have an account ?</span>
                    <a href="google.com" className="signup-login-link">Login</a>
                </p>
                <Route path="/" component={Home}/>
            </div>
    )
}
export default Login;