import React, { useState, useEffect } from "react";
import Dog from "./Dog";
import CreateNote from "../Services/CreateNote";
import DeleteNote from "../services/DeleteNote";

function Messages({ setShowMessagesModal, account, setAccount }) {
  const [message, setMessage] = useState("");
  const [notes, setNotes] = useState(account?.notes ?? []);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [noteID, setNoteID] = useState(null);
  const MAX_CHARS = 30;

  const handleChange = (e) => {
    const value = e.target.value;
    if (value.length > MAX_CHARS) {
      setMessage(value.slice(0, MAX_CHARS));
    } else {
      setMessage(value);
    }
  };

  useEffect(() => {
    setNotes(account?.notes ?? []);
  }, [account]);

  const charCount = message.length;

  const uploadNote = async (message) => {
    try {
      const response = await CreateNote.createNote(account._id, message);

      if (response.data.notes) {
        setNotes(response.data.notes);
        setAccount((prev) => ({ ...prev, notes: response.data.notes }));
      } else {
        setNotes((prev) => [...prev, response.data]);
        setAccount((prev) => ({ ...prev, notes: response.data.notes }));
      }

      setMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  const deleteNote = async (noteId) => {
    try {
      const response = await DeleteNote.deleteNote(account._id, noteId);
      setNotes(response.data.notes);
      setAccount((prev) => ({ ...prev, notes: response.data.notes }));
    } catch (error) {
      console.log(error);
    }
  };

  function confirmationModal() {
    if (showConfirmationModal === true) {
      return (
        <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-full z-[9999] bg-red-500/20 flex items-center justify-center">
          <div className="bg-white py-5 px-5 rounded-lg shadow">
            <div className="flex flex-col items-center space-y-7 px-5 py-5">
              <h1 className="font-bold text-center text-xl text-pink-600">
                Are you sure you want to delete this message?
              </h1>

              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    deleteNote(noteID);
                    setShowConfirmationModal(false);
                  }}
                  className="bg-green-300 px-3 py-3 font-bold text-lg rounded-lg hover:bg-green-500"
                >
                  Delete
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
  }

  function display() {
    if (notes.length === 0) {
      return (
        <div className="flex items-center justify-center w-full py-4">
          <Dog />
        </div>
      );
    } else {
      return (
        <div className="flex-1 mt-4 px-5 overflow-y-auto space-y-3 border-t pt-3 h-[27rem]">
          {notes.map((note) => (
            <div
              key={note._id}
              className="w-full border rounded-lg py-2 px-2 bg-pink-300 text-white font-bold flex justify-between items-center"
            >
              <span>{note.content}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 hover:cursor-pointer"
                onClick={() => {
                  setNoteID(note._id);
                  setShowConfirmationModal(true);
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </div>
          ))}
        </div>
      );
    }
  }

  return (
    <div
      className="fixed top-0 left-0 right-0 bottom-0 w-full h-full z-[9999] bg-red-500/20 flex items-center justify-center"
      style={{ margin: 0, padding: 0 }}
    >
      <div className="bg-white w-[33rem] sm:w-[35rem] md:w-[38rem] lg:w-[43rem] h-[43rem] overflow-auto py-3">
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

          {confirmationModal()}

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
              <button
                onClick={() => {
                  uploadNote(message);
                }}
                className="px-3 py-1 bg-pink-400 text-white rounded-lg"
              >
                Add message
              </button>
            </div>
          </div>
        </div>
        {display()}
      </div>
    </div>
  );
}

export default Messages;
