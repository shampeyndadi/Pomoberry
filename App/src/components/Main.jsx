import React, { useRef, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import Pomodoro from "./Pomodoro";
import Break from "./Break";
import Settings from "./Settings";
import LongBreak from "./LongBreak";
import Navbar from "./Navbar";
import Todolist from "./Todolist";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    height: 100vh;
    background: linear-gradient(135deg, #ffe8f3, #d9f3ff);
    overflow: hidden;
  }
`;

function Main() {
  const encouragementMessage = "Keep going! You're doing great!";

  const [currentState, newState] = useState("Pomodoro");
  const [highlight, setHighlight] = useState("start");

  const [showSettings, setShowSettings] = useState(false);
  const [showTodolist, setShowTodoList] = useState(false);

  const [pomodoroDuration, setPomodoroDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);
  const [longBreakDuration, setLongBreakDuration] = useState(15);

  const [autoStartPomodoro, setAutoStartPomodoro] = useState(true);
  const [autoStartBreak, setAutoStartBreak] = useState(true);
  const [autoStartLongBreak, setAutoStartLongBreak] = useState(true);

  const [expiryTimestamp, setExpiryTimeStamp] = useState(() => {
    const time = new Date();
    time.setMinutes(time.getMinutes() + pomodoroDuration);
    return time;
  });

  function resetTimer(duration) {
    const time = new Date();
    if (duration === "Pomodoro") {
      time.setMinutes(time.getMinutes() + pomodoroDuration);
    } else if (duration === "Break") {
      time.setMinutes(time.getMinutes() + breakDuration);
    } else if (duration === "LongBreak") {
      time.setMinutes(time.getMinutes() + longBreakDuration);
    }
    setExpiryTimeStamp(time);
  }

  return (
    <>
      <div>
        <GlobalStyle />
        <Container />
        <Navbar showTodoList={showTodolist} setShowTodoList={setShowTodoList} />

        <div className="flex items-center justify-center h-[47rem]">
          <div className="flex flex-col space-y-5">
            <div className="flex flex-col">
              <h2 className="text-[10rem] text-center font-bold text-pink-600">
                Pomoberry
              </h2>
            </div>

            {showTodolist && (
              <Todolist
                showTodoList={showTodolist}
                setShowTodoList={setShowTodoList}
              />
            )}

            {showSettings && (
              <Settings
                pomodoroDuration={pomodoroDuration}
                setPomodoroDuration={setPomodoroDuration}
                breakDuration={breakDuration}
                setBreakDuration={setBreakDuration}
                longBreakDuration={longBreakDuration}
                setLongBreakDuration={setLongBreakDuration}
                setAutoStartPomodoro={setAutoStartPomodoro}
                setAutoStartBreak={setAutoStartBreak}
                setAutoStartLongBreak={setAutoStartLongBreak}
                autoStartPomodoro={autoStartPomodoro}
                autoStartBreak={autoStartBreak}
                autoStartLongBreak={autoStartLongBreak}
                onClose={() => {
                  setShowSettings(false);
                  resetTimer(currentState);
                }}
                onExit={() => {
                  setShowSettings(false);
                }}
              />
            )}

            {currentState === "Pomodoro" ? (
              <Pomodoro
                key={`pomodoro-${expiryTimestamp}`}
                expiryTimestamp={expiryTimestamp}
                setShowSettings={setShowSettings}
                autoStartPomodoro={autoStartPomodoro}
                duration={pomodoroDuration}
              />
            ) : currentState === "Break" ? (
              <Break
                key={`break-${expiryTimestamp}`}
                expiryTimestamp={expiryTimestamp}
                setShowSettings={setShowSettings}
                autoStartBreak={autoStartBreak}
                duration={breakDuration}
              />
            ) : (
              <LongBreak
                key={`longbreak-${expiryTimestamp}`}
                expiryTimestamp={expiryTimestamp}
                setShowSettings={setShowSettings}
                autoStartLongBreak={autoStartLongBreak}
                duration={longBreakDuration}
              />
            )}

            <div className="flex justify-evenly">
              <button
                onClick={() => {
                  newState("Pomodoro");
                  setHighlight("start");
                  resetTimer("Pomodoro");
                }}
                className={`text-xl italic hover:cursor-pointer hover:bg-pink-300 py-3 px-3 rounded-lg ${
                  highlight === "start" ? "bg-pink-300" : "bg-transparent"
                }`}
              >
                Pomodoro
              </button>
              <button
                onClick={() => {
                  newState("Break");
                  setHighlight("break");
                  resetTimer("Break");
                }}
                className={`text-xl italic hover:cursor-pointer hover:bg-pink-300 py-3 px-3 rounded-lg ${
                  highlight === "break" ? "bg-pink-300" : "bg-transparent"
                }`}
              >
                Break
              </button>
              <button
                onClick={() => {
                  newState("LongBreak");
                  setHighlight("long-break");
                  resetTimer("LongBreak");
                }}
                className={`text-xl italic hover:cursor-pointer hover:bg-pink-300 py-3 px-3 rounded-lg ${
                  highlight === "long-break" ? "bg-pink-300" : "bg-transparent"
                }`}
              >
                Long Break
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const StyledWrapper = styled.div`
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px 22px 20px 22px;
    box-shadow: rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
    background-color: #e8e8e8;
    border-color: #ffe2e2;
    border-style: solid;
    border-width: 9px;
    border-radius: 35px;
    transition: transform 400ms cubic-bezier(0.68, -0.55, 0.27, 2.5),
      border-color 400ms ease-in-out, background-color 400ms ease-in-out;
    word-spacing: -2px;
  }

  @keyframes movingBorders {
    0% {
      border-color: #fce4e4;
    }

    50% {
      border-color: #ffd8d8;
    }

    90% {
      border-color: #fce4e4;
    }
  }

  button:hover {
    background-color: #eee;
    transform: scale(105%);
    animation: movingBorders 3s infinite;
  }

  button svg {
    fill: rgb(255, 110, 110);
  }

  @keyframes beatingHeart {
    0% {
      transform: scale(1);
    }

    15% {
      transform: scale(1.15);
    }

    30% {
      transform: scale(1);
    }

    45% {
      transform: scale(1.15);
    }

    60% {
      transform: scale(1);
    }
  }

  button:hover svg {
    transform: scale(105%);
    border-color: #ffd8d8;
    animation: beatingHeart 1.2s infinite;
  }
`;

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.2),
    rgba(0, 0, 0, 0.1)
  );

  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 200%;
    height: 200%;
    background: conic-gradient(
      from 0deg,
      #ff9aa2,
      #ffb7b2,
      #ffdac1,
      #e2f0cb,
      #a2e4ff,
      #c9afff,
      #ffb7b2,
      #ff9aa2
    );
    transform: translate(-50%, -50%);
    animation: rotate 8s linear infinite;
    filter: blur(50px);
    opacity: 0.8;
  }

  &::after {
    width: 180%;
    height: 180%;
    animation: rotate-reverse 10s linear infinite;
    opacity: 0.6;
  }

  @keyframes rotate {
    from {
      transform: translate(-50%, -50%) rotate(0deg);
    }
    to {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }

  @keyframes rotate-reverse {
    from {
      transform: translate(-50%, -50%) rotate(0deg);
    }
    to {
      transform: translate(-50%, -50%) rotate(-360deg);
    }
  }
`;

export default Main;
