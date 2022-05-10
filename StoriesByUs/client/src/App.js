import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import ApplicationViews from "./components/ApplicationViews";
import { onLoginStatusChange } from "./modules/authManager";
import Navbar from "./components/nav/Navbar";
import { UserTypeProvider } from "./components/user/UserTypeProvider";

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
      <UserTypeProvider>
        <Navbar isLoggedIn={isLoggedIn} />
        <ApplicationViews isLoggedIn={isLoggedIn} />
      </UserTypeProvider>
    </Router>
  );
}

export default App;
