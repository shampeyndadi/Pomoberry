import React from "react";
import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    height: 100vh;
    background: linear-gradient(135deg, #ffe8f3, #d9f3ff);
    overflow: hidden;
  }
`;

const Main = () => {
  const encouragementMessage = "Keep going! You're doing great!";
  return (
    <>
      <div>
        <GlobalStyle />
        <Container />
        <div className="flex items-center justify-center h-screen">
          <div className="flex flex-col space-y-3">
            <h2 className="text-2xl text-center font-bold text-pink-600">
              Pomoberry
            </h2>

            <p className="text-center text-gray-600 italic">
              {encouragementMessage}
            </p>

            <div className="flex justify-evenly">
              <button className="text-xl hover:cursor-pointer hover:bg-pink-300 py-3 px-3 rounded-lg">
                Start
              </button>
              <button className="text-xl hover:cursor-pointer hover:bg-pink-300 py-3 px-3 rounded-lg">
                Break
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

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
