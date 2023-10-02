import React from "react";
import DashHead from './DashHead';

function Dashboard() {
  return (
    <>
    <div className="bg-gradient-to-r from-black to-blue-800 min-h-screen">
        <h1 className="white-text text-4xl ml-4 pt-4">Most Played</h1>
        <DashHead />
    </div>
    </>
  );
}

export default Dashboard;
