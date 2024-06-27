import {
  FaHome,
  FaUserShield,
  FaUserSlash,
  FaHistory,
  FaInbox,
  FaCog,
  FaRegUserCircle,
} from "react-icons/fa";
import { BsCpuFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { navbarHeight } from "./NavBar";

const sidebarButtonStyles = {
  width: "100%",
  borderRadius: "0px",
  paddingTop: "0.75rem",
  paddingBottom: "0.75rem",
};

const adminModules = [
  {
    name: "Usuarios autorizados",
    path: "/usuarios-autorizados",
    icon: <FaUserShield />,
  },
  {
    name: "Usuarios desautorizados",
    path: "/usuarios-desautorizados",
    icon: <FaUserSlash />,
  },
  {
    name: "Historial",
    path: "/historial",
    icon: <FaHistory />,
  },
  {
    name: "Recursos",
    path: "/recursos",
    icon: <BsCpuFill />,
  },
  {
    name: "Ajustes",
    path: "/ajustes",
    icon: <FaCog />,
  },
];

const userModules = [
  {
    name: "Home",
    path: "/home",
    icon: <FaHome />,
  },
  {
    name: "Solicitudes",
    path: "/solicitudes",
    icon: <FaInbox />,
  },
];

function Sidebar({ sidebarToggle }) {
  const theme = useTheme();
  const isAdmin = localStorage.getItem("is_admin") === "true";
  const modules = isAdmin ? adminModules : userModules;

  return (
    <div
      className={`${
        sidebarToggle ? "hidden" : "block"
      } w-64 fixed h-full flex flex-col bg-white z-10`}
    >
      {/* Información del usuario */}
      <div
        className="flex flex-col flex-none items-center justify-center px-4 py-2 h-full"
        style={{ height: navbarHeight }}
      >
        <FaRegUserCircle
          size={40}
          className="text-gray-800"
          style={{ color: theme.palette.primary.main }}
        ></FaRegUserCircle>

        <p
          className="text-gray-800 font-semibold"
          style={{ color: theme.palette.primary.main }}
        >
          {localStorage.getItem("first_name") +
            " " +
            localStorage.getItem("last_name")}
        </p>

        <p className="text-gray-400">
          {isAdmin ? "(Administrador)" : "(Usuario)"}
        </p>
      </div>

      {/* Módulos */}
      <div className="flex flex-col grow gap-3">
        {modules.map((module, index) => (
          <Button
            key={index}
            component={Link}
            to={module.path}
            variant="contained"
            disableElevation
            size="small"
            startIcon={module.icon}
            sx={sidebarButtonStyles}
          >
            {module.name}
          </Button>
        ))}
      </div>

      {/* Logo */}
      <div className="py-4 flex justify-center items-center">
        <img
          src="/src/assets/pucp_logo.png"
          alt="PUCP"
          style={{ maxWidth: "180px", height: "auto" }}
        />
      </div>
    </div>
  );
}

export default Sidebar;
