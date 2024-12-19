import React from 'react';
import Link from "next/link";

const AnimeCard = ({ anime }) => {
    return (
      <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200 flex mt-5">
        <img
          src={anime.images.jpg.image_url}
          alt={anime.title}
          className="w-1/6 h-auto object-cover"
        />
        <div className="p-4 flex flex-col justify-between w-2/3">
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              {anime.title}
            </h2>
            <p className="text-gray-700 text-sm mb-4 line-clamp-4">
              {anime.synopsis}
            </p>
          </div>
        </div>
        <div className="p-4 flex flex-col justify-center w-1/6">
            <dd class="text-amber-500 flex items-center text-xl text-center">
              <svg width="24" height="24" fill="none" aria-hidden="true" class="mr-1 stroke-current">
                <path d="m12 5 2 5h5l-4 4 2.103 5L12 16l-5.103 3L9 14l-4-4h5l2-5Z"  stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <span>{anime.score}</span>
            </dd>
            <Link href={`/anime/${anime.mal_id}`}>
              <button
                className="border w-full px-4 py-2 shadow bg-indigo-600 text-white rounded-md">
                See Detail
              </button>
            </Link>
        </div>
      </div>
    );
  };
  

export default AnimeCard;
