import React, { useRef, useState } from "react";
import { useTimer } from "react-timer-hook";
import Settings from "./Settings";

function MyTimer({ expiryTimestamp }) {
  const remainingRef = useRef(null);
  const { seconds, minutes, start, pause, restart } = useTimer({
    expiryTimestamp,
    onExpire: () => console.warn("onExpire called"),
  });

  function handlePause() {
    pause();

    remainingRef.current = minutes * 60 + seconds;
  }

  function handleStart() {
    if (remainingRef.current) {
      const time = new Date();
      time.setSeconds(time.getSeconds() + remainingRef.current);
      restart(time);
      remainingRef.current = null;
    } else {
      start();
    }
  }

  const [highlight, setHighlight] = useState("start");

  return (
    <div>
      <div className="text-[15rem] font-bold text-center text-pink-600 hover:cursor-pointer">
        <span>{String(minutes).padStart(2, "0")}</span>:
        <span>{String(seconds).padStart(2, "0")}</span>
      </div>

      <div className="flex justify-evenly bg-white py-3 px-2 rounded-full shadow-lg">
        <button
          className={`cursor-pointer py-3 px-3 rounded-lg hover:bg-pink-300 ${
            highlight === "start" ? "bg-pink-300" : "bg-transparent"
          }`}
          onClick={(e) => {
            e.stopPropagation();
            handleStart();
            setHighlight("start");
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
            />
          </svg>
        </button>
        <button
          className={`cursor-pointer py-3 px-3 rounded-lg hover:bg-pink-300  ${
            highlight === "pause" ? "bg-pink-300" : "bg-transparent"
          }`}
          onClick={(e) => {
            e.stopPropagation();
            handlePause();
            setHighlight("pause");
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 5.25v13.5m-7.5-13.5v13.5"
            />
          </svg>
        </button>
        <button
          className="cursor-pointer py-3 px-3 rounded-lg bg-transparent hover:bg-pink-300 "
          onClick={(e) => {
            e.stopPropagation();
            const time = new Date();
            setHighlight("start");
            time.setSeconds(time.getSeconds() + 300);
            restart(time);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061A1.125 1.125 0 0 1 21 8.689v8.122ZM11.25 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061a1.125 1.125 0 0 1 1.683.977v8.122Z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

const Pomodoro = ({ expiryTimestamp }) => {
  return (
    <>
      <div>
        <MyTimer expiryTimestamp={expiryTimestamp} />
      </div>
    </>
  );
};

export default Pomodoro;
