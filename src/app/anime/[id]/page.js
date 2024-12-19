"use client";
import {
    useState,
    useEffect,
} from "react";
import { useParams } from "next/navigation";

import Link from "next/link";

export default function Anime() {
    const { id } = useParams();
    const [anime, setAnime] = useState(null);
    useEffect(() => {
        async function fetchAnime() {
            let res = await
            fetch(`https://api.jikan.moe/v4/anime/${id}`);
            let response = await res.json();
            console.log(response)
            setAnime(response.data);
        }
        fetchAnime();
    }, []);

    
    if (!anime) {
        return ( 
          <div className="grid grid-rows-[20px_1fr_20px] items-center 
              justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-
              [family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-8 row-start-2 itemscenter sm:items-start">
              <h1>Loading....</h1>
            </main>
          </div>
        );
    }
    return (
        <div key={anime.mal_id} className="container mx-auto p-6 max-w-4xl bg-white shadow-lg rounded-lg">
            <div className="trailer">
                <iframe
                    className="w-full h-[200px] md:h-[350px] lg:h-[550px] rounded-lg"
                    src={anime.trailer.embed_url} 
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen>
                </iframe>
            </div>
    
            <h1 id="anime-title" className="text-2xl font-bold text-gray-900 mb-6 mt-8">
                {anime.title}
            </h1>
    
            <div className="description">
                <p id="anime-synopsis" className="text-gray-600 leading-relaxed">
                    {anime.synopsis}
                </p>
            </div>
            
            <Link href="/" className="flex justify-center">
                <button className="border px-4 py-2 mt-6 shadow rounded-md bg-indigo-600 text-white">
                    Kembali
                </button>
            </Link>
        </div>
    );
}