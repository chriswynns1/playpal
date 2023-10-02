import React from 'react'
import SteamSignInButton from './SteamSignInButton'
import '../App.css'

function Redirect() {
  return (
    <div className="App">
            <div className="auth-form-container">
      <h1>Sign in successful!</h1>
      <SteamSignInButton />
    </div>
    </div>
  )
}

export default Redirect
