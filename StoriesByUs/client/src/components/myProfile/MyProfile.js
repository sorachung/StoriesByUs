import { Container, Tabs, Tab, Box } from "@mui/material";
import PropTypes from "prop-types";
import { Link as RouterLink, useHistory, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getCurrentUser, getUser } from "../../modules/userManager";
import MyDashboard from "./MyDashboard";
import MyProfileStoriesList from "./MyProfileStoriesList";
import MyProfileBookmarksList from "./MyProfileBookmarksList";

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
export default function MyProfile({ defaultValue }) {
  const [user, setUser] = useState({});
  const history = useHistory();

  const [value, setValue] = useState(defaultValue);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getAndSetCurrentUser = () => {
    getCurrentUser().then((userData) => {
      if (userData === 404) {
        history.push("/404");
      } else {
        setUser(userData);
      }
    });
  };

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    getAndSetCurrentUser();
  }, []);

  if (!user.id) {
    return null;
  }

  return (
    <Container maxWidth="xl">
      <h1>My Profile</h1>
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
          <Tab label="My Dashboard" {...a11yProps(0)} />
          <Tab label="My Stories" {...a11yProps(1)} />
          <Tab label="My Bookmarks" {...a11yProps(2)} />
        </Tabs>
        <TabPanel value={value} index={0}>
          <MyDashboard
            user={user}
            getAndSetCurrentUser={getAndSetCurrentUser}
          />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <MyProfileStoriesList user={user} />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <MyProfileBookmarksList user={user} />
        </TabPanel>
      </Box>
    </Container>
  );
}
