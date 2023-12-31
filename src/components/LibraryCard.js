import React, { useEffect, useState } from 'react'

function LibraryCard({game, name, appid}) {
    const [imgInfo, setImgInfo] = useState([]);
    const [imageUrl, setImageUrl] = useState([]);
    const noImageFound = require('../assets/vert-placeholder.jpg')

    console.log('no image found: ', noImageFound);
    // grab image data from steamgriddb
    useEffect(() => {
        const fetchImageInfo = async () => {
            try {
            const response = await fetch(`https://us-central1-playpal-63bee.cloudfunctions.net/playpalApi/steamgrid/vert/${appid}`);
            const img = await response.json();
            setImgInfo(img.data);

            // Move the declaration outside the if block
            let firstImageUrl = '';

            if (img.data.length > 0) {
                firstImageUrl = img.data[0].url;
                setImageUrl(firstImageUrl);
            }
            } catch (error) {
            console.error('Error fetching game info:', error);
            }
        };
        fetchImageInfo();
        }, [appid]);

  return (
    <div>
        <div class="transitioninset-0 ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 max-w-sm backdrop-blur-sm bg-white/20 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href={`https://store.steampowered.com/app/${appid}`} target="_blank">
                <img class="rounded-t-lg object-scale-down  w-[250px] h-[225px]" src={imageUrl || noImageFound} alt={name} />
            </a>
            <div class="p-3">
                <a href={`https://store.steampowered.com/app/${appid}`} target="_blank">
                    <h5 class="mb-2 text-xl tracking-tight text-white">{name}</h5>
                </a>
                {/*<p class="font-normal text-white dark:text-gray-400">{appid}</p>*/}
            </div>
        </div>
    </div>
  )
}

export default LibraryCard
