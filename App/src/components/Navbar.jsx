import React from 'react';

function Navbar({showTodolist, setShowTodoList}){
    return(
        <>
        <div className="w-full flex items-center justify-center px-6 py-8 rounded-b-full shadow-md">
          <div className="flex items-center justify-between w-[80rem]">
            <h1 className="text-4xl font-bold text-pink-600 ">Pomoberry</h1>
            
            <button onClick={() => {
                setShowTodoList(!showTodolist);
            }} className="border-black bg-pink-400 px-3 py-3 rounded-lg text-white shadow-lg hover:cursor-pointer hover:shadow-pink-600 hover:transition-shadow">To Do list</button>
            
          </div>
        </div>
        </>
    )
}

export default Navbar;