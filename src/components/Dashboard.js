import React from "react";
import DashHead from './DashHead';
import FriendsPlaying from "./FriendsPlaying";

function Dashboard() {
  return (
    <>
    <div className="bg-gradient-to-r from-black to-blue-800 min-h-screen">
        <h1 className="white-text text-4xl ml-8 pt-4">Most Played</h1>
        <div className="animate-slideup content-center sm:mx-10 lg:mx-40 pt-5">
          <DashHead />
        </div>
        <h1 className="white-text text-4xl ml-8 pt-4">What Your Friends are Playing</h1>
        <div className="animate-slideup content-center sm:mx-10 lg:mx-40 pt-5 flex-wrap">
          <FriendsPlaying />
        </div>
    </div>
    </>
  );
}

export default Dashboard;
