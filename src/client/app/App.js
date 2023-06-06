import logo from '../../logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes } from 'react-router-dom';
import { Route } from 'react-router';
import React, {useEffect} from 'react';
import Login from '../pages/login';
import SignUp from '../pages/signup';
import routes from '../pages/routes';
import bgminimum from './../assets/image/bg-minimum.png';
import bgAnimals from './../assets/image/bg-animals.png';

function App() {
  console.log(routes);
  return (
    <>
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
    </>
  );
}

export default App;
