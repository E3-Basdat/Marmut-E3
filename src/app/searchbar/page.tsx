'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getSearch } from '../actions/search';

interface SearchResult {
  tipe: string;
  judul: string;
  oleh: string;
  id: string; // Assuming each result has a unique ID for navigation purposes
}

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const router = useRouter();

  const handleSearch = async () => {
    if (!query) return;
    const response = await getSearch(query);
    console.log(response.rows);
    setResults(response.rows as SearchResult[]); // Assuming data is an array of SearchResult objects
  };

  const handleLihat = (item: SearchResult) => {
    // Handle the view action, navigate to the detail page based on item type
    router.push(`/detail/${item.id}`);
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
                  <td className="py-2 px-4 text-center">{item.tipe}</td>
                  <td className="py-2 px-4 text-center">{item.judul}</td>
                  <td className="py-2 px-4 text-center">{item.oleh}</td>
                  <td className="py-2 px-4 text-center">
                    <button onClick={() => handleLihat(item)} className="btn btn-ghost btn-s text-lg w-full h-full text-green-100 hover:text-white bg-transparent">
                      Lihat
                    </button>
                  </td>
                </tr>
              ))}
              {results.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-2 px-4 text-center">Maaf, pencarian untuk "{query}" tidak ditemukan.</td>
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
