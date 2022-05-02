import { Container, Link } from "@mui/material";
import { Link as RouterLink, MemoryRouter } from "react-router-dom";
import React from "react";
export default function Browse() {
  return (
    <Container maxWidth="xl">
      <h1>Browse Stories</h1>
      <Link component={RouterLink} to="/browse/all">
        Browse all
      </Link>
    </Container>
  );
}
