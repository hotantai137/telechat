import logo from '../../logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes } from 'react-router-dom';
import { Route } from 'react-router';
import React from 'react';
import Login from '../pages/login';
import SignUp from '../pages/signup';
import routes from '../pages/routes';
import bgminimum from './../assets/image/bg-minimum.png';
import bgAnimals from './../assets/image/bg-animals.png';

function App() {
  React.useEffect(() => {
    const renderBackground = () => {
      var imgColor = document.getElementById('bg-image');
      var imgAnimal = document.getElementById('bg-parent-image');

      var canvasColor = document.getElementById('color-canvas');
      // var canvasParent = document.getElementById('parent-canvas');
      var ctxCanvasColor = canvasColor.getContext("2d");
      ctxCanvasColor.drawImage(imgColor, 0, 0);
      // var ctxCanvasParent = canvasParent.getContext("2d");
      // ctxCanvasParent.drawImage(imgAnimal, 0, 0);
    }

    function handleResize() {
      renderBackground();
      console.log('resized to: ', window.innerWidth, 'x', window.innerHeight)
    }

    window.addEventListener('resize', handleResize);
    window.addEventListener('load', handleResize);
  }, [])
  console.log(routes);
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
