import React, { useState, useEffect } from "react";
import DashHead from './DashHead';
import FriendsPlaying from "./FriendsPlaying";
import LibraryCard from "./LibraryCard";
import Avatar from "./Avatar";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase-config';


function Dashboard() {
  
  const [userData, setUserData] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [gameData, setGameData] = useState([]);
  

  // making sure user is loggeed in
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const snap = await getDoc(doc(db, 'owned_games', user.uid));
        if (snap.exists()) {
          const gameData = snap.data();
          setGameData(gameData.games || []);
          console.log('before gamedata:', gameData.games);
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
      fetchGames();
    }
  }, [user]);

  useEffect(() => {
    console.log('Updated gameData:', gameData);
  }, [gameData]);

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
  console.log('bottom return gameData:', gameData);
  return (
    <>
    <div className="bg-gradient-to-r from-black to-blue-800 min-h-screen">
        <div className="lg:mx-40 mx-10">
            <h1 className="white-text text-2xl ml-4 pt-4">Game of the Week</h1>
          <div className="">
            <div className="flex flex-row justify-between animate-slideup content-center sm:mx-10 lg:mx-20 pt-2">
              <DashHead
                appid = '493520'
              />
              <Avatar 
                profilepic = {userData.avatarLarge}
                username = {userData.username}
                steamId = {userData.steamid}
              />
            </div>
          </div>
          <h1 className="white-text text-2xl ml-8 pt-4">What Your Friends are Playing</h1>
          <div className="animate-slideup content-center sm:mx-10 lg:mx-20 pt-2 flex-wrap">
            <FriendsPlaying />
          </div>
          <h1 className="white-text text-2xl ml-8 pt-4">Reccommended for You</h1>
          <div className="animate-slideup content-center sm:mx-10 lg:mx-20 pt-2 flex-wrap">
            <FriendsPlaying />
          </div>
          <h1 className="white-text text-2xl ml-8 pt-4">Library</h1>
          <div className="animate-slideup content-center sm:mx-10 lg:mx-20 pt-2 flex flex-wrap gap-8 sm:justify-start justify-center">
          {gameData?.map((game, i) => (
            <LibraryCard 
              key={i} 
              name={game.name}
              appid={game.appid}
            />
          ))}
          </div>
        </div>
    </div>
    </>
  );
}

export default Dashboard;
