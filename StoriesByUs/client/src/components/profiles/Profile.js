import {
  Container,
  Tabs,
  Tab,
  Button,
  Typography,
  Link,
  Stack,
  Box,
} from "@mui/material";
import PropTypes from "prop-types";
import { Link as RouterLink, useHistory, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { deactivateUser, getUser } from "../../modules/userManager";
import Dashboard from "./Dashboard";
import ProfileStoriesList from "./ProfileStoriesList";
import ProfileBookmarksList from "./ProfileBookmarksList";

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
export default function Profile({ defaultValue }) {
  const [user, setUser] = useState({});
  const { userId } = useParams();
  const history = useHistory();

  const [value, setValue] = useState(defaultValue);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

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

  const deactivate = () => {
    deactivateUser(userId, user).then((status) => {
      if (status === 204) {
        history.push("/");
      }
    });
  };

  if (!user.id) {
    return null;
  }

  return (
    <Container maxWidth="xl">
      <Stack spacing={2} direction="row">
        <h1>{user.displayName}'s Profile</h1>
        <Button variant="contained" onClick={deactivate}>
          Deactivate
        </Button>
      </Stack>
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
          <ProfileBookmarksList user={user} />
        </TabPanel>
      </Box>
    </Container>
  );
}
