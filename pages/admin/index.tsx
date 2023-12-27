import React from 'react'
import withAuth from '@/components/HigherOrderComponent'
import logout from '@/components/LogOut'
const index = () => {

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <div className="p-6 m-4 text-lg font-bold text-center text-white bg-blue-500 rounded shadow-lg">
      ADMIN DASHBOARD PAGE
    </div>
    <button 
      onClick={logout} 
      className="px-4 py-2 m-4 text-white bg-red-500 rounded shadow-lg hover:bg-red-700"
    >
      Logout
    </button>
  </div>
    
    
  )
}

export default withAuth(index)                     