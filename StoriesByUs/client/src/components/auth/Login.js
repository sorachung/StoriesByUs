import React, { useState } from "react";
import {
  Container,
  Button,
  Box,
  FormGroup,
  FormLabel,
  Input,
} from "@mui/material";
import { useHistory, Link } from "react-router-dom";
import { login } from "../../modules/authManager";

export default function Login() {
  const history = useHistory();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const loginSubmit = (e) => {
    e.preventDefault();
    login(email, password)
      .then(() => history.push("/"))
      .catch(() => alert("Invalid email or password"));
  };

  return (
    <Container maxWidth="sm">
      <Box component="form" onSubmit={loginSubmit} mt="2em">
        <fieldset>
          <FormGroup>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              id="email"
              type="text"
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              id="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Button type="submit">Login</Button>
          </FormGroup>
          <em>
            Not registered? <Link to="register">Register</Link>
          </em>
        </fieldset>
      </Box>
    </Container>
  );
}
