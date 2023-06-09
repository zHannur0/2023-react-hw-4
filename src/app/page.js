'use client'
import React, { useEffect, useState } from "react";
import axios from 'axios';
import Link from 'next/link';

const API_URL = 'https://kitsu.io/api/edge/anime'; 

export default function Home() {
  const [animes, setAnimes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL);
        // Update the state with the fetched data
        setAnimes(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        // Handle any errors
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-wrap justify-center">
      {/* Render the animes data */}
      {animes.map((anime) => (
        <Link href={`/${anime.id}`} key={anime.id} >
        <div className="bg-white rounded-lg shadow-md p-4 m-4 w-96">
          <img src={anime.attributes.posterImage.original} alt={anime.attributes.canonicalTitle} className="w-full object-cover mb-4 rounded-md" />
          <h3 className="text-black text-xl font-semibold mb-2">{anime.attributes.canonicalTitle}</h3>
          <p className="text-gray-700">{anime.attributes.description}</p>
          {/* <div className="mt-4">
            {anime.attributes.genres.map((genre) => (
              <span key={genre} className="inline-block bg-blue-500 text-white text-xs px-2 py-1 rounded-full mr-2">{genre}</span>
            ))}
            <span className="inline-block bg-green-500 text-white text-xs px-2 py-1 rounded-full">{anime.attributes.rating}</span>
          </div> */}
        </div>
        </Link>
      ))}
    </div>
  );
}