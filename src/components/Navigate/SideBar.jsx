import { useRef, useState } from "react"
import {FaHome} from 'react-icons/fa'
import { BsCpuFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const Sidebar = ({sidebarToggle}) => {

  return (
    <div className= {`${sidebarToggle ? "hidden" : "block"} w-64 fixed h-full px-4 py-4`} style={{ backgroundColor: "rgba(4, 35, 84, 1)" }}  >
      <div className="my-2 mb-4">
        <h1 className="text-2x text-white fond-bold">Admin Dashboad</h1>
      </div>
      <hr></hr>
      <ul className="mt-3 text-white font-bold">
        <Link to="Home">
          <li className="mb-2 rounded hover:shadow hover:bg-blue-500 py-2">
            <button className="px-3">
              <FaHome className="inline-block w-6 h-6 mr-2 -mt-2"></FaHome>
              Home
            </button>
          </li>
        </Link>

        <Link to="Recursos">
          <li className="mb-2 rounded hover:shadow hover:bg-blue-500 py-2">
            <button className="px-3">
              <BsCpuFill className="inline-block w-6 h-6 mr-2 -mt-2"></BsCpuFill>
              Recursos
            </button>
          </li>
        </Link>
        <Link to="Historial">
          <li className="mb-2 rounded hover:shadow hover:bg-blue-500 py-2">
            <button className="px-3">
              <BsCpuFill className="inline-block w-6 h-6 mr-2 -mt-2"></BsCpuFill>
              Historial
            </button>
          </li>
        </Link>
        
      </ul>
    </div>
  )
}

export default Sidebar
