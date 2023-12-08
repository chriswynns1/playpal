import React, { useEffect, useState } from "react";
import Search from "./Search";
import axios from 'axios';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { db } from '../firebase-config';
import { doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { useNavigate } from "react-router-dom";

function PlayWithFriends() {
  const [userData, setUserData] = useState(null);
  const [user, setUser] = useState(null);
  const [partyDocumentId, setPartyDocumentId] = useState(null);
  const [partyData, setPartyData] = useState([]);
  const [steamId, setSteamId] = useState('');
  const [username, setUsername] = useState('');
  const [partyName, setPartyName] = useState('');
  const navigate = useNavigate();
  // trying to create document id here
  // making sure user is logged in
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        setSteamId(user.uid);
      }
    });
    
    const fetchPartyID = async () => {
      try {
        const response = await axios.get(`https://us-central1-playpal-63bee.cloudfunctions.net/playpalApi/newparty/${steamId}`);
        if (response.data && response.data.docid) {
          setPartyDocumentId(response.data.docid);
          console.log('in auth useeffect: ', response.data.docid);
          console.log('partydocid: ', partyDocumentId)
        }
      } catch (error) {
        console.error('Error fetching party ID:', error);
      }
    };

    if (user) {
      fetchPartyID();
    }

    return () => {
      unsubscribe();
    };
  }, [user]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snap = await getDoc(doc(db, "users", user.uid));
        if (snap.exists()) {
          const userData = snap.data();
          setUserData(userData);
          const username = userData.username;
          setUsername(username);
        } else {
          console.log("No such document");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    // Fetch data only if user is authenticated
    if (user) {
      fetchData();
    }
  }, [user]);

  useEffect(() => {
    if (partyDocumentId) {
      const docRef = doc(db, "parties", partyDocumentId);
      const fetchParty = async () => {
        try {
          const snap = await getDoc(docRef);
          if (snap.exists()) {
            const partyData = snap.data();
            setPartyData(partyData);
            console.log('partydata: ', partyData.personaNames);
          } else {
            console.log('cant find document');
          }
        } catch (error) {
          console.error('error fetching party doc: ', error);
        }
      }

      const unsubscribe = onSnapshot(docRef, (snap) => {
        if (snap.exists()) {
          const partyData = snap.data();
          setPartyData(partyData);
          console.log('updated data: ', partyData);
        } else {
          console.log('cant find document');
        }
      });

      fetchParty();

      return () => unsubscribe();
    }
  }, [partyDocumentId, user]);


  const handleFindGames = async () => {
    try {
      // First, update the party document with the party name
      const partyDocRef = doc(db, "parties", partyDocumentId);
      await updateDoc(partyDocRef, { partyName });
  
      // Then, make the API call to find common games
      const response = await axios.get(`http://localhost:5000/findgames/${partyDocumentId}`);
      // Handle the response as needed
      toast("Success! Redirecting you... ✅");
      // Introduce a 3-second delay before redirecting
      setTimeout(() => {
        // Redirect to localhost:3000/play after 3 seconds
        navigate("/play");
      }, 3000);
    } catch (error) {
      console.error("Error handling find games:", error);
      // Handle the error as needed
    }
  };

  const handlePartyNameChange = (event) => {
    setPartyName(event.target.value);
  };

  if (!user) {
    return <div>Please sign in to access the profile.</div>;
  }

  return (
    <div>
      <div className="bg-gradient-to-r from-black to-blue-800 min-h-screen">
        <div className="pt-40 mx-80 animate-slideup text-white text-6xl">
          Who's playing today?
        </div>
        <div className="flex justify-between pt-5 mx-80 gap-8">
          <div className="animate-slideup flex-initial w-80 ">
          <Search
              steamId={user.uid}
              docId={partyDocumentId}
              user={username}
          />
          </div>
          <div className="flex w-60">
            <div className="animate-slideup mt-2 p-2 backdrop-blur-sm bg-white/20 rounded-lg shadow object-contain h-60 w-60">
            <p className="text-white">
                  {partyData.partyMembers?.length || 0}/6 members
                </p>
                <ul className="text-white">
                  {partyData &&
                    partyData.personaNames &&
                    partyData.personaNames.map((name, index) => (
            <li key={index}>{name}</li>
                    ))}
                </ul>
            </div>
          </div>
          <div className="flex-auto">
          <div className="text-white">
            Give your party a name:
            <input
              type="text"
              value={partyName}
              onChange={handlePartyNameChange}
              className="w-full backdrop-blur-sm text-white bg-white/20 h-14 pl-5 rounded-lg focus:outline-none hover:cursor-pointer"
            />

          </div>
          <div className="animate-slideup pt-2">
            <button
             type="button"
             onClick={handleFindGames}
              className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
            >
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-gray-900 rounded-md text-3xl group-hover:bg-opacity-0">
                Create New Party
              </span>
            </button>
          </div>
          </div>
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
  );
}

export default PlayWithFriends;
