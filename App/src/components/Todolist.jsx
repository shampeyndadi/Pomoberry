import React, { useState } from 'react';
import Koala from './Koala'

function Todolist({showTodoList, setShowTodoList}){
    const [tasks, setTasks] = useState([]);
    const [taskName, setTaskName] = useState("");
    const [taskPriority, setTaskPriority] = useState("urgent");

    function addTask() {
        if (taskName.trim() !== ""){
            const newTask = {name: taskName, priority: taskPriority};
            setTasks([...tasks, newTask]);
            setTaskName("");
            setTaskPriority("urgent");
        }
    }

    function displayTasks() {
        if (tasks.length === 0) {
            return (
                <div className="flex items-center justify-center h-[38rem] relative z-0">
                    <Koala/>
                </div>
            )
        }else{
            return (
                <div className="h-[38rem] overflow-y-auto space-y-3">
                    {tasks.map((task, index) => (
                        <div key={index} className={`flex justify-between items-center border-l-4 pl-3 py-2 px-3 ${task.priority === "urgent" ? "border-red-500 bg-red-50" : task.priority === "priority" ? "border-yellow-500 bg-yellow-50" : "border-green-500 bg-green-50"}`}>
                            <span className="font-medium">{task.name}</span>
                            <div className="flex items-center space-x-3">
                                <span className={`text-sm px-2 py-2 rounded-full ${task.priority === "urgent" ? "bg-red-200 text-red-800 px-3" : task.priority === "priority" ? "bg-yellow-200 text-yellow-800" : "bg-green-200 text-green-800"}`}>{task.priority.replace("-", " ")}</span>
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
                    ))}
                </div>
            )
        }
    }

    return (
    <>
        <div className="fixed inset-0 z-50 bg-red-500/20 flex items-center justify-center">
            <div className="bg-white p-5 rounded-lg shadow-lg space-y-3 h-[50rem] w-[50rem]">
                <div className="flex flex-col space-y-3 py-2 px-3">
                    <div className="flex flex-col space-y-3">
                        <div className="flex justify-between">
                            <h1 className="font-bold text-2xl text-pink-400">Tasks</h1>

                            <div onClick={() => {
                                setShowTodoList(!showTodoList);
                            }}>
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
                            <input value={taskName} onChange={(e) => setTaskName(e.target.value)} type="text" className="border-b-2 border-gray-200 w-full focus:outline-none focus:border-pink-400 hover:cursor-pointer" placeholder="Task Name"/>
                            <select value={taskPriority} onChange={(e) => setTaskPriority(e.target.value)} className="border rounded-lg px-3 py-2 hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-pink-400">
                                <option value="urgent">Urgent</option>
                                <option value="priority">Priority</option>
                                <option value="low-priority">Low-Priority</option>
                            </select>
                            <button onClick={addTask} className="bg-pink-400 px-5 py-3 w-[5rem] rounded-lg text-white hover:cursor-pointer hover:shadow-md">Add</button>
                        </div>

                        {displayTasks()}

                    </div>                
                </div>
            </div>
        </div>
    </>
    )
}

export default Todolist;