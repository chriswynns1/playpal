import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase-config";
import './App.css';

export const Login = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const navigate = useNavigate(); // Create a navigate function

    const login = async () => {
        try {
            const user = await signInWithEmailAndPassword(
                auth, email, pass
            );
            console.log("User logged in successfully");
            navigate('/profile'); // Redirect to the profile page
        }
        catch (error) {
            console.log(error.message);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        login(); // Call the login function when the form is submitted
    }

    return (
        <div className="App">
            <div className="auth-form-container">
                <h2>Login</h2>
                <form className="login-form" onSubmit={handleSubmit}>
                    <label htmlFor="email">Email</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="you@email.com" id="email" name="email"/>

                    <label htmlFor="password">Password</label>
                    <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="**********" id="password" name="password"/>
    
                    <button type="submit">Log in</button>
                </form>
                <br></br>
                <a href="/register" className="white-text">Don't have an account? Register here.</a>
            </div>
        </div>
    )
}
