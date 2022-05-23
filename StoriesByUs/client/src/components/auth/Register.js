import React, { useState } from "react";
import {
  Container,
  Button,
  Box,
  FormGroup,
  FormLabel,
  Input,
} from "@mui/material";
import { useHistory } from "react-router-dom";
import { register } from "../../modules/authManager";

export default function Register() {
  const history = useHistory();

  const [displayName, setDisplayName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const registerClick = (e) => {
    e.preventDefault();
    if (password && password !== confirmPassword) {
      alert("Passwords don't match. Do better.");
    } else {
      const userProfile = {
        displayName,
        email,
      };
      register(userProfile, password).then(() => history.push("/"));
    }
  };

  return (
    <Container maxWidth="sm">
      <Box component="form" onSubmit={registerClick}>
        <fieldset>
          <FormGroup>
            <FormLabel htmlFor="displayName">Display Name</FormLabel>
            <Input
              id="displayName"
              type="text"
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              id="email"
              type="text"
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
            <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
            <Input
              id="confirmPassword"
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Button type="submit">Register</Button>
          </FormGroup>
        </fieldset>
      </Box>
    </Container>
  );
}
