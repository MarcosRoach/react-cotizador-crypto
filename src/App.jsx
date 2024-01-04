import styled from "@emotion/styled";
import imgCripto from "./img/imagen-criptos.png";
import { useEffect, useState } from "react";

//COMPONENTES
import Formulario from "./components/Formulario";
import Resultado from "./components/Resultado";
import Spiner from "./components/Spiner";

//ESTILOS DE EL COMPONENTE
const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  width: 90%;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Imagen = styled.img`
  max-width: 400px;
  width: 80%;
  margin: 100px auto 0 auto;
  display: block;
  text-align: center;
  display: block;
`;

const Parrafo = styled.p`
  color: #fff;
  font-family: "Lato", sans-serif;
  font-size: 18px;
  font-weight: 700;
  margin-top: 2rem;
  margin-bottom: 0;
`;

const Heading = styled.h1`
  font-family: "Lato", sans-serif;
  color: #fff;
  text-align: center;
  font-weight: 700;
  margin-bottom: 50px;
  margin-top: 80px;
  font-size: 34px;

  &::after {
    content: "";
    width: 100px;
    height: 6px;
    background-color: #66a2fe;
    display: block;
    margin: 10px auto 0 auto;
  }
`;

function App() {
  const [monedas, setMonedas] = useState({});
  const [cotizacion, setCotizacion] = useState({});
  const [cargando, setCargando] = useState(false);
  const [resultado, setResultado] = useState(false);

  //UseEffect
  useEffect(() => {
    if (Object.keys(monedas).length === 0) return;

    const consultarAPI = async () => {
      setCargando(true);
      setCotizacion({});
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${monedas.criptoMonedas}&tsyms=${monedas.moneda},${monedas.moneda}`;

      const respuesta = await fetch(url);
      const resultado = await respuesta.json();

      setCotizacion(resultado.DISPLAY[monedas.criptoMonedas][monedas.moneda]);
      setCargando(false);
      setResultado(true);
    };
    consultarAPI();
  }, [monedas]);

  return (
    <Contenedor>
      <Imagen src={imgCripto} alt="imagen cripto" />
      <div>
        <Heading>Cotiza Criptomonedas al Instante</Heading>
        <Formulario setMonedas={setMonedas} />

        {cargando && <Parrafo className="">Cargando...</Parrafo>}
        {/* si cargando es falso y resultado true mostrar Resultado */}
        {!cargando && resultado && <Resultado cotizacion={cotizacion} />}
      </div>
    </Contenedor>
  );
}

export default App;
