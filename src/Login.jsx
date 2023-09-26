import React, { useState } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase-config";
import './App.css';

export const Login = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [user, setUser] = useState('');

    /* this grabs the current user */
    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    });

    const login = async () => {
        try {
            const user = await signInWithEmailAndPassword(
                auth, email, pass
            );
            //console.log(email);
            console.log(onAuthStateChanged);
        }
        catch (error) {
            console.log(error.message);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
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
    
                    <button onClick={login} type="submit">Log in</button>
                </form>
                {/*<button className="link-btn" onClick={() => props.onFormSwitch('register')}>Don't have an account? Register here</button>*/}
                <h4>User logged in:</h4>
                {user?.email}
            </div>
        </div>
    )
}