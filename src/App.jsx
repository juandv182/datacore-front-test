import { Routes, Route, Navigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import "./App.css";
import "./normalize.css";
import { LoginPage } from "./auth/LoginPage";
import { AuthContext } from "./auth/context/AuthContext";
import { AppRoutes } from "./routes/AppRoutes";
import { GoogleOAuthProvider } from "@react-oauth/google";
import UserContext from "./context/UserContext";

function App() {
  const { login } = useContext(AuthContext);
  const clientId =
    "722348533329-fcvbgk9bl8qerclkpoav4quk9gcsfbnl.apps.googleusercontent.com";
  const [userInfo, setUserInfo] = useState([]);

  const verifyToken = () => {
    const access_key = localStorage.getItem("access_token");
    const username = localStorage.getItem("username");

    fetch("http://localhost:8000/datacore/api/v1/token/verify/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: access_key }),
    }).then((response) => {
      if (response.ok) {
        setUserInfo({
          ...userInfo,
          access_token: access_key,
          username: username,
        });
      } else {
        setUserInfo({ ...userInfo, access_token: null, username: null });
      }
    });
  };

  useEffect(() => {
    verifyToken();
  }, []);

  const updateUserInfo = (value) => {
    setUserInfo(value);
  };

  return (
    <UserContext.Provider value={{ userInfo, updateUserInfo }}>
      <GoogleOAuthProvider clientId={clientId}>
        <div>
          <Routes>
            {login.isAuth ? (
              <>
                <Route path="/*" element={<AppRoutes />} />
              </>
            ) : (
              <>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/*" element={<Navigate to="/login" />} />
              </>
            )}
          </Routes>
        </div>
      </GoogleOAuthProvider>
    </UserContext.Provider>
  );
}

export default App;
