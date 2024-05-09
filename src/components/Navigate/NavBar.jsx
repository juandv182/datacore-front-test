import React from 'react'
import {FaBars} from 'react-icons/fa'
import { LuLogOut } from "react-icons/lu";

function Navbar ({sidebarToggle,setSidebarToggle}) {
  return (
    <div className={`${sidebarToggle ? "" : "ml-64"} w-full`}>
      <nav className='px-4 py-4 flex justify-between' style={{ backgroundColor: "rgba(4, 35, 84, 1)" }}>
        <div className='flex items-center text-xl'>
          <FaBars className='text-white me-4 cursor-pointer' 
            onClick={()=> setSidebarToggle(!sidebarToggle)}/>
          <span className='text-white'>DataCore</span>
        </div>
        <div className='relative'>
          <button className='text-white'>
            <LuLogOut className='w-6 h-6 mt-1'/>
          </button>
        </div>
         
      </nav>
    </div>
    
  )
}

export default Navbar