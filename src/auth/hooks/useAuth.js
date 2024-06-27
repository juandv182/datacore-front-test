import { useReducer } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { loginReducer } from "../reducers/loginReducer";
import { loginUser } from "../services/authService";
import EditUserModal from "../../components/EditUserModal";

const initialLogin = JSON.parse(sessionStorage.getItem("Login")) || {
  isAuth: false,
  user: undefined,
};

export const useAuth = () => {
  const [login, dispatch] = useReducer(loginReducer, initialLogin);
  const navigate = useNavigate();

  const handlerLogin = ({ username, password, googleUser }) => {
    if (googleUser) {
      // Si es un usuario de Google, manejamos el inicio de sesión aquí
      const user = { username: googleUser.username };
      dispatch({
        type: "login",
        payload: user,
      });
      sessionStorage.setItem(
        "Login",
        JSON.stringify({
          isAuth: true,
          user: user,
        })
      );
      navigate("/home");
    } else {
      // Si es un usuario normal, manejamos el inicio de sesión tradicional
      const isLogin = loginUser({ username, password });
      if (isLogin) {
        const user = { username: "admin" };
        dispatch({
          type: "login",
          payload: user,
        });
        sessionStorage.setItem(
          "Login",
          JSON.stringify({
            isAuth: true,
            user: user,
          })
        );
        navigate("/home");
      } else {
        Swal.fire("Error Login", "Username o password invalidos", "error");
      }
    }
  };

    const handlerLogout = () => {
        dispatch({
            type: 'logout',
        });
        sessionStorage.removeItem('Login');
        localStorage.removeItem('access_token');
        localStorage.removeItem('username');
        localStorage.removeItem('first_name');
        localStorage.removeItem('last_name');
        localStorage.removeItem('is_admin');
        localStorage.removeItem('estado');
        localStorage.removeItem('id_user');
    }
    return {
        login,
        handlerLogin,
        handlerLogout,
    }
}