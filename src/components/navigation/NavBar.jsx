import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../auth/context/AuthContext.jsx";
import { useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import HelpIcon from "@mui/icons-material/Help";

const iconStyles = { color: "white", fontSize: "1.75rem" };
export const navbarHeight = "110px";

function Navbar({ sidebarToggle, setSidebarToggle }) {
  const theme = useTheme();
  const { handlerLogout } = useContext(AuthContext);

  return (
    <div
      className={`fixed top-0 right-0 z-10 transition-all duration-300`}
      style={{
        width: sidebarToggle ? "100%" : "calc(100% - 16rem)",
      }}
    >
      <nav
        className="p-6 flex justify-between"
        style={{
          backgroundColor: theme.palette.primary.main,
          height: navbarHeight,
        }}
      >
        {/* Menú y logo */}
        <div className="flex items-center gap-7">
          <IconButton onClick={() => setSidebarToggle(!sidebarToggle)}>
            <MenuIcon sx={iconStyles} />
          </IconButton>

          <Link to="/">
            <img
              src="/src/assets/datacore_logo.svg"
              alt="DataCore"
              style={{ height: "60px" }}
            />
          </Link>
        </div>

        {/* Ayuda y cerrar sesión */}
        <div className="flex items-center gap-7">
          <IconButton component={Link} to="/ayuda">
            <HelpIcon sx={iconStyles} />
          </IconButton>

          <IconButton onClick={handlerLogout}>
            <LogoutIcon sx={iconStyles} />
          </IconButton>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
