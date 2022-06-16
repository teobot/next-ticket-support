import React from "react";

import { Container } from "react-bootstrap";

export default function DefaultContainer({ children }) {
  return (
    <Container className="d-flex flex-column justify-content-center align-items-center mb-5">
      {children}
    </Container>
  );
}
