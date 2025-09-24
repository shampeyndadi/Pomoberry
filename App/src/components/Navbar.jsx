function Navbar({ showTodolist, setShowTodoList }) {
  return (
    <>
      <div className="w-full flex items-center justify-center px-4 sm:px-6 py-4 sm:py-6 shadow-md">
        <div className="flex items-center justify-between w-full max-w-7xl">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-pink-600">
            Pomoberry
          </h1>

          <button
            onClick={() => {
              setShowTodoList(!showTodolist);
            }}
            className="bg-pink-400 px-3 py-2 sm:px-4 sm:py-3 
            rounded-lg text-white font-medium 
            shadow-lg hover:cursor-pointer hover:shadow-pink-600 hover:transition-shadow
"
          >
            To Do list
          </button>
        </div>
      </div>
    </>
  );
}

export default Navbar;
