import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  getFirestore,
  collection,
  query,
  where,
  onSnapshot,
  deleteDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase-config";
import axios from "axios";
import LibraryCard from "./LibraryCard";

// Placeholder image URL
const placeholderImage = "https://via.placeholder.com/50";

function Play() {
  const [userParties, setUserParties] = useState([]);
  const [selectedParty, setSelectedParty] = useState(null);
  const [user, setUser] = useState("");
  const [gameDetails, setGameDetails] = useState({});
  const [friendsAvatars, setFriendsAvatars] = useState({});
  const [userAvatar, setUserAvatar] = useState('');

  

  const fetchGameDetails = async (appid) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/steamgrid/${appid}`
      );
      const data = response.data;

      if (data && data.success) {
        setGameDetails((prevDetails) => ({
          ...prevDetails,
          [appid]: data.data,
        }));
      } else {
        console.error(`Failed to fetch details for appid ${appid}`);
      }
    } catch (error) {
      console.error(`Error fetching game details: ${error.message}`);
    }
  };

  useEffect(() => {
    const auth = getAuth();
    const unsubscribeAuth = onAuthStateChanged(auth, async (authUser) => {
      setUser(authUser);
      if (authUser) {
        try {
          const userAvatarResponse = await axios.get(`http://localhost:5000/steam/userinfo/${authUser.uid}`);
          const userAvatarData = userAvatarResponse.data;
          if (userAvatarData && userAvatarData.response && userAvatarData.response.players && userAvatarData.response.players.length > 0) {
            const avatarMedium = userAvatarData.response.players[0].avatarmedium;
            setUserAvatar(avatarMedium);
          } else {
            console.error(`Failed to fetch user avatar for user with steamid: ${authUser.uid}`);
          }
        } catch (error) {
          console.error('Error fetching user avatar:', error);
        }
        const partiesQuery = query(
          collection(db, "parties"),
          where("userSteamId", "==", authUser.uid)
        );
        const unsubscribeFirestore = onSnapshot(partiesQuery, (snapshot) => {
          const partiesData = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setUserParties(partiesData);

          // Fetch friends' avatars
          const fetchFriendsAvatars = async () => {
            try {
              const friendData = await getDoc(doc(db, "friends", authUser.uid));

              if (friendData.exists()) {
                const userData = friendData.data();
                const avatars = {};

                userData.friends.forEach((friend) => {
                  const steamid = friend.steamid;
                  const personaName = friend.personaname;
                  const avatarMedium = friend.avatarMedium;

                  avatars[personaName] = { steamid, avatarMedium };
                });

                setFriendsAvatars(avatars);

                // Log the avatars object
                console.log("Friends avatars:", avatars);
              } else {
                console.log(
                  `No document found for user with steamid: ${authUser.uid}`
                );
              }
            } catch (error) {
              console.error("Error fetching user details:", error);
            }
          };
          console.log("partiesdata: ", partiesData);
          partiesData.forEach((party) => {
            if (
              party.commonGames &&
              Array.isArray(party.commonGames) &&
              party.commonGames.length > 0
            ) {
              party.commonGames.forEach((appid) => {
                if (!gameDetails[appid]) {
                  fetchGameDetails(appid);
                }
              });
            }

            if (
              party.personaNames &&
              Array.isArray(party.personaNames) &&
              party.personaNames.length > 0
            ) {
              fetchFriendsAvatars();
            }
          });
        });

        return () => {
          unsubscribeFirestore();
        };
      }

      setUserParties([]);
    });

    return () => {
      unsubscribeAuth();
    };
  }, [gameDetails]);

  const handlePartyClick = (party) => {
    setSelectedParty(party);
  };

  const handleDeleteParty = (party) => {
    const partyRef = doc(db, "parties", party.id); // Assuming you have an 'id' field in your party object
    deleteDoc(partyRef)
      .then(() => {
        console.log("Party deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting party: ", error);
      });
  };

  return (
    <div className="pt-20 text-white mx-80">
      {selectedParty ? (
        <div>
          {/* Selected Party Details */}
          <div>
            <h2 className="text-4xl mb-4 text-center">
              {selectedParty.partyName}
            </h2>
          </div>
          <div className="flex space-x-4 justify-center">
            {selectedParty.personaNames.map((personaName, index) => (
              <div key={index} className="text-center">
                <img
                  src={
                    (friendsAvatars[personaName] &&
                      friendsAvatars[personaName].avatarMedium) ||
                      userAvatar ||
                    placeholderImage
                  }
                  alt="Avatar"
                  className="w-10 h-10 mx-auto mb-2 rounded-full"
                />
                <p>{personaName}</p>
              </div>
            ))}
          </div>

          <p>Common games:</p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
            {selectedParty.commonGames &&
              Array.isArray(selectedParty.commonGames) &&
              selectedParty.commonGames.length > 0 &&
              selectedParty.commonGames.map((appid, index) => (
                <li className="animate-slideup pt-2" key={index}>
                  <LibraryCard
                    name={gameDetails[appid] && gameDetails[appid].name}
                    appid={appid}
                  />
                </li>
              ))}
          </ul>
          <button onClick={() => setSelectedParty(null)}>
            Go back to party list
          </button>
        </div>
      ) : (
        // Stacked List of Parties
        <div>
          <span className="text-3xl mb-2">Parties created by you:</span>
          <div>
                <span className="text-lg">Don't see your party? <a className="underline hover:text-cyan-500 ease-in-out" href="/newparty">Create a new one!</a></span>
          </div>
          {userParties.map((party) => (
            <div
              key={party.partyName}
              onClick={() => handlePartyClick(party)}
              className="border rounded-md shadow-xl p-4 mt-2 cursor-pointer mb-4 animate-slideup transitioninset-0 ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 duration-300 w-3/4 relative mx-auto"
            >
              <div>
                <div className="text-4xl mb-4 text-center">
                  <strong>{party.partyName}</strong>
                </div>
              </div>
              <div className="flex space-x-4 justify-center">
                {party.personaNames.map((personaName, index) => {
                  console.log("test ava: ", friendsAvatars[personaName]);
                  return (
                    <div key={index} className="text-center">
                      <img
                        src={
                          (friendsAvatars[personaName] &&
                            friendsAvatars[personaName].avatarMedium) ||
                            userAvatar || 
                          placeholderImage
                        }
                        alt="Avatar"
                        className="w-10 h-10 mx-auto mb-2 rounded-full"
                      />
                      <p>{personaName}</p>
                    </div>
                  );
                })}
              </div>
              <button
                onClick={() => handleDeleteParty(party)}
                className="absolute bottom-0 left-0 mb-2 ml-2 bg-red-500 text-white px-2 py-1 rounded"
              >
                Delete Party
              </button>
            </div>
          ))}

        </div>
      )}
    </div>
  );
}

export default Play;
