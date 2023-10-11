import React, { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase-config";
import firebase from "firebase/app";
import "firebase/firestore";
import axios from 'axios';

function FriendsList({ steamId }) {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snap = await getDoc(doc(db, "friends", steamId));
        if (snap.exists()) {
          const friendsData = snap.data();
          setFriends(friendsData.friends);
        } else {
          console.log('No document found');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    fetchData();
  }, [steamId]);

  return (
    <>
    <h1 className="white-text text-2xl -mt-10 -ml-10">Friends</h1>
      <ul className="flex flex-col -ml-2 max-w-xs backdrop-blur-sm bg-white/20 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 md:w-[200px] lg:w-[400px] text-white overflow-y-auto h-[400px]">
        {friends.map((friend) => (
          <li
            key={friend.steamid}
            className="w-full px-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600 text-start flex items-center"
          >
            <img src={friend.avatarMedium} alt={friend.personaname} className="text-justify rounded-full w-12"/>
            <span className="text-center ml-4">{friend.personaname}</span>
          </li>
        ))}
      </ul>
    </>
  );
}

export default FriendsList;
