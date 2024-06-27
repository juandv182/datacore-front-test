import pucpLogo from "../assets/pucp_logo.png";
import serverIcon from "../assets/server_icon.svg";
import Header from "./Header";

export const LoginPage = () => {
  return (
    <div className="container">
      <div className="background-image"></div>
      <div className="white-container">
        <img src={pucpLogo} className="logo"></img>
        <img src={serverIcon} className="imgdatacore"></img>
        <h1 className="titulo">DataCore</h1>
        <h2 className="subtitulo">
          Plataforma que ofrece servicios computacionales para la Comunidad de
          Ingeniería PUCP
        </h2>
        <Header />
      </div>
    </div>
  );
};
