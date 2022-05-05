import { Container, Typography, Box } from "@mui/material";
import React from "react";

export default function Dashboard({ user }) {
  return (
    <Container maxWidth="xl">
      <Box component="section">
        <h2>Bio:</h2>
        <Typography variant="body1" color="text.primary">
          {user.bio}
        </Typography>
      </Box>
    </Container>
  );
}
