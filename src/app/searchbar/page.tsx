'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getSearch } from '../actions/search';
import { useAuth } from '../contexts/AuthContext';

interface SearchResult {
  type: string;
  title: string;
  by: string;
  id: string; 
}

const SearchBar = () => {
  const { isAuthenticated } = useAuth(); 
  const [query, setQuery] = useState("");
  const [searchAttempted, setSearchAttempted] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [itemsSearched, setItemsSearched] = useState<string>();
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (isLoaded) {
      if (!isAuthenticated) {
          router.push("/auth/login");
      }
  }

  const handleSearch = async () => {
    if (!query) return;
    const response = await getSearch(query);
    setItemsSearched(query)
    setResults(response.rows as SearchResult[]); 
    setSearchAttempted(true);
  };

  const handleLihat = (item: SearchResult) => {
    if (item.type == "SONG"){
      router.push(`/detail_lagu/${item.id}`);
    } else if (item.type == "PODCAST") {     
      router.push(`/podcast/${item.id}`);
    } else {
      router.push(`/play_playlist/${item.id})}`);
    }
    
  };

  return (
    <main className="flex min-h-screen text-white-100 flex-col items-center gap-10 p-48">
      <h1 className="text-4xl font-bold">Apa yang kamu ingin putar?</h1>
      <div className="flex flex-col gap-8 w-full max-w-4xl justify-center items-center">
        <div className="overflow-x-auto w-full flex flex-col items-center">
          <input 
            type="text" 
            placeholder="Ketik Disini" 
            value={query} 
            onChange={(e) => setQuery(e.target.value)} 
            className="overflow-x-auto w-full input input-bordered input-accent" 
          />
          <button onClick={handleSearch} className="btn btn-accent mt-2">Cari</button>
        </div>
        <div className="w-full overflow-x-auto">
          <table className="w-full text-lg">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="rounded-tl-lg py-3 px-5">Type</th>
                <th className="py-3 px-5">Judul</th>
                <th className="py-3 px-5">Oleh</th>
                <th className="rounded-tr-lg py-3 px-5">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {results.map((item, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 text-center">{item.type}</td>
                  <td className="py-2 px-4 text-center">{item.title}</td>
                  <td className="py-2 px-4 text-center">{item.by}</td>
                  <td className="py-2 px-4 text-center">
                    <button onClick={() => handleLihat(item)} className="btn btn-ghost btn-s text-lg w-full h-full text-green-100 hover:text-white bg-transparent">
                      Lihat
                    </button>
                  </td>
                </tr>
              ))}
              {searchAttempted&&results.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-2 px-4 text-center">Maaf, pencarian untuk "{itemsSearched}" tidak ditemukan.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};

export default SearchBar;
