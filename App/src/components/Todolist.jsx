import React from 'react';
import Koala from './Koala'

function Todolist({showTodoList, setShowTodoList}){
    return (
    <>
        <div className="fixed inset-0 z-50 bg-red-500/20 flex items-center justify-center">
            <div className="bg-white p-5 rounded-lg shadow-lg space-y-3 h-[50rem]">
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
                            <input type="text" className="border-b-2 border-gray-200 w-full focus:outline-none focus:border-pink-400 hover:cursor-pointer" placeholder="Task Name"/>
                            <select className="border rounded-lg px-3 py-2 hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-pink-400">
                                <option value="urgent">Urgent</option>
                                <option value="priority">Priority</option>
                                <option value="low-priority">Low-Priority</option>
                            </select>
                            <button className="bg-pink-400 px-5 py-3 w-[5rem] rounded-lg text-white hover:cursor-pointer hover:shadow-md">Add</button>
                        </div>
                        
                        <div className="flex items-center justify-center h-[38rem] relative z-0">
                            <Koala/>
                        </div>
                        
                    </div>                
                </div>
            </div>
        </div>
    </>
    )
}

export default Todolist;