import logo from '../../logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes } from 'react-router-dom';
import { Route } from 'react-router';
import React from 'react';
import Login from '../pages/login';
import SignUp from '../pages/signup';
import routes from '../pages/routes';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
            {
                routes.map(route => {
                    const Component = route.component;
                    return <Route
                        key={route.path}
                        path={route.path}
                        element={<Component />}
                    />
                })
            }
        </Routes>
      </Router>      
    </div>
  );
}

export default App;
