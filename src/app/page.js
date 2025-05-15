"use client";
import { Main } from "next/document";
import React from "react";
import { useEffect, useState } from "react";
const Home = () => {
  const [memes, setMemes] = useState([]);
  const [selectedMeme, setSelectedMeme] = useState(null);
  useEffect(() => {
    const fetchMemes = async () => {
      const response = await fetch(`https://api.imgflip.com/get_memes`);
      const data = await response.json();
      console.log(data.data.memes);
      setMemes(data?.data.memes);
      setSelectedMeme(data?.data.memes[0]);
      console.log(data.data.memes[0]);
    };
    fetchMemes();
  }, []);

  const handleChange = (event) => {
    const selectedMemeId = event.target.value;
    const meme = memes.find((meme) => meme.id === selectedMemeId);
    setSelectedMeme(meme);
    console.log(meme);
  };
  return (
    <main className="p-5">
      <div className="m-3 mr-5 ">
      <h1 className="flex items-center justify-center text-2xl underline ">
        ✌️ Welcome to Meme Generator ✌️
      </h1>
      {/* Dropdown Select */}
      <select
        onChange={handleChange} value={selectedMeme?.id}
        className="w-xl bg-black m-auto flex items-center text-white border-1 border-gray-500 rounded-md p-2 mt-5"
      >
        {memes.map((memes) => (
          <option key={memes.id} value={memes.id}>{memes.name}</option>
        ))}
      </select>
      <div>
        {/* Display Selected Meme */}
        {selectedMeme && (
          <div className="flex flex-col items-center mt-3">
            <img
              src={selectedMeme.url}
              alt={selectedMeme.name}
              className="w-72 h-72 m-auto mt-5"
            />
            <h2 className="mt-3 text-center text-2xl hover:text-gray-500 hover:underline hover:mt-4">
              {selectedMeme.name}
            </h2>
          </div>
        )}
      </div>
    </div>
    </main>
  );
};

export default Home;
