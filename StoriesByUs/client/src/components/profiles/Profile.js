import {
  Container,
  Tabs,
  Tab,
  Typography,
  Link,
  Stack,
  Box,
} from "@mui/material";
import PropTypes from "prop-types";
import { Link as RouterLink, useHistory, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getUser } from "../../modules/userManager";
import Dashboard from "./Dashboard";
import ProfileStoriesList from "./ProfileStoriesList";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}
export default function Profile() {
  const [user, setUser] = useState({});
  const { userId } = useParams();
  const history = useHistory();

  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (userId) {
      getUser(userId).then((userData) => {
        if (userData === 404) {
          history.push("/404");
        } else {
          setUser(userData);
        }
      });
    }
  }, [userId]);

  return (
    <Container maxWidth="xl">
      <h1>{user.displayName}'s Profile</h1>
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: "background.paper",
          display: "flex",
          height: 224,
        }}
      >
        <Tabs
          orientation="vertical"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: "divider" }}
        >
          <Tab label="Dashboard" {...a11yProps(0)} />
          <Tab label="Stories" {...a11yProps(1)} />
          <Tab label="Bookmarks" {...a11yProps(2)} />
        </Tabs>
        <TabPanel value={value} index={0}>
          <Dashboard user={user} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ProfileStoriesList user={user} />
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
      </Box>
    </Container>
  );
}
