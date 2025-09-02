import React, { useEffect, useState } from "react";
import Koala from "./Koala";

function Todolist({ showTodoList, setShowTodoList }) {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [taskPriority, setTaskPriority] = useState("urgent");

  const [highlight, setHighlight] = useState("all");

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    } else {
      localStorage.removeItem("tasks");
    }
  }, [tasks]);

  function addTask() {
    if (taskName.trim() !== "") {
      const newTask = {
        id: Date.now(),
        name: taskName,
        priority: taskPriority,
      };
      setTasks((prevTasks) => [...prevTasks, newTask]);
      setTaskName("");
      setTaskPriority("urgent");
    }
  }

  function deleteTask(id) {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  }

  function displayTasks() {
    const filteredTasks = tasks.filter((task) => {
      if (highlight == "all") {
        return true;
      }

      return task.priority === highlight;
    });
    if (tasks.length === 0) {
      return (
        <div className="flex items-center justify-center h-[38rem] relative z-0">
          <Koala />
        </div>
      );
    } else {
      return (
        <div className="h-[38rem] overflow-y-auto space-y-3">
          <div className="flex flex-col space-y-4">
            <h2 className="font-bold text-lg text-pink-400">Filter:</h2>
            <div className="flex space-x-5">
              <button
                onClick={() => setHighlight("all")}
                className={`hover:bg-gray-200 px-3 py-1 rounded-lg ${
                  highlight === "all" ? "bg-gray-200 px-3 py-1 rounded-lg" : ""
                }`}
              >
                All
              </button>
              <button
                onClick={() => setHighlight("urgent")}
                className={`hover:bg-gray-200 px-3 py-1 rounded-lg ${
                  highlight === "urgent"
                    ? "bg-gray-200 px-3 py-1 rounded-lg"
                    : ""
                }`}
              >
                Urgent
              </button>
              <button
                onClick={() => setHighlight("priority")}
                className={`hover:bg-gray-200 px-3 py-1 rounded-lg ${
                  highlight === "priority"
                    ? "bg-gray-200 px-3 py-1 rounded-lg"
                    : ""
                }`}
              >
                Priority
              </button>
              <button
                onClick={() => setHighlight("low-priority")}
                className={`hover:bg-gray-200 px-3 py-1 rounded-lg ${
                  highlight === "low-priority"
                    ? "bg-gray-200 px-3 py-1 rounded-lg"
                    : ""
                }`}
              >
                Low Priority
              </button>
            </div>
            <hr></hr>
          </div>
          {filteredTasks.map((task) => (
            <div
              key={task.id}
              className={`flex justify-between items-center border-l-4 pl-3 py-2 px-3 ${
                task.priority === "urgent"
                  ? "border-red-500 bg-red-50"
                  : task.priority === "priority"
                  ? "border-yellow-500 bg-yellow-50"
                  : "border-green-500 bg-green-50"
              }`}
            >
              <span className="font-medium">{task.name}</span>
              <div className="flex items-center space-x-3">
                <span
                  className={`text-sm px-2 py-2 rounded-full ${
                    task.priority === "urgent"
                      ? "bg-red-200 text-red-800 px-3"
                      : task.priority === "priority"
                      ? "bg-yellow-200 text-yellow-800 px-3"
                      : "bg-green-200 text-green-800 px-3"
                  }`}
                >
                  {task.priority.replace("-", " ")}
                </span>
                <div onClick={() => deleteTask(task.id)}>
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
          ))}
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
        <div className="bg-white p-5 rounded-lg shadow-lg space-y-3 h-[50rem] w-[50rem]">
          <div className="flex flex-col space-y-3 py-2 px-3">
            <div className="flex flex-col space-y-3">
              <div className="flex justify-between">
                <h1 className="font-bold text-2xl text-pink-400">Tasks</h1>

                <div
                  onClick={() => {
                    setShowTodoList(!showTodoList);
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

              <hr></hr>
              <div className="flex space-x-5 z-10">
                <input
                  value={taskName}
                  onChange={(e) => setTaskName(e.target.value)}
                  type="text"
                  className="border-b-2 border-gray-200 w-full focus:outline-none focus:border-pink-400 hover:cursor-pointer"
                  placeholder="Task Name"
                />
                <select
                  value={taskPriority}
                  onChange={(e) => setTaskPriority(e.target.value)}
                  className="border rounded-lg px-3 py-2 hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-pink-400"
                >
                  <option value="urgent">Urgent</option>
                  <option value="priority">Priority</option>
                  <option value="low-priority">Low-Priority</option>
                </select>
                <button
                  onClick={addTask}
                  className="bg-pink-400 px-5 py-3 w-[5rem] rounded-lg text-white hover:cursor-pointer hover:shadow-md"
                >
                  Add
                </button>
              </div>

              {displayTasks()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Todolist;
