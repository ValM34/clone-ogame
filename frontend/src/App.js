import Login from './pages/Login';
import Connected from './pages/Connected';
import Researchs from './pages/Researchs';
import LeftColumn from './layouts/LeftColumn';
import Header from './layouts/Header';
import { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import React from 'react';

function App() {

  // A mettre en place
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {

    let userData = JSON.parse(localStorage.getItem("userData"))
    if (isLoggedIn === false) {
      fetch('http://localhost:3001/users', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': userData[0].token
        }
      })
        .then((user) => user.json())
        .then((user) => {
          if (user.id) {
            setIsLoggedIn(true)
          }
        })
    }

  }, [isLoggedIn])

  return (
    <div className="App">
      <BrowserRouter>
        {isLoggedIn ? <Header /> : ""}
        <div className="main">
          {isLoggedIn ? <LeftColumn /> : ""}
          <Routes>
            <Route path="/" element={isLoggedIn ? <Connected /> : <Login />} />
            <Route path="/ressources" element={isLoggedIn ? <Connected /> : <Login />} />
            <Route path="/installations" element={isLoggedIn ? <Connected /> : <Login />} />
            <Route path="/recherches" element={isLoggedIn ? <Researchs /> : <Login />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
