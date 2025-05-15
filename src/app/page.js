"use client";

import React from "react";
import { useEffect, useState } from "react";
const Home = () => {
  const [memes, setMemes] = useState([]);
  const [selectedMeme, setSelectedMeme] = useState(null);
  const [textTop, setTextTop] = useState("");
  const [textBottom, setTextBottom] = useState("");
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
    <main className="p-5 text-white bg-gray-900 min-h-screen">
      <div className="m-3 mr-5 ">
        <h1 className="flex items-center justify-center text-2xl underline ">
          ✌️ Welcome to Meme Generator ✌️
        </h1>
        {/* Dropdown Select */}
        <select
          onChange={handleChange}
          value={selectedMeme?.id}
          className="w-xl bg-black m-auto flex items-center text-white border-1 border-gray-500 rounded-md p-2 mt-5"
        >
          {memes.map((memes) => (
            <option key={memes.id} value={memes.id}>
              {memes.name}
            </option>
          ))}
        </select>
        <div>
          {/* Display Selected Meme */}
          {selectedMeme && (
            <div className="flex flex-col items-center mt-3 relative">
              <img
                src={selectedMeme.url}
                alt={selectedMeme.name}
                className="w-72 h-72 m-auto mt-5"
              />
              <h2 className="mt-3 text-center  text-xl hover:text-gray-500 hover:underline hover:mt-4">
                {selectedMeme.name}
              </h2>
              <p className="absolute top-10 left-[40%] -translate-x-[1%] -translate-y-[6%]  text-black text-lg  rounded ">
                {textTop}
              </p>
              <p className="absolute bottom-30 left-[40%] -translate-x-[10%] -translate-y-[50%]  text-black text-lg  rounded ">
                {textBottom}
              </p>
            </div>
          )}
        </div>
        {/* input feild */}
        <div className="flex items-center justify-center">
          <input
            type="text"
            placeholder="Top Text"
            maxLength={18}
            className="w-72 h-10 m-auto mt-5 max-w-[80%] bg-black text-white border-1 border-gray-500 rounded-md p-2"
            value={textTop}
            onChange={(e) => setTextTop(e.target.value)}
          />
          <input
            type="text"
            placeholder="Bottom Text"
            maxLength={18}
            className="w-72 h-10 m-auto mt-5 max-w-[80%] bg-black text-white border-1 border-gray-500 rounded-md p-2"
            value={textBottom}
           onChange={(e)=> setTextBottom(e.target.value)}
          />
        </div>
      </div>
    </main>
  );
};

export default Home;
