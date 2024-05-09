import { useReducer } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { loginReducer } from "../reducers/loginReducer";
import { loginUser } from "../services/authService";

const initialLogin = JSON.parse(sessionStorage.getItem('Login')) || {
    isAuth: false,
    user: undefined,
}
export const useAuth = () => {

    const [login, dispatch] = useReducer(loginReducer, initialLogin);
    const navigate = useNavigate();

    const handlerLogin = ({ username, password }) => {
        const isLogin = loginUser({ username, password });
        
        if (isLogin) {
            const user = { username: 'admin' }
            dispatch({
                type: 'login',
                payload: user,
            });
            sessionStorage.setItem('login', JSON.stringify({
                isAuth: true,
                user,
            }));
            navigate('/Home');
        } else {
            Swal.fire('Error Login', 'Username o password invalidos', 'error');
        }
    }

    const handlerLogout = () => {
        dispatch({
            type: 'logout',
        });
        sessionStorage.removeItem('Login');
    }
    return {
        login,
        handlerLogin,
        handlerLogout,
    }
}