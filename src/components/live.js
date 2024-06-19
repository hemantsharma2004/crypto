import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../utils/chatSlice";
import { generateRandomName, generateRandomQuote } from "../utils/helper";

const Live = () => {
  const dispatch = useDispatch();
  const chattings = useSelector((store) => store.chat.message) || []; 

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(addMessage({
        name: generateRandomName(),
        message:generateRandomQuote(),
      }));
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [dispatch]);

  return (
    <div className="flex flex-col justify-start items-start mt-4 ml-5 text-center   rounded-full p-2  max-w-md text-white text-opacity-80  text-lg">
      <div>
        {chattings.length > 0 ? (
          chattings.map((chat, index) => (
            <p className="text-pretty" key={index}><strong>{chat.name}:</strong> {chat.message}</p>
          ))
        ) : (
          <p>No messages yet.</p>
        )}
      </div>
    </div>
  );
};

export default Live;
