import React from "react";

function Settings() {
  return (
    <>
      <div className="fixed inset-0 z-50 bg-red-500/20 flex items-center justify-center">
        <div className="bg-white p-5 rounded-lg shadow-lg space-y-3">
          <h1 className="text-center font-bold text-2xl">Settings</h1>
          <div className="flex space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <p>Timer</p>
          </div>

          <div className="flex space-x-5">
            <div className="flex flex-col space-y-2">
              <label className="mr-2 font-bold text-pink-600">Pomodoro</label>
              <input
                type="number"
                min="1"
                max="60"
                className="border border-gray-300 rounded-lg p-2 w-[9rem]"
                placeholder="Set timer (min)"
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label className="mr-2 font-bold text-pink-600">Break</label>
              <input
                type="number"
                min="1"
                max="60"
                className="border border-gray-300 rounded-lg p-2 w-[9rem]"
                placeholder="Set timer (min)"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button className="bg-pink-300 text-white rounded-lg p-2 hover:cursor-pointer hover:bg-pink-600">
              Save & Exit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Settings;
