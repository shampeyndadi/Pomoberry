import React, { useRef, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import Pomodoro from "./Pomodoro";
import Break from "./Break";
import Settings from "./Settings";
import LongBreak from "./LongBreak";
import Navbar from "./Navbar";
import Todolist from "./Todolist";
import KeyModal from "./KeyModal";
import Messages from "./Messages";
import LogoutAccount from "../services/LogoutAccount";

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
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showMessagesModal, setShowMessagesModal] = useState(false);

  const [account, setAccount] = useState(null);

  const [pomodoroDuration, setPomodoroDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);
  const [longBreakDuration, setLongBreakDuration] = useState(15);

  const [autoStartPomodoro, setAutoStartPomodoro] = useState(true);
  const [autoStartBreak, setAutoStartBreak] = useState(true);
  const [autoStartLongBreak, setAutoStartLongBreak] = useState(true);

  const logout = async () => {
    try {
      const response = await LogoutAccount.logoutAccount();
      console.log("Logout response:", response);
      setAccount(null);
      setShowConfirmationModal(false);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

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

  function confirmationModal() {
    return (
      <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-full z-[9999] bg-red-500/20 flex items-center justify-center">
        <div className="bg-white py-5 px-5 rounded-lg shadow">
          <div className="flex flex-col items-center space-y-7 px-5 py-5">
            <h1 className="font-bold text-center text-xl text-pink-600">
              Are you sure you want to go back to guest view?
            </h1>

            <div className="flex space-x-3">
              <button
                onClick={() => {
                  logout();
                }}
                className="bg-green-300 px-3 py-3 font-bold text-lg rounded-lg hover:bg-green-500"
              >
                Yes
              </button>
              <button
                onClick={() => {
                  setShowConfirmationModal(false);
                }}
                className="bg-red-300 px-3 py-3 font-bold text-lg rounded-lg hover:bg-red-500"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
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
              {account ? (
                <div
                  onClick={() => {
                    setShowMessagesModal(true);
                  }}
                >
                  <h2 className="text-[10rem] text-center font-bold text-pink-600 hover: cursor-pointer">
                    Pomoberry
                  </h2>
                </div>
              ) : (
                <h2 className="text-[10rem] text-center font-bold text-pink-600">
                  Pomoberry
                </h2>
              )}
            </div>

            {showTodolist && (
              <Todolist
                showTodoList={showTodolist}
                setShowTodoList={setShowTodoList}
              />
            )}

            {showKeyModal && (
              <KeyModal
                setShowKeyModal={setShowKeyModal}
                setAccount={setAccount}
              />
            )}

            {showMessagesModal && (
              <Messages
                setShowMessagesModal={setShowMessagesModal}
                account={account}
              />
            )}

            {showConfirmationModal && confirmationModal()}

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
                setAccount={setAccount}
                account={account}
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
                account={account}
              />
            ) : currentState === "Break" ? (
              <Break
                key={`break-${expiryTimestamp}`}
                expiryTimestamp={expiryTimestamp}
                setShowSettings={setShowSettings}
                autoStartBreak={autoStartBreak}
                duration={breakDuration}
                account={account}
              />
            ) : (
              <LongBreak
                key={`longbreak-${expiryTimestamp}`}
                expiryTimestamp={expiryTimestamp}
                setShowSettings={setShowSettings}
                autoStartLongBreak={autoStartLongBreak}
                duration={longBreakDuration}
                account={account}
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

        <div className="flex mt-4 px-6">
          {!account ? (
            <div
              className="border rounded-lg px-3 py-4 text-black border-black hover:cursor-pointer hover:border-pink-600 hover:text-pink-600"
              onClick={() => {
                setShowKeyModal(true);
              }}
            >
              Guest
            </div>
          ) : (
            <div
              className="flex flex-col items-center rounded-lg px-3 py-4 text-pink-400 text-3xl font-bold hover:cursor-pointer hover:border-pink-600 hover:text-pink-600"
              onClick={() => {
                setShowConfirmationModal(true);
              }}
            >
              {account.pomokey}
            </div>
          )}
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
