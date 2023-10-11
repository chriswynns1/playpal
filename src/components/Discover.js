import React from "react";

function Discover() {
  return (
    <div>
      <div className="bg-gradient-to-r from-black to-blue-800 min-h-screen">
        <div class="flex flex-col w-full lg:flex-row text-white">
          <div class="grid flex-grow h-32 mt-40 card bg-base-300 rounded-box place-items-center">
            Existing parties:
          </div>
          <div class="divider lg:divider-horizontal">OR</div>
          <div class="grid flex-grow h-32 card bg-base-300 rounded-box place-items-center">
            <a href="/newparty">Create a new party</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Discover;
