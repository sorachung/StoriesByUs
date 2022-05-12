import {
  Container,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  TableBody,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getAllUsersDeactivated } from "../../modules/userManager";
import DeactivatedProfileListItem from "./DeactivatedProfileListItem";

export default function DeactivatedProfilesList() {
  const [users, setUsers] = useState([]);
  const history = useHistory();

  const getDeactivatedProfiles = () => {
    getAllUsersDeactivated().then((users) => setUsers(users));
  };

  useEffect(() => {
    getDeactivatedProfiles();
  }, []);

  return (
    <Container maxWidth="xl">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="deactivated table">
          <TableHead>
            <TableRow>
              <TableCell>Display Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>User Type</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((u) => (
              <DeactivatedProfileListItem
                user={u}
                getDeactivatedProfiles={getDeactivatedProfiles}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
