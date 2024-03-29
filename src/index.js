import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './client/app/App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  // <React.StrictMode></React.StrictMode>
  <React.Fragment>    
    <React.Suspense fallback={<div>Loading... </div>}>
      <App />
    </React.Suspense>
  </React.Fragment>,
  document.getElementsByClassName('animation-level-2')[0]
  // document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
