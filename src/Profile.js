import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase-config';
import './Profile.css';
import { db } from './firebase-config'
import { collection, doc, getDocs } from 'firebase/firestore';

function Profile() {
  const [user, setUser] = useState('');
  const [games, setGames] = useState([]);
  const gamesCollectionRef = collection(db, "owned_games")
    /* this grabs the logged in user */
    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    });

  //grabbing data
  useEffect(() => {
    const getGames = async () => {
      const data = await getDocs(gamesCollectionRef);
      setGames(data.docs.map((doc) => ({...doc.data(), id: doc.id }) ));
    }

    getGames();
  }, [])

  return (
    <div>
      <div className="header">
        Welcome {user?.email}!
      </div>

      <div className="row">
        <div className="card">
          <div className='column'>
            <h2>My Games</h2>
            {games.map((game) => {
              return (
              <div>
                {" "}
                <ul>
                  <li>{game.owned_titles}</li>
                </ul>
              </div>)
            })}

          </div>
          <div className='column'>
          <h2>My Friends</h2>
          </div>
          <div className='column'>
            <h2>Profile</h2>
            {games.map((game) => {
              return (
              <div>
                {" "}
                <ul>
                  <li>SteamID: {game.steamid}</li>
                </ul>
              </div>)
            })}
          </div>
        </div>

      </div>
    </div>
  )
}

export default Profile
