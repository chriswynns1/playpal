import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../firebase-config';

function FriendsPlaying({ steamId }) {
  const [friends, setFriends] = useState([]);


return (
    <div class="transitioninset-0 ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 max-w-xs backdrop-blur-sm bg-white/20 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <a href="#">
        <img class="rounded-t-lg" src={require('../assets/dash-small-1.jpg')} alt="" />
    </a>
    <div class="p-3">
        <a href="#">
            <h5 class="mb-2 text-2xl tracking-tight text-white">Project Zomboid</h5>
        </a>
        <p class="font-normal text-white dark:text-gray-400">$19.99</p>
    </div>
  </div>
)
}

export default FriendsPlaying
