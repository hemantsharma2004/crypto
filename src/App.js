import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";
import { Heart } from "lucide-react";

const App = () => {
  const [light, setLight] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showNote, setShowNote] = useState(false);
  const [fireflies, setFireflies] = useState([]);
  const [petals, setPetals] = useState([]);
  const [hearts, setHearts] = useState([]);

  // Fireflies / twinkling lights
  useEffect(() => {
    const flies = Array.from({ length: 20 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: 2 + Math.random() * 4,
      duration: 5 + Math.random() * 5,
      delay: Math.random() * 5,
    }));
    setFireflies(flies);
  }, []);

  // Falling petals
  useEffect(() => {
    const petalsArray = Array.from({ length: 15 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * -200,
      size: 20 + Math.random() * 20,
      duration: 7 + Math.random() * 5,
      rotation: Math.random() * 360,
      delay: Math.random() * 5,
    }));
    setPetals(petalsArray);
  }, []);

  const handleLight = () => {
    setLight(true);
    setShowConfetti(true);
    // Trigger heart fireworks
    const heartArray = Array.from({ length: 10 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: 20 + Math.random() * 20,
      delay: Math.random() * 2,
    }));
    setHearts(heartArray);

    setTimeout(() => setShowConfetti(false), 7000);
  };

  const handleDownload = () => {
    const content = `💖 My Diwali Message 💖\n\nHey my love,\n\nAs the diyas light up every corner of the world, you light up my heart.\nYour smile shines brighter than the fireworks, and your warmth is my favorite glow.\n\nThis Diwali, I just want you to know that you are my light, my peace, and my forever celebration.\n\nWishing you endless happiness, laughter, and love.\n\nHappy Diwali, my brightest diya. ✨\n\n— Yours, with love ❤️`;
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "Diwali_Love_Note.txt";
    link.click();
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-orange-200 via-red-300 to-yellow-100 text-center p-6 overflow-hidden">
      {showConfetti && <Confetti recycle={false} numberOfPieces={300} />}

      {/* Fireflies / twinkling lights */}
      {fireflies.map((fly, idx) => (
        <motion.div
          key={idx}
          className="absolute bg-yellow-400 rounded-full"
          style={{
            width: fly.size,
            height: fly.size,
            top: fly.y,
            left: fly.x,
          }}
          animate={{
            y: [fly.y, fly.y - 20, fly.y],
            x: [fly.x, fly.x + 15, fly.x],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            repeat: Infinity,
            duration: fly.duration,
            delay: fly.delay,
          }}
        />
      ))}

      {/* Falling petals */}
      {petals.map((petal, idx) => (
        <motion.div
          key={idx}
          className="absolute bg-pink-400 rounded-full"
          style={{
            width: petal.size,
            height: petal.size / 3,
            top: petal.y,
            left: petal.x,
          }}
          animate={{
            y: [petal.y, window.innerHeight + 50],
            rotate: [0, petal.rotation],
          }}
          transition={{
            repeat: Infinity,
            duration: petal.duration,
            delay: petal.delay,
          }}
        />
      ))}

      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-4xl sm:text-6xl font-bold text-red-600 drop-shadow-lg mb-8"
      >
        🪔 Happy Diwali My Love 🪔
      </motion.h1>

      {/* Diya */}
      <motion.div
        className="relative cursor-pointer"
        onClick={handleLight}
        whileHover={{ scale: 1.1 }}
      >
        <motion.div className="w-32 h-20 bg-orange-500 rounded-b-full mx-auto relative shadow-2xl">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-36 h-10 bg-yellow-400 rounded-t-full blur-sm"></div>
        </motion.div>

        {/* Flame */}
        {light && (
          <motion.div
            className="absolute -top-16 left-1/2 -translate-x-1/2 w-10 h-20 rounded-full bg-gradient-to-t from-orange-400 via-yellow-300 to-white blur-lg"
            animate={{
              y: [-5, -10, -5],
              scale: [1, 1.2, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: 0.8,
            }}
          />
        )}

        <p className="mt-2 text-sm text-gray-800">
          {light ? "✨ You lit up my heart ✨" : "Tap to light the diya"}
        </p>
      </motion.div>

      {light && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-8 text-lg md:text-2xl text-pink-600 max-w-xl"
        >
          You light up my life brighter than any Diwali lamp. Thank you for being my glow in every moment. ❤️
        </motion.p>
      )}

      {/* Heart-shaped fireworks */}
      {hearts.map((heart, idx) => (
        <motion.div
          key={idx}
          className="absolute text-pink-500"
          style={{ top: heart.y, left: heart.x }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.5, 0], opacity: [0, 1, 0], y: [0, -100, -200] }}
          transition={{ duration: 2, delay: heart.delay }}
        >
          <Heart size={20} />
        </motion.div>
      ))}

      {/* Button */}
      <div className="mt-10 flex flex-col md:flex-row gap-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowNote(true)}
          className="flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-full shadow-lg transition-all duration-300"
        >
          <Heart size={20} /> Open Love Note
        </motion.button>
      </div>

      {/* Love Note Popup */}
      <AnimatePresence>
        {showNote && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ type: "spring", stiffness: 80 }}
              className="bg-white text-black rounded-2xl p-6 max-w-md w-full text-center shadow-2xl relative"
            >
              <h2 className="text-2xl font-bold text-pink-600 mb-4">
                💌 My Diwali Message 💌
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Hey my love,<br />
                As the diyas light up every corner of the world, you light up my heart.
                <br />
                Your smile shines brighter than the fireworks, and your warmth is my favorite glow.
                <br />
                This Diwali, I just want you to know that you are my light, my peace, and my forever celebration.
                <br />
                Wishing you endless happiness, laughter, and love.
                <br />
                <b>Happy Diwali, my brightest diya. ✨</b>
                <br />
                — Hemant ❤️
              </p>

              <div className="flex justify-center gap-4">
                <button
                  onClick={handleDownload}
                  className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-full"
                >
                  Download Note
                </button>
                <button
                  onClick={() => setShowNote(false)}
                  className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-full"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-6 text-sm text-gray-700"
      >
          ✨
      </motion.footer>
    </div>
  );
};

export default App;
