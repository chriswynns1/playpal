import React from 'react'
import './Profile.css'
import profile_icon from '../assets/User1.png'


const Profile = () => {
    return(
        <div className='upc'>
            <div className = "gradiant"></div>
            <div className="profile-down"></div>
            <img src={profile_icon} alt='' />
            <div className="profile-title">User1</div>
            <div className="profile-description">
            Co-founder of Playpal and young Developer
            </div>
            <div className="profile-button"><a href="mailto:oneofus@playpal.com"></a></div>
        </div>
    )
}

export default Profile;