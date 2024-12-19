"use client";
import Link from "next/link";
import {
    useState,
    useEffect
} from "react";
import AnimeCard from "./components/AnimeCard";

export default function Animes() {
    const [animes, setAnimes] = useState(null);
    const [query, setQuery] = useState("");
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const base = `https://api.jikan.moe/v4/anime?min_score=8&start_date=2023-01-30&order_by=score&sort=desc`;
    useEffect(() => {
        async function fetchAnimes() {
            const url = `${base}&page=${page}&limit=10`;
            const res = await fetch(url);
            const response = await res.json();
            const totalPage = Math.ceil(response.pagination.items.total / response.pagination.items.per_page);
            setAnimes(response.data);
            setTotalPage(totalPage);
            window.scrollTo(0, 300);
        }
        fetchAnimes();
    }, [page]);
    const handleSearch = async (e) => {
        e.preventDefault();
        const url = `${base}&page=1&limit=10&q=${query}`;
        const res = await fetch(url);
        const response = await res.json();
        setAnimes(response.data);
    };
    if (!animes) {
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
      <div className="grid grid-rows-[20px_1fr_20px] items-center 
          justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-
          [family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center">
          <h1 className="font-bold text-2xl">Anime For You</h1>
          <form onSubmit={handleSearch}>
            <input
              className="border shadow px-4 py-2 rouded-md"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search Anime..."
            />
            <button 
              type="submit"
              className="border px-4 py-2 ml-4 shadow bg-indigo-600 text-white rounded-md"
              >Search</button>
          </form>
          <div className="w-full xl:w-2/3">
            {animes.map((anime, key) => (
              <AnimeCard anime={anime}/>
            ))}
          </div>
          <div className="w-full xl:w-2/3">
            <div className="flex flex-row gap-1 justify-center">
              {Array.from({ length: totalPage }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`border px-4 py-2 shadow bg-indigo-600 text-white rounded-md ${
                    page === i + 1 ? "bg-indigo-800" : ""
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        </main>
      </div>
  );
}