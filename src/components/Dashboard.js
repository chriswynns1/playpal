import React from "react";
import DashHead from './DashHead';
import FriendsPlaying from "./FriendsPlaying";
import LibraryCard from "./LibraryCard";

function Dashboard() {
  return (
    <>
    <div className="bg-gradient-to-r from-black to-blue-800 min-h-screen">
        <div className="ml-40">
          <h1 className="white-text text-2xl ml-8 pt-4">Game of the Week</h1>
          <div className="animate-slideup content-center sm:mx-10 lg:mx-40 pt-2">
            <DashHead 
              appid = '108600'
            />
          </div>
          <h1 className="white-text text-2xl ml-8 pt-4">What Your Friends are Playing</h1>
          <div className="animate-slideup content-center sm:mx-10 lg:mx-40 pt-2 flex-wrap">
            <FriendsPlaying />
          </div>
          <h1 className="white-text text-2xl ml-8 pt-4">Reccommended for You</h1>
          <div className="animate-slideup content-center sm:mx-10 lg:mx-40 pt-2 flex-wrap">
            <FriendsPlaying />
          </div>
          <h1 className="white-text text-2xl ml-8 pt-4">Library</h1>
          <div className="animate-slideup content-center sm:mx-10 lg:mx-40 pt-2 flex-wrap">
          <LibraryCard />
          <LibraryCard />

          </div>


        </div>
    </div>
    </>
  );
}

export default Dashboard;
