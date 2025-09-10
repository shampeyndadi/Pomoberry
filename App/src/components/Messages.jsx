import React, { useState } from "react";
import Dog from "./Dog";

function Messages({ setShowMessagesModal }) {
  const [message, setMessage] = useState("");
  const MAX_CHARS = 30;

  const handleChange = (e) => {
    const value = e.target.value;
    if (value.length > MAX_CHARS) {
      setMessage(value.slice(0, MAX_CHARS));
    } else {
      setMessage(value);
    }
  };

  const charCount = message.length;

  return (
    <div
      className="fixed top-0 left-0 right-0 bottom-0 w-full h-full z-[9999] bg-red-500/20 flex items-center justify-center"
      style={{ margin: 0, padding: 0 }}
    >
      <div className="bg-white w-[43rem] py-3">
        <div className="flex flex-col">
          <div className="flex justify-between items-center px-3">
            <div></div>
            <h1 className="font-bold text-2xl text-center text-pink-500">
              Add short messages
            </h1>
            <div
              onClick={() => {
                setShowMessagesModal(false);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 hover:cursor-pointer"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </div>
          </div>

          <div className="px-10 mt-4">
            <textarea
              value={message}
              onChange={handleChange}
              placeholder={`Write a short message (max ${MAX_CHARS} characters)`}
              className="w-full min-h-32 p-3 border border-pink-300 rounded-md outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-500 placeholder:text-gray-400 resize-none"
            />
            <div className="mt-2 text-sm text-gray-600 flex justify-between">
              <span>
                {charCount} / {MAX_CHARS}
              </span>
              <button className="px-3 py-1 bg-pink-400 text-white rounded-lg">
                Add message
              </button>
            </div>
          </div>

          <div className="flex items-center justify-center w-full py-4">
            <Dog />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Messages;
