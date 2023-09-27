import React, { useEffect, useState } from 'react';
import './App.css';
import { Login } from './Login';
import { Register } from './Register';
import Home from './Home';
import Profile from './Profile';
import Navbar from './Navbar';
import Error from './Error';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { checkUserAuthentication } from './Auth';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check user authentication status
    checkUserAuthentication()
      .then((currentUser) => {
        setUser(currentUser); // Set the user state based on authentication status
      })
      .catch((error) => {
        console.error("Error checking authentication:", error);
      });
  }, []);

  // Initialize isAuthenticated state based on the initial user state
  const [isAuthenticated, setIsAuthenticated] = useState(!!user);

  return (
    <div>
      <Router>
        <div className="header">
          <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/login"
            element={<Login setIsAuthenticated={setIsAuthenticated} />}
          />
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
