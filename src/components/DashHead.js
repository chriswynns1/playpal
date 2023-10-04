import React, { useEffect, useState } from 'react';
import axios from 'axios';

function DashHead({appid}) {
  const [gameInfo, setGameInfo] = useState([]);
  const [imgInfo, setImgInfo] = useState([]);
  const [imageUrl, setImageUrl] = useState([]);
  const [priceInfo, setPriceInfo] = useState([]);
  const [price, setPrice] = useState([]);
  
  useEffect(() => {
    const fetchGameInfo = async () => {
      try {
        const response = await fetch(`http://localhost:5000/steamgrid/${appid}`);
        const data = await response.json();
        setGameInfo(data.data);  // Assuming the API response has the information you need
        console.log('success', data.data);
      } catch (error) {
        console.error('Error fetching game info:', error);
      }
    };
    fetchGameInfo();
  }, [appid]);

  useEffect(() => {
    const fetchImageInfo = async () => {
      try {
        const response = await fetch(`http://localhost:5000/steamgrid/hero/${appid}`);
        const img = await response.json();
        setImgInfo(img.data);

        // Move the declaration outside the if block
        let firstImageUrl = '';

        if (img.data.length > 0) {
          firstImageUrl = img.data[0].url;
          setImageUrl(firstImageUrl);
          console.log('first image url: ', firstImageUrl);
        }
      } catch (error) {
        console.error('Error fetching game info:', error);
      }
    };
    fetchImageInfo();
  }, [appid]);

  useEffect(() => {
    const fetchPriceInfo = async () => {
      try {
        const response = await fetch(`http://localhost:5000/steam/price/${appid}`);
        const priceData = await response.json();
        setPriceInfo(priceData.data);  // Assuming the API response has the information you need
        
        // Use a different variable name
        const formattedPrice = priceData.data.final_formatted;
        
        setPrice(formattedPrice);
        console.log('steam info: ', formattedPrice);
      } catch (error) {
        console.error('Error fetching game info:', error);
      }
    };
    fetchPriceInfo();
  }, [appid]);

  return (
    <div class="transitioninset-0 ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 max-w-4xl backdrop-blur-sm bg-white/20 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <a href="#">
        <img
          className="rounded-t-lg"
          src={imageUrl || require('../assets/dash-head-placeholder.jpg')}
          alt=""
        />
      </a>
      <div class="p-3">
        <a href="#">
          <h5 class="mb-2 text-2xl tracking-tight text-white">
            {gameInfo.name}
          </h5>
        </a>
        <p class="font-normal text-white dark:text-gray-400">{`${price}`}</p>
      </div>
    </div>
  );
}

export default DashHead;
