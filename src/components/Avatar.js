import React, {useState} from 'react';
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Avatar({profilepic, username, steamId}) {
    const [loading, setLoading] = useState(true);
    console.log(profilepic);

    // handle the click to refresh steam library
    const handleClick = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/refresh/${steamId}`);
        toast("Steam library refreshed! ✅");
      } catch (error) {
        console.error('error', error);
      }
    };

  return (
    <div className="max-w-sm backdrop-blur-sm bg-white/20 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 lg:w-[500px]">
    <div className='flex flex-col items-center  justify-between pt-10'>
        <img className='rounded-full'  src={(profilepic)} />
        <h2 className='items-center text-4xl pt-3 text-white'>{(username)}</h2>
        <h3 className='text-white'>Status: Online</h3>
        <div>
          <button
           type="button"
            data-modal-target="defaultModal"
            data-modal-toggle="defaultModal"
            onClick={handleClick}
            className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
          >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Refresh Library
            </span>
          </button>
          <ToastContainer
            position="top-center"
            autoClose={3000}
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
  )
}

export default Avatar
