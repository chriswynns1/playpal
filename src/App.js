import React, { useState } from 'react';
import './App.css';
import { Login } from './Login';
import { Register } from './Register';
import Home  from './Home';
import Profile  from './Profile';
import Navbar from './Navbar';
import Error from './Error';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const [currentForm, setCurrentForm] = useState('login');

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  return (
    <div>
      <div className="header">
        <Navbar />
      </div>
      <>
        <Router>
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/profile" element={<Profile />}/>
            <Route path="/register" element={<Register />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="*" element={<Error />} />
          </Routes>
        </Router>
      </>

      {/*<div className="App">
        {
          currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} />
        }
      </div> */}

    </div>

  );
}

export default App;
