import { Button } from "@mui/material";
import React from "react";
import { logout } from "../../modules/authManager";
export default function Home() {
  return <Button onClick={logout}>Logout</Button>;
}
