import React from 'react'

const Navbar = () => {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-800 text-white">
      <div className="font-bold cursor-pointer">User Management</div>
      <div className="flex space-x-4">
        <button className="hover:text-gray-300 cursor-pointer">Home</button>
        <button className="hover:text-gray-300 cursor-pointer">Users</button>
        <button className="hover:text-gray-300 cursor-pointer">Settings</button>
      </div>
    </div>
  )
}

export default Navbar
