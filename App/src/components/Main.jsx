import React, { useRef, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import Pomodoro from "./Pomodoro";
import Break from "./Break";
import Settings from "./Settings";

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

  const [pomodoroDuration, setPomodoroDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);

  const [expiryTimestamp, setExpiryTimeStamp] = useState(() => {
    const time = new Date();
    time.setMinutes(time.getMinutes() + pomodoroDuration);
    return time;
  });

  function resetTimer(duration) {
    const time = new Date();
    if (duration === "Pomodoro") {
      time.setMinutes(time.getMinutes() + pomodoroDuration);
    } else {
      time.setMinutes(time.getMinutes() + breakDuration);
    }
    setExpiryTimeStamp(time);
  }

  return (
    <>
      <div>
        <GlobalStyle />
        <Container />
        <div className="flex items-center justify-center h-screen">
          <div className="flex flex-col space-y-5">
            <div className="flex flex-col">
              <h2 className="text-[10rem] text-center font-bold text-pink-600">
                Pomoberry
              </h2>

              <p className="text-center text-gray-600 italic">
                {encouragementMessage}
              </p>
            </div>

            {showSettings && (
              <Settings
                pomodoroDuration={pomodoroDuration}
                setPomodoroDuration={setPomodoroDuration}
                breakDuration={breakDuration}
                setBreakDuration={setBreakDuration}
                onClose={() => {
                  setShowSettings(false);
                  resetTimer(currentState);
                }}
              />
            )}
            {currentState === "Pomodoro" ? (
              <Pomodoro
                key={`pomodoro-${expiryTimestamp}`}
                expiryTimestamp={expiryTimestamp}
                setShowSettings={setShowSettings}
                duration={pomodoroDuration}
              />
            ) : (
              <Break
                key={`break-${expiryTimestamp}`}
                expiryTimestamp={expiryTimestamp}
                setShowSettings={setShowSettings}
                duration={breakDuration}
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

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
