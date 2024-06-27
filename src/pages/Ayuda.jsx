import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import LoadingOverlay from "../components/LoadingOverlay";
import { readAjuste } from "../api/Ajustes";

function Ayuda() {
  const [correoContacto, setCorreoContacto] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    const fetchCorreoContacto = async () => {
      setLoading(true);
      try {
        const response = await readAjuste("CORREO_CONTACTO");
        setCorreoContacto(response.data.valor);
        setIsLoaded(true);
      } catch (error) {
        console.log("Error al obtener correo de contacto:", error);
        setShowError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchCorreoContacto();
  }, []);

  return (
    <div className="mx-8 my-6">
      {loading && (
        <Box sx={{ height: "20rem", position: "relative" }}>
          <LoadingOverlay backgroundColor="white" content="Cargando..." />
        </Box>
      )}
      {isLoaded && (
        <>
          <Box
            sx={{
              color: "primary.main",
              mt: 4,
            }}
          >
            <p className="font-bold text-3xl mb-3">
              {localStorage.getItem("first_name")}, ¿necesitas ayuda?
            </p>
            <p className="font-semibold text-2xl">¡Contáctanos!</p>
            <hr
              className="mt-6"
              style={{
                width: "100%",
                borderTop: "4px solid",
              }}
            />
          </Box>
          <Box
            sx={{
              pt: 4,
              color: "primary.main",
            }}
          >
            <p>
              Si estás experimentando dificultades o tienes alguna pregunta, no
              dudes en comunicarte con nuestro equipo.
            </p>
            <p className="mb-4">
              Estamos aquí para ayudarte en todo lo que necesites.
            </p>
            <p className="mb-2">Contáctanos al correo</p>
            <p className="font-bold text-lg mb-4 hover:underline inline-block">
              <a href={`mailto:${correoContacto}`}>{correoContacto}</a>
            </p>
            <p>Estaremos encantados de ayudarte.</p>
          </Box>
        </>
      )}
      {showError && (
        <Box
          sx={{
            color: "primary.main",
            mt: 4,
          }}
        >
          <p className="font-bold text-3xl mb-3">Ha ocurrido un error.</p>
          <p className="font-semibold text-2xl">
            Verifica tu conexión e intenta recargar la página.
          </p>
          <hr
            className="mt-6"
            style={{
              width: "100%",
              borderTop: "4px solid",
            }}
          />
        </Box>
      )}
    </div>
  );
}
export default Ayuda;
