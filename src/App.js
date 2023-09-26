import React, { useState } from 'react';
import './App.css';
import { Login } from './Login';
import { Register } from './Register';
import Navbar from './Navbar';

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
      <div className="App">
        {
          currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} />
        }
      </div>
    </div>

  );
}

export default App;
