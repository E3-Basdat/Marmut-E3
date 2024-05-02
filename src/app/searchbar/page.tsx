"use client"
import React, { useState, useEffect} from 'react'

function searchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handeLihat = async () => {

  };

  // const handleSearch = async () => {
  //   const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
  //   const data = await response.json();
  //   setResults(data);  // Menyimpan hasil pencarian ke state
  // };

  return (
    <main className="flex min-h-screen text-white-100 flex-col items-center gap-10  p-48"> 
      <h1 className="text-4xl font-bold">Apa yang kamu ingin putar? </h1>
      <div className="flex flex-col gap-8 w-full max-w-4xl justify-center items-center">
          <div className="overflow-x-auto w-full">
            <input type="text" placeholder="Ketik Disini" className="overflow-x-auto w-full input input-bordered input-accent " />
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
                  <tr >
                    <td className="py-2 px-4 text-center">SONG</td>
                    <td className="py-2 px-4 text-center">Love is in the air</td>
                    <td className="py-2 px-4 text-center">Artist 1</td>
                    <td className="py-2 px-4 text-center">
                      <button onClick={handeLihat} className="btn btn-ghost btn-s text-lg w-full h-full text-green-100 hover:text-white bg-transparent">
                          Lihat
                      </button>
                    </td>
                  </tr>
              </tbody>
            </table>
          </div>

      </div>

    </main>
  )
}

export default searchBar;

// function ResultsTable({ results }) {
//   if (results.length === 0) {
//     return <p>Maaf, pencarian untuk "{query}" tidak ditemukan.</p>;
//   }

//   return (
//     <div className="w-full overflow-x-auto">
//       <table className="table w-full">
//         <thead>
//           <tr>
//             <th>Type</th>
//             <th>Judul</th>
//             <th>Oleh</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {results.map((item, index) => (
//             <tr key={index}>
//               <td>{item.type}</td>
//               <td>{item.title}</td>
//               <td>{item.by}</td>
//               <td><button onClick={() => handleView(item)}>Lihat</button></td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }


