import React, { useEffect, useState } from "react";
import Search from "./Search";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import {db} from '../firebase-config';
import {doc, getDoc} from 'firebase/firestore';

function PlayWithFriends({onAddFriendToParty}) {
  const [userData, setUserData] = useState(null);
  const [user, setUser] = useState(null);
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [isPartyFull, setIsPartyFull] = useState(false);
  const [partyDocumentId, setPartyDocumentId] = useState(null);
  const [partyData, setPartyData] = useState([]);

  // making sure user is logged in
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
    const fetchParty = async () => {
        try {
            const snap = await getDoc(doc(db, "parties", partyDocumentId));
            if (snap.exists()) {
                const partyData = snap.data();
                setPartyData(partyData || []);
                console.log('partydata: ', partyData);
            }
            else {
                console.log('cant find document');
            }
        } catch (error) {
            console.error('error fetching party doc: ', error);
        }
    }
    if (partyDocumentId) {
        fetchParty();
    }
}, [user]);


  const handleAddFriendToParty = (friend, documentId) => {
    console.log('Document ID:', documentId);
    setPartyDocumentId(documentId);

  };

  const handleSelectedFriendsChange = (newSelectedFriends) => {
    if (newSelectedFriends.length === 6) {
      setIsPartyFull(true);
      toast.error("❌ Party is full! Maximum 6 members allowed.");
    } else {
      setIsPartyFull(false);
    }

    setSelectedFriends(newSelectedFriends);
  };
  const handleRemoveFriendFromParty = (steamid) => {
    const updatedFriends = selectedFriends.filter(
      (friend) => friend.steamid !== steamid
    );
    setSelectedFriends(updatedFriends);
    setIsPartyFull(updatedFriends.length >= 6);
    toast.success("✔️ Friend removed from the party.");
    console.log("friends now: ", selectedFriends);
  };
  if (!user) {
    return <div>Please sign in to access the profile.</div>;
  }

  return (
    <div>
      <div className="bg-gradient-to-r from-black to-blue-800 min-h-screen">
        <div className="lg:mx-80 mx-10 flex flex-col lg:flex-row justify-between items-center relative">
          <div className="mt-40 lg:ml-10 text-center lg:text-left">
            <h1 className="text-white text-6xl">Who's playing today?</h1>
            <Search
              steamId={user.uid}
              onSelectedFriendsChange={handleSelectedFriendsChange}
              onAddFriendToParty={handleAddFriendToParty}
            />
          </div>

          <div className="lg:mr-80 p-4 mt-40 text-white text-2xl backdrop-blur-sm bg-white/20 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-grow absolute top-[60px] right-1">
            <div className="flex flex-col">
            <p>Party ID: {partyDocumentId} {partyData.partyMembers?.length || 0} / 6</p>
            {partyData.partyMembers && partyData.partyMembers.map((friend, index) => (
  <div
    key={friend.steamid}
    className={`flex items-center justify-between ${
      index > 0 ? "mt-2" : ""
    }`}
  >
    <div className="flex items-center">
      <p className="text-white text-sm ml-2">
        {partyData.personaname}
      </p>
    </div>
    {/* Add the delete button (emoji) */}
    <a
      className="cursor-pointer ml-1 "
      role="img"
      aria-label="Delete"
      onClick={() => handleRemoveFriendFromParty(friend.steamid)}
      class="inline-block rounded-full  bg-black border-white p-3 text-white hover:bg-red-600 hover:text-white focus:outline-none focus:ring active:bg-red-500"
      href="#"
    >
      <span class="sr-only"> Remove </span>

      <svg
        className="fill-white"
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 24 24"
      >
        <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z" />
      </svg>
    </a>
  </div>
))}
            </div>
          </div>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
        </div>
      </div>
    </div>
  );
}

export default PlayWithFriends;
