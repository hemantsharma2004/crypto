import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CoinData = () => {
  const { Id } = useParams();
  const [coinData, setCoinData] = useState(null);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchCoinData = async () => {
      try {
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/${Id}`);
        const data = await response.json();
        setCoinData(data);
      } catch (error) {
        console.error("Error fetching coin data:", error);
      }
    };

    const fetchChartData = () => {
      const options = {
        method: 'GET',
        headers: { accept: 'application/json', 'x-cg-demo-api-key': 'CG-aHx8krHGr59G7JvpMVmmdNFi' },
      };

      fetch(`https://api.coingecko.com/api/v3/coins/${Id}/market_chart?vs_currency=usd&days=20`, options)
        .then((response) => response.json())
        .then((data) => {
          const prices = data.prices.map((price) => ({ x: new Date(price[0]), y: price[1] }));
          setChartData({
            labels: prices.map((price) => price.x.toLocaleDateString()),
            datasets: [
              {
                label: 'Price (USD)',
                data: prices.map((price) => price.y),
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
              },
            ],
          });
        })
        .catch((err) => console.error("Error fetching chart data:", err));
    };

    fetchCoinData();
    fetchChartData();
  }, [Id]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-[90%] md:w-[800px] m-auto p-5 rounded-xl text-center bg-gradient-to-b from-indigo-900 to-purple-900 text-white shadow-lg">
        {coinData ? (
          <div>
            <img className="mx-auto w-32 h-32 mb-4" alt={coinData.name} src={coinData.image.large} />
            <h1 className="text-4xl font-bold mb-4">{coinData.name} ({coinData.symbol.toUpperCase()})</h1>
            <p className="text-2xl mb-2">Current Price: ${coinData.market_data.current_price.usd.toLocaleString()}</p>
            <p className="text-2xl mb-2">Market Cap: ${coinData.market_data.market_cap.usd.toLocaleString()}</p>
            <div className="mt-4 text-left">
              <h2 className="text-xl font-semibold mb-2">Description:</h2>
              <p className="text-lg">{coinData.description.en.split('. ').slice(0, 3).join('. ')}.</p>
            </div>
            {chartData && (
              <div className="mt-4">
                <h2 className="text-xl font-semibold mb-2">10-Day Market Chart</h2>
                <Line data={chartData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
              </div>
            )}
          </div>
        ) : (
          <p className="text-xl">Loading...</p>
        )}
      </div>
    </div>
  );
};

export default CoinData;
