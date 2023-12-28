import React, { useState } from "react";

//Estilos
import styled from "@emotion/styled";

//ESTILOS DE EL COMPONENTE
const Parrafo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  color: #fff;
  font-family: "latos", sans-serif;
  font-weight: 700;
  font-size: 16px;
  text-transform: uppercase;
  transition: background-color 0.3s ease-in-out;
  margin-top: 20px;
`;
const Imagen = styled.img`
  display: block;
  width: 90px;
`;
const Texto = styled.p`
  font-weight: 400;
`;
const Precio = styled.p`
  font-size: 20px;
  font-weight: 400;
  span {
    font-weight: 700;
    font-size: 25px;
  }
`;

const Resultado = ({ cotizacion }) => {
  return (
    <div>
      {/* Si cotizacion no es null ejecutar lo siguiente */}
      {cotizacion && (
        <Parrafo>
          <Imagen
            src={`https://cryptocompare.com/${cotizacion.IMAGEURL}`}
            alt="imagen Cripto"
          />
          <div>
            <Precio>
              El precio es: <span>{cotizacion.PRICE}</span>{" "}
            </Precio>
            <Texto>
              El valor mas alto del dia: <span>{cotizacion.HIGHDAY}</span>{" "}
            </Texto>
            <Texto>
              El valor mas bajo del dia: <span>{cotizacion.LOWDAY}</span>{" "}
            </Texto>
            <Texto>
              Variacion ultimas 24 horas:{" "}
              <span>{cotizacion.CHANGEPCT24HOUR} </span>
            </Texto>

            <Texto>
              Ultima Actualizacion: <span>{cotizacion.LASTUPDATE}</span>
            </Texto>
          </div>
        </Parrafo>
      )}
    </div>
  );
};

export default Resultado;
