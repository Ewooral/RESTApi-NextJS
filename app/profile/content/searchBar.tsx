import React from 'react'

const SearchBar = () => {
  return (
    <>
    {/* Search Bar */}
    <div className="flex mt-[-2rem] justify-evenly items-center fixed z-10 h-16 w-full
     bg-white border-b  border-gray-200">
      <h1 className="px-4">pu-smas</h1>
      <h1>  <input
      type="text"
      placeholder="Search"
      className="h-8 w-1/2 rounded-lg border border-gray-200 px-4"
    />
    <button className=" h-8 w-20 ml-4 bg-blue-500 text-white rounded-lg">
      Search
    </button></h1>
</div>
    
    </>
  )
}

export default SearchBar