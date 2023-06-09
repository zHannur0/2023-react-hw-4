'use client'
import React, { useEffect, useState } from "react";
import axios from 'axios';
const API_URL = 'https://kitsu.io/api/edge/anime'; 


export default function AnimePage({params}) {
  const [anime, setAnime] = useState(null);

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        const response = await axios.get(`${API_URL}/${params.id}`);
        // Update the state with the fetched anime data
        setAnime(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        // Handle any errors
        console.error(error);
      }
    };

    fetchAnime();
  }, []);

  if (!anime) {
    return <div>Loading...</div>;
  }

  const { title, description, image, genres, rating } = anime;

  return (
    <div>
      <div className="flex items-center justify-center">
        <img src={anime.attributes.posterImage.original} alt={anime.attributes.canonicalTitle} className="w-64 h-96 object-cover rounded-lg shadow-lg" />
      </div>
      <div className="max-w-2xl mx-auto px-4 mt-8">
        <h1 className="text-3xl font-semibold">{anime.attributes.canonicalTitle}</h1>
        <div className="flex items-center mt-2">
            {/* <span className="inline-block bg-blue-500 text-white text-xs px-2 py-1 rounded-full mr-2">
              {}
            </span> */}
          <span className="inline-block bg-green-800 text-white text-xs px-2 py-1 rounded-full">Rating {anime.attributes.averageRating}</span>
        </div>
        <p className="text-gray-200 mt-4">{anime.attributes.description}</p>
      </div>
    </div>
  );
}
