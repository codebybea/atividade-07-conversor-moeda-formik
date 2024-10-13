"use client";

import Pagina from "@/components/Pagina";
import { Formik } from "formik";
import { useState } from "react";
import { Button, Form, Modal, Container, Card, Row } from "react-bootstrap";
import { FaCheck, FaTrashAlt } from "react-icons/fa";

// Taxa
const taxaConversao = {
  dolar: 0.2,
  euro: 0.18,
  bitcoin: 0.000003,
};

export default function page() {
  const [showModal, setShowModal] = useState(false);
  const [resultado, setResultado] = useState(0);

  // Mudar Imagem
  const getImagePath = (moeda) => {
    switch (moeda) {
      case "dolar":
        return "/dolar.png";
      case "euro":
        return "/euro.png";
      case "bitcoin":
        return "/bitcoin.png";
      default:
        return "/mood.png";
    }
  };

  function converter(values) {
    const valorConvertido = values.real * taxaConversao[values.moeda];
    setResultado(
      valorConvertido.toLocaleString("pt-BR", { minimumFractionDigits: 2 })
    );
    setShowModal(true);
  }

  return (
    <Pagina titulo="Converter Moedas">
      {/* Formulario */}
      <Formik
        initialValues={{
          real: 0.0,
          moeda: "",
        }}
        onSubmit={converter}
      >
        {({ values, handleChange, handleSubmit, handleReset }) => (
          <Form>
            <Container className="py-2 text-center w-25">
              <Card.Img src={getImagePath(values.moeda)} />
            </Container>
            {/* // Container Formulário */}
            <Row md={2}>
              <Container>
                <Form.Group className="mb-2">
                  <Form.Label>Real:</Form.Label>
                  <Form.Control
                    name="real"
                    type="number"
                    value={values.real}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-2">
                  <Form.Label>Moeda:</Form.Label>
                  <Form.Select
                    name="moeda"
                    value={values.moeda}
                    onChange={handleChange}
                  >
                    <option disabled value="">
                      Selecione
                    </option>
                    <option value="dolar">Dólar</option>
                    <option value="euro">Euro</option>
                    <option value="bitcoin">Bitcoin</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className=" py-4 mb-2 text-center">
                  <Button onClick={handleSubmit} className="me-2">
                    <FaCheck /> Enviar
                  </Button>
                  <Button onClick={handleReset}>
                    <FaTrashAlt /> Limpar
                  </Button>
                </Form.Group>
              </Container>
            </Row>
          </Form>
        )}
      </Formik>

      {/* Modal do resultado */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Resultado</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Conversão: {resultado}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </Pagina>
  );
}
