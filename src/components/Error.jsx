import React from "react";
import styled from "@emotion/styled";

const MensajeError = styled.div`
  background-color: #b7322c;
  color: #fff;
  font-weight: bold;
  padding: 1rem;
  text-transform: uppercase;
  font-size: 20px;
  text-align: center;
  font-family: "latos", sans-serif;
`;

const Error = ({ error }) => {
  console.log(error);
  return <MensajeError>{error}</MensajeError>;
};

export default Error;
