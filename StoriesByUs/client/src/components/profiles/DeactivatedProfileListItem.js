import React, { useState } from "react";
import { Button, Box, TableRow, TableCell } from "@mui/material";
import { reactivateUser } from "../../modules/userManager";

export default function DeactivatedProfileListItem({
  getDeactivatedProfiles,
  user,
}) {
  const reactivate = () => {
    reactivateUser(user).then(() => getDeactivatedProfiles());
  };

  return (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell>{user.displayName}</TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell>{user.userType?.name}</TableCell>
      <TableCell>
        <Button onClick={reactivate}>Reactivate</Button>
      </TableCell>
    </TableRow>
  );
}
