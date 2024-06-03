import GoogleButton from "react-google-button";
import React, { useContext } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

const GoogleLoginButton = () => {
  const navigate = useNavigate();
  const { handlerLogin } = useContext(AuthContext);
  const handleSuccess = (codeResponse) => {
    const authorizationCode = codeResponse.code;

    fetch("http://localhost:8000/datacore/api/v1/login-with-google/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code: authorizationCode }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          navigate("/error");
        } else {
          localStorage.setItem("access_token", data["access_token"]);
          localStorage.setItem("username", data["username"]);
          localStorage.setItem("first_name", data["first_name"]);
          localStorage.setItem("last_name", data["last_name"]);
          localStorage.setItem("is_admin", data["is_admin"]);
          console.log(data["username"]);
          console.log(data["first_name"]);
          console.log(data["last_name"]);
          handlerLogin({ googleUser: { username: data["username"] } });
        }
      })
      .catch((error) => {
        console.error("Error exchanging authorization code:", error);
      });
  };

  const login = useGoogleLogin({
    onSuccess: handleSuccess,
    flow: "auth-code",
  });

  return (
    <div className="google-login-button-container">
      <div className="button-container">
        <GoogleButton onClick={login} label="Continuar con Google" />
      </div>
    </div>
  );
};

export default GoogleLoginButton;
