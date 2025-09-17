import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import CreateAccount from "../services/CreateAccount";
import GetAccount from "../services/GetAccount";
import LoginAccount from "../services/LoginAccount";

const Switch = ({ checked, setChecked }) => {
  return (
    <StyledWrapper>
      <label htmlFor="filter" className="switch" aria-label="Toggle Filter">
        <input
          type="checkbox"
          id="filter"
          checked={checked === "generate"}
          onChange={(e) => setChecked(e.target.checked ? "generate" : "enter")}
        />
        <span>Enter Key</span>
        <span>Generate Key</span>
      </label>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .switch {
    --_switch-bg-clr: #f19af3;
    --_switch-padding: 4px; /* padding around button*/
    --_slider-bg-clr: rgba(236, 72, 153, 0.65); /* slider color unchecked */
    --_slider-bg-clr-on: rgba(236, 72, 153, 1); /* slider color checked */
    --_slider-txt-clr: #ffffff;
    --_label-padding: 1rem 2rem; /* padding around the labels -  this gives the switch it's global width and height */
    --_switch-easing: cubic-bezier(
      0.47,
      1.64,
      0.41,
      0.8
    ); /* easing on toggle switch */
    color: white;
    width: fit-content;
    display: flex;
    justify-content: center;
    position: relative;
    border-radius: 9999px;
    cursor: pointer;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    position: relative;
    isolation: isolate;
  }

  .switch input[type="checkbox"] {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }
  .switch > span {
    display: grid;
    place-content: center;
    transition: opacity 300ms ease-in-out 150ms;
    padding: var(--_label-padding);
  }
  .switch::before,
  .switch::after {
    content: "";
    position: absolute;
    border-radius: inherit;
    transition: inset 150ms ease-in-out;
  }
  /* switch slider */
  .switch::before {
    background-color: var(--_slider-bg-clr);
    inset: var(--_switch-padding) 50% var(--_switch-padding)
      var(--_switch-padding);
    transition: inset 500ms var(--_switch-easing),
      background-color 500ms ease-in-out;
    z-index: -1;
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.3),
      0 1px rgba(255, 255, 255, 0.3);
  }
  /* switch bg color */
  .switch::after {
    background-color: var(--_switch-bg-clr);
    inset: 0;
    z-index: -2;
  }
  /* switch hover & focus */
  .switch:focus-within::after {
    inset: -0.25rem;
  }
  .switch:has(input:checked):hover > span:first-of-type,
  .switch:has(input:not(:checked)):hover > span:last-of-type {
    opacity: 1;
    transition-delay: 0ms;
    transition-duration: 100ms;
  }
  /* switch hover */
  .switch:has(input:checked):hover::before {
    inset: var(--_switch-padding) var(--_switch-padding) var(--_switch-padding)
      45%;
  }
  .switch:has(input:not(:checked)):hover::before {
    inset: var(--_switch-padding) 45% var(--_switch-padding)
      var(--_switch-padding);
  }
  /* checked - move slider to right */
  .switch:has(input:checked)::before {
    background-color: var(--_slider-bg-clr-on);
    inset: var(--_switch-padding) var(--_switch-padding) var(--_switch-padding)
      50%;
  }
  /* checked - set opacity */
  .switch > span:last-of-type,
  .switch > input:checked + span:first-of-type {
    opacity: 0.75;
  }
  .switch > input:checked ~ span:last-of-type {
    opacity: 1;
  }
`;

function KeyModal({ setShowKeyModal, setAccount }) {
  const [checked, setChecked] = useState("enter");
  const [pomokey, setPomokey] = useState("");

  const createAccount = async () => {
    try {
      const response = await CreateAccount.createAccount(pomokey);
      setAccount(response.data);

      localStorage.setItem("pomoKey", pomokey);

      generatePomokey();
      setShowKeyModal(false);
    } catch (err) {
      if (err.response && err.response.status === 500) {
        await fetchAccount();
        setShowKeyModal(false);
      }
    }
  };

  const fetchAccount = async () => {
    try {
      const accountId = await LoginAccount.LoginAccount(pomokey);
      const account = await GetAccount.getAccount(accountId);

      setAccount(account.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const storedKey = localStorage.getItem("pomoKey");
    if (storedKey) {
      setPomokey(storedKey);
    } else {
      generatePomokey();
    }
  }, []);

  function generatePomokey() {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";

    let key = "";

    for (let i = 0; i < 3; i++) {
      key += letters.charAt(Math.floor(Math.random() * letters.length));
    }

    for (let i = 0; i < 3; i++) {
      key += numbers.charAt(Math.floor(Math.random() * numbers.length));
    }

    setPomokey(key);
    localStorage.setItem("pomoKey", key);
  }

  useEffect(() => {
    if (checked === "generate" && !pomokey) {
      generatePomokey();
    }
  }, [checked]);

  function displayView() {
    if (checked === "enter") {
      return (
        <div className="flex flex-col items-center space-y-5">
          <div className="flex items-center justify-between w-[30rem]">
            <div className="h-6 w-6"></div>
            <h1 className="font-bold text-pink-600 text-2xl">
              Enter your PomoKey
            </h1>
            <div
              onClick={() => {
                setShowKeyModal(false);
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

          <div className="flex">
            <input
              type="text"
              onChange={(e) => setPomokey(e.target.value)}
              className="border-2 border-pink-300 rounded-md px-3 py-2 focus:outline-pink-300"
              placeholder="Enter your key here..."
            />
            <button
              onClick={() => {
                createAccount(pomokey);
              }}
              className="bg-pink-300 text-white px-3 py-2 rounded-md ml-3 hover:bg-pink-400"
            >
              Submit
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="flex flex-col items-center justify-center space-y-5">
          <div className="flex items-center justify-between w-[30rem]">
            <div className="flex items-center justify-between w-[30rem]">
              <div className="h-6 w-6"></div>
              <h1 className="font-bold text-pink-600 text-2xl">
                Generate a PomoKey
              </h1>
              <div
                onClick={() => {
                  setShowKeyModal(false);
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
          </div>

          <div className="flex items-center space-x-3">
            <div
              onClick={() => {
                generatePomokey();
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-8 h-8 hover:cursor-pointer hover:text-pink-600"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
            </div>

            <h1 className="font-bold text-3xl">{pomokey}</h1>
            <div
              onClick={() => {
                pomokey && navigator.clipboard.writeText(pomokey);
                alert(`PomoKey ${pomokey} copied to clipboard!`);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-8 h-8 hover:cursor-pointer hover:text-pink-600"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"
                />
              </svg>
            </div>
          </div>
        </div>
      );
    }
  }

  return (
    <>
      <div
        className="fixed top-0 left-0 right-0 bottom-0 w-full h-full z-[9999] bg-red-500/20 flex items-center justify-center"
        style={{ margin: 0, padding: 0 }}
      >
        <div className="bg-white flex flex-col items-center justify-center space-y-8 px-4 py-5 rounded-md border-shadow h-[15rem]">
          {displayView()}
          <Switch checked={checked} setChecked={setChecked} />
        </div>
      </div>
    </>
  );
}

export default KeyModal;
