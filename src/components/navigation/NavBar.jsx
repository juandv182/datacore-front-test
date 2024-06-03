import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../auth/context/AuthContext.jsx";
import { useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";

function Navbar({ sidebarToggle, setSidebarToggle }) {
  const theme = useTheme();
  const { handlerLogout } = useContext(AuthContext);

  return (
    <div className={`${sidebarToggle ? "" : "ml-64"} w-full`}>
      <nav
        className="px-6 py-6 flex justify-between"
        style={{ backgroundColor: theme.palette.primary.main }}
      >
        <div className="flex flex-row items-center">
          <IconButton onClick={() => setSidebarToggle(!sidebarToggle)}>
            <MenuIcon
              sx={{
                color: "white",
                fontSize: "1.75rem",
              }}
            />
          </IconButton>
          
          <Link to="/">
          <div className="d-flex justify-content-start align-items-center">
            <img
              src="/src/assets/Logo_PUCP.png"
              alt="DataCore"
              style={{ height: "2.5rem", marginLeft: "1.75rem" }}
            />
            <h1 className="text-white" style={{
              fontFamily: "Montserrat",fontSize: "1.5rem"
            }}>DataCore</h1>
            </div>
          </Link>
          
        </div>
        <div className="flex items-center">
          <IconButton onClick={handlerLogout}>
            <LogoutIcon
              sx={{
                color: "white",
                fontSize: "1.75rem",
              }}
            />
          </IconButton>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
