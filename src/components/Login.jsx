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
                <a href="https://us-central1-playpal-63bee.cloudfunctions.net/playpalApi/auth/steam"><img src={require('../assets/sits.png')} /></a>
            </div>
        </div>
    )
}
