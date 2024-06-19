import React, { useState, useEffect } from "react";
import CoinList from "./coinList"


const Home = () => {
  const [allCoins, setAllCoins] = useState([]);
  const [input, setInput] = useState('');
  const [display, setDisplay] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd');
        const data = await response.json();
        console.log("Fetched coins data:", data); 
        setAllCoins(data);
        setDisplay(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const inputHandler = (event) => {
    setInput(event.target.value);
    if (event.target.value === "") {
      setDisplay(allCoins);
    }
  };

  const searchHandler = (event) => {
    event.preventDefault();
    console.log("Search input:", input); 
    console.log("All coins before filtering:", allCoins); 

    if (!Array.isArray(allCoins)) {
      console.error("allCoins is not an array:", allCoins);
      return;
    }

    const coins = allCoins.filter((coin) => {
      return coin.name.toLowerCase().includes(input.toLowerCase());
    });

    console.log("Filtered coins:", coins); 
    setDisplay(coins);
  };

  return (
    <div className="pb-20">
      <div className="max-w-2xl flex flex-col items-center text-center mx-auto my-14 p-4">
        <h1 className="text-5xl font-bold mb-4">
          Largest <br />
          Crypto Marketplace
        </h1>
        <p className="text-lg my-6">
          Welcome to the world's largest cryptography marketplace. Sign up to know more about cryptos.
        </p>
        <form onSubmit={searchHandler} className="flex items-center text-black w-[400px]">
          <input
            type="text"
            placeholder="Search crypto"
            onChange={inputHandler}
            value={input}
            list="coinlist"
            className="mb-4 rounded-l-2xl h-14 p-2 border rounded w-[300px] text-black"
            required
          />
        
          <datalist id="coinlist">
            {Array.isArray(allCoins) && allCoins.map((coin, index) => (
              <option key={index} value={coin.name} />
            ))}
          </datalist>

          <button
            type="submit"
            className="bg-blue-500 -mt-5 rounded-r-2xl h-14 text-white py-2 px-6 rounded hover:bg-blue-700"
          >
            Search
          </button>
        </form>
      </div>

      <div className="w-[800px] m-auto rounded-xl text-center bg-gradient-to-b from-indigo-900 to-purple-900">
        <CoinList coins={display} />
      </div>
    </div>
  );
};

export default Home;
