"use client";

import { Container } from "react-bootstrap";

export default function Pagina(props) {
  return (
    <>
      <div className="bg-secondary text-center text-white py-3">
        <h1>{props.titulo}</h1>
      </div>

      <Container className="mt-2">{props.children}</Container>
    </>
  );
}
