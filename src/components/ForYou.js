import React, { useEffect, useState } from "react";
import axios from "axios";
function ForYou({name}) {
  const [appInfo, setAppInfo] = useState([]);
  const [recName, setRecName] = useState('');
  const [imageUrl, setImageUrl] = useState([]);
  const [coverImage, setCoverImage] = useState('');
  const [officialUrl, setOfficialUrl] = useState('');


  // grab image data from steamgriddb
  useEffect(() => {
    const getRec = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/recommend/${name}`
        );
        const appInfo = await response.json();
        setAppInfo(appInfo.data);
        const recName = appInfo.recommendation
        setRecName(recName);
        const formattedGameName = recName.replace(/\s+/g, '-');
        console.log('formatted: ', formattedGameName);

        const gameInfoResponse = await axios.get(`http://localhost:5000/recommend/getgameinfo/${formattedGameName}`)
        const gameInfo = gameInfoResponse;
        

        // extracting vals from response
        const coverImage = gameInfo.data.background_image;
        console.log('game info:' ,gameInfo);
        const officialUrl = gameInfo.data.website;


        // set values in state
        setCoverImage(coverImage);
        setOfficialUrl(officialUrl)

        console.log('cover image: ', coverImage);
        console.log('official url:', officialUrl);

    } catch (error) {
        if (error.response) {
          // If 429 error, wait for a second and retry
          console.error('error: ');
        }
      }
    };
    getRec();
  }, [name]);

  return (
    <div class="transitioninset-0 ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 max-w-xs backdrop-blur-sm bg-white/20 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 w-[285px]">
      <a href={officialUrl} target="_blank">
        <img
          class="rounded-t-lg"
          src={coverImage}
          alt=""
        />
      </a>
      <div class="p-3">
        <a href={officialUrl} target="_blank">
          <h5 class="mb-2 text-2xl tracking-tight text-white">
            {recName}
          </h5>
        </a>
      </div>
    </div>
  );
}

export default ForYou;
