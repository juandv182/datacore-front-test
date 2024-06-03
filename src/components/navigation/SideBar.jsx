import {
  FaHome,
  FaUserShield,
  FaUserSlash,
  FaHistory,
  FaInbox,
  FaCog,
} from "react-icons/fa";
import { BsCpuFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const Sidebar = ({ sidebarToggle }) => {
  return (
    <div
      className={`${
        sidebarToggle ? "hidden" : "block"
      } w-64 fixed h-full px-4 py-4`}
      style={{ backgroundColor: "rgba(4, 35, 84, 1)" }}
    >
      <div className="my-2 mb-4">
        <h1 className="text-xl text-white font-bold">Admin Dashboard</h1>
      </div>
      <hr></hr>
      <ul className="mt-3 text-white font-semibold">
        <Link to="home">
          <li className="mb-2 rounded hover:shadow hover:bg-blue-500 py-2">
            <button className="px-3 text-sm">
              <FaHome className="inline-block w-6 h-5 mr-3 -mt-2"></FaHome>
              Home
            </button>
          </li>
        </Link>
        <Link to="usuarios-autorizados">
          <li className="mb-2 rounded hover:shadow hover:bg-blue-500 py-2">
            <button className="px-3 text-sm">
              <FaUserShield className="inline-block w-6 h-5 mr-3 -mt-2"></FaUserShield>
              Usuarios autorizados
            </button>
          </li>
        </Link>
        <Link to="usuarios-no-autorizados">
          <li className="mb-2 rounded hover:shadow hover:bg-blue-500 py-2">
            <button className="px-3 text-sm">
              <FaUserSlash className="inline-block w-6 h-5 mr-3 -mt-2"></FaUserSlash>
              Usuarios no autorizados
            </button>
          </li>
        </Link>
        <Link to="historial">
          <li className="mb-2 rounded hover:shadow hover:bg-blue-500 py-2">
            <button className="px-3 text-sm">
              <FaHistory className="inline-block w-6 h-5 mr-3 -mt-2"></FaHistory>
              Historial
            </button>
          </li>
        </Link>
        <Link to="recursos">
          <li className="mb-2 rounded hover:shadow hover:bg-blue-500 py-2">
            <button className="px-3 text-sm">
              <BsCpuFill className="inline-block w-6 h-5 mr-3 -mt-2"></BsCpuFill>
              Recursos
            </button>
          </li>
        </Link>
        <Link to="solicitudes">
          <li className="mb-2 rounded hover:shadow hover:bg-blue-500 py-2">
            <button className="px-3 text-sm">
              <FaInbox className="inline-block w-6 h-6 mr-3 -mt-2"></FaInbox>
              Solicitudes
            </button>
          </li>
        </Link>
        <Link to="ajustes">
          <li className="mb-2 rounded hover:shadow hover:bg-blue-500 py-2">
            <button className="px-3 text-sm">
              <FaCog className="inline-block w-6 h-6 mr-3 -mt-2"></FaCog>
              Ajustes
            </button>
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default Sidebar;
