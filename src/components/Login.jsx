import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import '../App.css';
import SteamSignInButton from './SteamSignInButton';

export const Login = () => {

    const navigate = useNavigate(); // Create a navigate function

    return (
        <div className="App">
            <div className="auth-form-container">
                <h2>Login</h2>
                <a href="http://localhost:5000/auth/steam"><img src={require('../assets/sits.png')} /></a>
            </div>
        </div>
    )
}
