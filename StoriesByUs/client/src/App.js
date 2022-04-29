import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import ApplicationViews from "./components/ApplicationViews";
import { onLoginStatusChange } from "./modules/authManager";
import Navbar from "./components/nav/Navbar";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    onLoginStatusChange(setIsLoggedIn);
  }, []);

  if (isLoggedIn === null) {
    return <CircularProgress />;
  }

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} />
      <ApplicationViews isLoggedIn={isLoggedIn} />
    </Router>
  );
}

export default App;
