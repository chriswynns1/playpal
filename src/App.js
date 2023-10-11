import React, { useEffect, useState } from 'react';
import './App.css';
import { Login } from './components/Login';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Error from './components/Error';
import RegSuccess from './components/RegSuccess'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { checkUserAuthentication } from './components/Auth';
import { AuthProvider } from './components/AuthenticationContext';
import Redirect from './components/Redirect';
import Dashboard from './components/Dashboard';
import PlayWithFriends from './components/PlayWithFriends';
import Discover from './components/Discover';


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
      <AuthProvider>
      <Router>
        <div className="header">
          <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={<Login setIsAuthenticated={setIsAuthenticated} />}
          />
          <Route path="/regsuccess" element={<RegSuccess />} />
          <Route path="/redirect" element={<Redirect />} />
          <Route path="*" element={<Error />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/newparty" element={<PlayWithFriends />} />

        </Routes>
      </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
