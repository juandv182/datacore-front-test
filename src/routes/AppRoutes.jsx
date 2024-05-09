import { Navigate, Route, Routes } from "react-router-dom"

import { useContext, useState } from "react"
import Navbar from "../components/Navigate/NavBar"
import Home from "../pages/Home"
import Recursos from "../pages/Recursos"
import Historial from "../pages/Historial"
import Sidebar from "../components/Navigate/SideBar"

export const AppRoutes = () => {
    const [sidebarToggle, setSidebarToggle] = useState(false);
    return (
        <>
            <div className="flex">
          
            <Sidebar sidebarToggle={sidebarToggle} />
            <Navbar sidebarToggle={sidebarToggle} setSidebarToggle={setSidebarToggle} />
            </div>
            <div className={`${sidebarToggle ? "" : "ml-64"}`}>

          <Routes>
  
              <Route path="/" element={<Navigate to="/Home" />} />
              <Route path="/Home" element={<Home />} />
              <Route path="/Recursos" element={<Recursos />} />
              <Route path="/Historial" element={<Historial />} />

        </Routes>
        </div>

    <Routes/>

           
    

            
        </>
    )
}