import logo from "../assets/PUCP-alta_resolucion-1.png";
import logoDataCore from "../assets/Imagen DataCore.png";
import Header from "./Header";

export const LoginPage = () => {
  return (
    <div className="container">
      <div className="background-image"></div>
      <div className="white-container">
        <img src={logo} className="logo"></img>
        <img src={logoDataCore} className="imgdatacore"></img>
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
