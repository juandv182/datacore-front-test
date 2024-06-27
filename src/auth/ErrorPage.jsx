import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import WarningIcon from "@mui/icons-material/Warning";
import { readAjuste } from "../api/Ajustes";

const ErrorPage = () => {
  const [correoContacto, setCorreoContacto] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchCorreoContacto = async () => {
      try {
        const response = await readAjuste("CORREO_CONTACTO");
        setCorreoContacto(response.data.valor);
        setIsLoaded(true);
      } catch (error) {
        console.log("Error al obtener correo de contacto:", error);
      }
    };

    fetchCorreoContacto();
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className="bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-lg"
        style={{ visibility: isLoaded ? "visible" : "hidden" }}
      >
        <div className="flex flex-col items-center px-6 py-8 gap-3">
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.5rem",
              color: "#B9333A",
              mb: 2,
            }}
          >
            <WarningIcon sx={{ fontSize: "5rem" }} />
            <p className="text-2xl font-bold">Advertencia</p>
          </Box>
          <p className="text-center mb-2">
            Ups, parece que has llegado a una zona exclusiva.
          </p>
          <p className="text-center mb-2">
            Si necesitas acceder o tienes alguna pregunta, no dudes en
            contactarte con nuestro equipo en el DAI al correo
            <span className="font-semibold">
              <a href={`mailto:${correoContacto}`}>
                {" " + correoContacto + " "}
              </a>
            </span>
            y estaremos encantados de ayudarte.
          </p>
          <p className="text-center mb-4">¡Gracias por tu comprensión!</p>
          <Button component={Link} to="/" variant="contained">
            Cerrar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
