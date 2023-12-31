'use client'
import withAuth from '@/components/HigherOrderComponent';
import logout from '@/components/LogOut'


const DashboardPage = () => {

  return (
     <div className="">
       {/* <div className="p-5 bg-white rounded shadow-sm w-64 md:w-64 h-full overflow-auto"> 
        <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>
        <nav className="mt-5 space-y-2">
          <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-500 hover:text-white">
            Home
          </a>
          <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-500 hover:text-white">
            Profile
          </a>
          <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-500 hover:text-white">
            Settings
          </a>
          <a onClick={logout} href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-500 hover:text-white">
            Logout
          </a>
        </nav>
      </div> 
      <div className="flex-1 p-10 text-2xl font-bold">
       
       <span> Content goes here...</span>
    
      </div> */}
    </div>
  );
};

export default withAuth(DashboardPage);