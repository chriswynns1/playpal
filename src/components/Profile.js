// Profile.js
import { useEffect, useState } from 'react';
import React from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import '../App.css'
import {db} from '../firebase-config';
import {doc, getDoc} from 'firebase/firestore';
import ProfileCard from './ProfileCard';
import FriendCard from './FriendCard';
import GamesCard from './GamesCard';
import TestCard from './TopGames';
import TopGames from './TopGames';
import AllGames from './AllGames';


const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  //const [status, setStatus] = useState(null);

  // set user auth state
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);



  // grab data from firestore with doc name matching uid
  useEffect(() => {
    const fetchData = async () => {
      try {
        const snap = await getDoc(doc(db, 'users', user.uid));
        if (snap.exists()) {
          const userData = snap.data();
          setUserData(userData);
        } else {
          console.log('No such document');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); // Set loading to false regardless of success or failure
      }
    };

    // Fetch data only if user is authenticated
    if (user) {
      fetchData();
    }
  }, [user]);

  // ---------------------------------------------------------

  if (!user) {
    return <div>Please sign in to access the profile.</div>;
  }

  if (loading) {
    return <p>Loading user data...</p>;
  }

  return (
      <div className='min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'>
        <div className='pt-10'>
            {userData ? (
              <div className=' grid grid-cols-1 md:grid-cols-5 gap-6 md:mx-40 lg:mx-70 text-black'>
                
                {/* ---  PROFILE CARD --- */}
                <div className='bg-white rounded-lg col-span-2 shadow'>
                  
                    <img src={userData.avatarLarge} />
                    <p className='pt-2 text-2xl text-center font-bold shadow '>{userData.username}</p>
                  </div>

                {/* --- TOP GAMES CARD --- */}
                <div className='bg-white rounded-lg col-span-3 row-span-2 shadow '>
                <TopGames />
                </div>

                {/* --- FRIENDS CARD --- */} 
                <div className='bg-white rounded-lg col-span-2 shadow '>
                  <FriendCard />
                </div>
                
                {/* --- ALL GAMES CARD --- */}
                <div className='bg-white rounded-lg col-span-full shadow '>
                  <AllGames />
                </div>
                
              </div>
            ) : (
              <p>No user data available.</p>
            )}
        </div>
      </div>
  );
};

export default Profile;