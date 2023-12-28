import { useState, useEffect } from "react";
import styled from "@emotion/styled";

//Importar Monedas
import monedas from "../data/monedas.js";

//HOOKS
import useSelectMonedas from "../hooks/useSelectMonedas";
//  COMPONENTES
import Resultado from "./Resultado.jsx";
import Error from "./Error.jsx";

//ESTILOS DE EL COMPONENTE
const InputSubmint = styled.input`
  background-color: #9497ff;
  border: none;
  width: 100%;
  padding: 10px;
  color: #fff;
  font-weight: 700;
  font-size: 20px;
  text-transform: uppercase;
  transition: background-color 0.3s ease-in-out;
  margin-top: 20px;

  &:hover {
    cursor: pointer;
    background-color: #6c63ff;
  }
`;

const Formulario = ({ setMonedas }) => {
  //ESTADOS

  //Estado de Cripto Monedas
  const [criptoMoneda, setCriptoMoneda] = useState([]);
  //Estado de Resultado
  const [resultado, setResultado] = useState({});
  //Estado de error
  const [error, setError] = useState(false);
  const [errorMsj, setErrorMsj] = useState("");

  //UTILIZAR HOOKS
  const [moneda, SelectMonedas] = useSelectMonedas("Elige tu Moneda", monedas);
  const [criptoMonedas, SelectCriptoMonedas] = useSelectMonedas(
    "Elige tu Cripto Moneda",
    criptoMoneda
  );

  //EFECTOS
  useEffect(() => {
    const consultarAPI = async () => {
      const url =
        "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";

      const respuesta = await fetch(url);
      const resultado = await respuesta.json();

      //guardar en array solo el fullname
      const criptoFullName = resultado.Data.map((cripto) => ({
        nombre: cripto.CoinInfo.FullName,
        codigo: cripto.CoinInfo.Name,
      }));

      console.log(resultado.Data);
      setCriptoMoneda(criptoFullName);
    };
    consultarAPI();
  }, []);

  //FUNCIONES
  //Manejar el submit
  const handleSubmit = (e) => {
    e.preventDefault();

    //Validar que los campos esten llenos
    if (moneda === "" || criptoMonedas === "") {
      setError(true);
      setErrorMsj("Todos los campos son obligatorios");
      //timeout para quitar el error
      setTimeout(() => {
        setError(false);
        setErrorMsj("");
      }, 3000);

      return;
    }
    setError(false);
    //Pasar los datos al componente principal
    setResultado({ moneda, criptoMonedas });
    setMonedas({ moneda, criptoMonedas });
  };

  return (
    <>
      {error && <Error error={errorMsj} />}
      <form>
        <SelectMonedas />
        <SelectCriptoMonedas />
        <InputSubmint type="submit" value="Cotizar" onClick={handleSubmit} />

        <Resultado resultado={resultado} />
      </form>
    </>
  );
};

export default Formulario;
