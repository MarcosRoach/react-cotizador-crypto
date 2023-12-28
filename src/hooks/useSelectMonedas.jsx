import { useState } from "react";
import styled from "@emotion/styled";

//ESTILOS DE EL COMPONENTE
const Label = styled.label`
  font-family: "latos", sans-serif;
  color: #fff;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 1.2rem;
  margin: 15px 0;
  display: block;
`;

const Select = styled.select`
  width: 100%;
  display: block;
  padding: 20px;
  border-radius: 4px;
  border: none;
  font-size: 1rem;
  margin-bottom: 10px;
`;

const useSelectMonedas = (label, opciones) => {
  //ESTADO DE EL CUSTOM HOOK
  const [state, setState] = useState("");

  const SelectMonedas = () => (
    <>
      <Label>{label}</Label>
      <Select value={state} onChange={(e) => setState(e.target.value)}>
        <option value="">- Seleccione -</option>
        {opciones.map((opcion) => (
          <option key={opcion.codigo} value={opcion.codigo}>
            {opcion.nombre}
          </option>
        ))}
      </Select>
    </>
  );

  return [state, SelectMonedas];
};
export default useSelectMonedas;
