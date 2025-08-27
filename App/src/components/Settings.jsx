import React from "react";
import styled from "styled-components";

const Switch = ({ id }) => {
  return (
    <StyledWrapper>
      <div className="check">
        <input id={id} type="checkbox" />
        <label htmlFor={id} />
      </div>
    </StyledWrapper>
  );
};

function Settings({
  pomodoroDuration,
  setPomodoroDuration,
  breakDuration,
  setBreakDuration,
  longBreakDuration,
  setLongBreakDuration,
  onClose,
  onExit,
}) {
  return (
    <>
      <div className="fixed inset-0 z-50 bg-red-500/20 flex items-center justify-center">
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-white p-5 rounded-lg shadow-lg space-y-3"
        >
          <div className="flex justify-between items-center">
            <div></div>
            <h1 className="text-center font-bold text-2xl">Settings</h1>

            <div onClick={onExit}>
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
                value={pomodoroDuration}
                onChange={(e) => setPomodoroDuration(Number(e.target.value))}
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label className="mr-2 font-bold text-pink-600">Break</label>
              <input
                type="number"
                min="1"
                max="60"
                className="border border-gray-300 rounded-lg p-2 w-[9rem]"
                value={breakDuration}
                onChange={(e) => setBreakDuration(Number(e.target.value))}
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label className="mr-2 font-bold text-pink-600">Long Break</label>
              <input
                type="number"
                min="1"
                max="60"
                className="border border-gray-300 rounded-lg p-2 w-[9rem]"
                value={longBreakDuration}
                onChange={(e) => setLongBreakDuration(Number(e.target.value))}
              />
            </div>
          </div>

          <hr></hr>

          <div className="flex flex-col space-y-6">
            <div className="flex items-center justify-between px-3">
              <h1 className="font-bold text-pink-600">Auto Start Pomodoro</h1>
              <Switch id="auto-start-pomodoro" />
            </div>

            <div className="flex items-center justify-between px-3">
              <h1 className="font-bold text-pink-600">Auto Start Break</h1>
              <Switch id="auto-start-break" />
            </div>

            <div className="flex items-center justify-between px-3">
              <h1 className="font-bold text-pink-600">Auto Start Long Break</h1>
              <Switch id="auto-start-long-break" />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="bg-pink-300 text-white rounded-lg p-2 hover:cursor-pointer hover:bg-pink-600"
            >
              Save & Exit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

const StyledWrapper = styled.div`
  .check {
    position: relative;
    background: linear-gradient(90deg, #f19af3, #f099b5);
    line-height: 0;
    font-size: 25px;
  }

  .check input[type="checkbox"],
  .check label,
  .check label::before,
  .check label::after {
    appearance: none;
    display: inline-block;
    font-size: inherit;
    border-radius: 1em;
    border: 0;
    transition: 0.35s ease-in-out;
    box-sizing: border-box;
    cursor: pointer;
  }

  .check {
    appearance: none;
    display: inline-block;
    border-radius: 1em;
    border: 0;
    transition: 0.35s ease-in-out;
    box-sizing: border-box;
    cursor: pointer;
  }

  .check label {
    width: 2.2em;
    height: 1em;
    background: #d7d7d7;
    overflow: hidden;
  }

  .check input[type="checkbox"] {
    position: absolute;
    z-index: 1;
    width: 0.8em;
    height: 0.8em;
    top: 0.1em;
    left: 0.1em;
    background: linear-gradient(45deg, #dedede, #ffffff);
    box-shadow: 0 6px 7px rgba(0, 0, 0, 0.3);
    outline: none;
  }

  .check input[type="checkbox"]:checked {
    left: 1.3em;
  }

  .check input[type="checkbox"]:checked + label {
    background: transparent;
  }

  .check label::before,
  .check label::after {
    content: "· ·";
    position: absolute;
    overflow: hidden;
    left: 0.5em;
    top: 0.5em;
    height: 1em;
    letter-spacing: -0.04em;
    color: #9b9b9b;
    font-family: "Times New Roman", serif;
    z-index: 2;
    font-size: 0.6em;
    border-radius: 0;
    transform-origin: 0 0 -0.5em;
    backface-visibility: hidden;
  }

  .check label::after {
    content: "?";
    top: 0.65em;
    left: 0.6em;
    height: 0.1em;
    width: 0.35em;
    font-size: 0.2em;
    transform-origin: 0 0 -0.4em;
  }

  .check input[type="checkbox"]:checked + label::before,
  .check input[type="checkbox"]:checked + label::after {
    left: 2.55em;
    top: 0.4em;
    line-height: 0.1em;
    transform: rotateY(360deg);
  }

  .check input[type="checkbox"]:checked + label::after {
    height: 0.16em;
    top: 0.55em;
    left: 2.6em;
    font-size: 0.6em;
    line-height: 0;
  }
`;

export default Settings;
