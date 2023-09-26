import React, { useState } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase-config";

export const Register = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    //const [name, setName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
    }

    const register = async () => {
        try {
            const user = await createUserWithEmailAndPassword(
                auth,
                email,
                pass
            );
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        
        <div className="App">
            <div className="auth-form-container">
                <h2>Register</h2>
                <form className="register-form" onSubmit={handleSubmit}>
                    <label htmlFor="email">Email</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="you@email.com" id="email" name="email"/>
                    <label htmlFor="password">Password</label>
                    <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="**********" id="password" name="password"/>
            
                    <button onClick={register} type="submit">Register</button>
                </form>
            <br></br>
            <a href="/login" className="white-text">Already have an account? Log in here.</a>
            </div>
        </div>
    )
}