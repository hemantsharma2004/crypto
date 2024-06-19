import React from "react";
import { Link } from "react-router-dom";

const CoinList = ({ coins }) => {
  return (
    <div>
       <div className="grid grid-cols-5 text-center pr-2 items-center mb-8 p-2 bg-gradient-to-b from-indigo-950 to-purple-900">
        <p>Symbol</p>
        <p>Name</p>
        <p>Price</p>
        <p>24H Change</p>
        <p>Market Cap</p>
      </div>
      {coins.length > 0 ? (
        coins.slice(0,15).map((coin) => (
          <Link to={`/coins/${coin.id}`} key={coin.id}>
            <div className="grid grid-cols-5 pl-4 text-center pr-2 pb-5 items-center">
              <h1>{coin.symbol.toUpperCase()}</h1>
              <div className="flex items-center justify-start col-span-1">
                <img src={coin.image} alt={coin.name} className="w-8 h-8 mr-2" />
                <h1>{coin.name}</h1>
              </div>
              <h1>${coin.current_price}</h1>
              <h1 className={coin.price_change_percentage_24h > 0 ? "text-green-600" : "text-red-600"}>
                {Math.floor(coin.price_change_percentage_24h * 100) / 100}%
              </h1>
              <h1>${coin.market_cap}</h1>
            </div>
          </Link>
        ))
      ) : (
        <p>No coins found</p>
      )}
    </div>
  );
};

export default CoinList;
