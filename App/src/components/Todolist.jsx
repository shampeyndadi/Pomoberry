import React from 'react';
import Koala from './Koala'

function Todolist(){
    return (
    <>
        <div className="fixed inset-0 z-50 bg-red-500/20 flex items-center justify-center">
            <div className="bg-white p-5 rounded-lg shadow-lg space-y-3 h-[50rem]">
                <div className="flex flex-col space-y-3 py-2 px-3">
                    <div className="flex flex-col space-y-3">
                        <h1 className="font-bold text-2xl text-pink-400">Tasks</h1>
                        <hr></hr>
                        <div className="flex space-x-5">
                            <input type="text" className="border-b-2 border-gray-200 w-full focus:outline-none focus:border-pink-400" placeholder="Add Task"/>
                            <button className="bg-pink-400 px-5 py-3 w-[5rem] rounded-lg text-white hover:cursor-pointer">Add</button>
                        </div>

                        <div className="flex items-center justify-center border overflow-visible h-[40rem]">
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