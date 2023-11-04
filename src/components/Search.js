import { getDoc, doc, where, query, updateDoc, collection, setDoc, arrayUnion } from "firebase/firestore";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { db } from "../firebase-config";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer, toast} from 'react-toastify';


function Search({ steamId, docId, user }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [friendsData, setFriends] = useState(null);
    const [selectedFriends, setSelectedFriends] = useState([]);

    // useEffect to add user's steam id to the party automagically
    useEffect(() => {
      const addPartyLeader = async () => {
        try {
          await updateDoc(doc(db, 'parties', docId), {
            partyMembers: arrayUnion(steamId),
            personaNames: arrayUnion(user)
          });
        } catch (error) {
          console.error('error adding party lead: ', error);
        }
      }

      addPartyLeader();
    },[steamId, docId, user]);


    // ask firebase for the friends list
    useEffect(() => {
      const fetchData = async () => {
        try {
          const snap = await getDoc(doc(db, "friends", steamId));
          if (snap.exists()) {
            const friendsData = snap.data();
            setFriends(friendsData.friends);
            console.log("friends data: ", friendsData);
          } else {
            console.log("No document found");
          }
        } catch (error) {
          console.error("Error:", error);
        }
      };
  
      fetchData();
    }, [steamId]);
  
    useEffect(() => {
      if (friendsData && searchTerm.trim() !== "") {
        // Update suggestions when friendsData or searchTerm changes
        const filteredSuggestions = friendsData.filter((friend) =>
          friend.personaname.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSuggestions(filteredSuggestions);
      } else {
        setSuggestions([]); // Clear suggestions when there's no search term
      }
    }, [friendsData, searchTerm]);
  
    

    const handleInputChange = (e) => {
      setSearchTerm(e.target.value);
    };
  
    const handleSelectSuggestion = (selectedFriend) => {
      // Handle the selection of a suggestion, e.g., navigate to the friend's profile
      console.log("Selected Friend:", selectedFriend);
      addFriendToParty(selectedFriend, docId, steamId);
    };
  
async function addFriendToParty(selectedFriend, docId, steamId) {
    try {
        
        const updatedSteamId = steamId;
        
        await updateDoc(doc(db, 'parties', docId), {
            userSteamId: updatedSteamId,
            partyMembers: arrayUnion(selectedFriend.steamid),
            personaNames: arrayUnion(selectedFriend.personaname)
        })
    } catch (error) {
        console.error('error updating party in fs: ', error);
    }
}

    return (
      <div className="mx-0 ">
        <div className="">
          <div className="">
            <input
              type="text"
              className="w-full backdrop-blur-sm text-white bg-white/20 h-14 pl-5 rounded-lg focus:outline-none hover:cursor-pointer"
              placeholder="Search for a friend..."
              value={searchTerm}
              onChange={handleInputChange}
            />

          </div>
          </div>
  
        {/* Display suggestions */}
        {searchTerm.trim() !== "" && (
          <ul className="p-0 backdrop-blur-sm text-white bg-white/20 max-w-sm rounded-lg">
            {suggestions.map((friend) => (
              <li
                className="hover:bg-blue-800 rounded-lg"
                key={friend.steamid}
                onClick={() => handleSelectSuggestion(friend)}
              >
                <div className="p-4 flex text-xl ml-2">
                  <img
                    className="rounded-full cursor-pointer"
                    src={friend.avatarMedium}
                    alt={friend.personaname}
                  />
                  <span className="pl-4 pt-3 flex flex-col cursor-pointer">
                    {friend.personaname}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
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
    );
  }
  
  export default Search;