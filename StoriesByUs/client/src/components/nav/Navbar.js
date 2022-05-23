import React, { useContext, useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MoreIcon from "@mui/icons-material/MoreVert";
import { Link } from "@mui/material";
import { logout } from "../../modules/authManager";
import { UserTypeContext } from "../user/UserTypeProvider";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function Navbar({ isLoggedIn }) {
  const { currentUserType, updateCurrentUserType } =
    useContext(UserTypeContext);

  useEffect(() => {
    if (isLoggedIn) {
      updateCurrentUserType();
    }
  }, [isLoggedIn]);

  const [anchorEl, setAnchorEl] = useState(null);
  const [postAnchorEl, setPostAnchorEl] = useState(null);
  const [adminAnchorEl, setAdminAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isPostMenuOpen = Boolean(postAnchorEl);
  const isAdminMenuOpen = Boolean(adminAnchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePostMenuOpen = (event) => {
    setPostAnchorEl(event.currentTarget);
  };

  const handleAdminMenuOpen = (event) => {
    setAdminAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setPostAnchorEl(null);
    setAdminAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderProfileMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <Link
        component={RouterLink}
        sx={{ textDecoration: "none" }}
        color="text.primary"
        to="/users/me"
      >
        <MenuItem onClick={handleMenuClose}>My Profile</MenuItem>
      </Link>
      <Link
        component={RouterLink}
        sx={{ textDecoration: "none" }}
        color="text.primary"
        to="/users/me/stories"
      >
        <MenuItem onClick={handleMenuClose}>My Stories</MenuItem>
      </Link>
      <Link
        component={RouterLink}
        sx={{ textDecoration: "none" }}
        color="text.primary"
        to="/users/me/bookmarks"
      >
        <MenuItem onClick={handleMenuClose}>My Bookmarks</MenuItem>
      </Link>
      <MenuItem
        onClick={() => {
          handleMenuClose();
          logout();
        }}
      >
        Logout
      </MenuItem>
    </Menu>
  );

  const renderPostMenu = (
    <Menu
      anchorEl={postAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isPostMenuOpen}
      onClose={handleMenuClose}
    >
      <Link
        component={RouterLink}
        sx={{ textDecoration: "none" }}
        color="text.primary"
        to="/post/works"
      >
        <MenuItem onClick={handleMenuClose}>Post a new Story</MenuItem>
      </Link>
      <Link
        component={RouterLink}
        sx={{ textDecoration: "none" }}
        color="text.primary"
        to="/users/me/stories"
      >
        <MenuItem onClick={handleMenuClose}>Add a Chapter</MenuItem>
      </Link>
    </Menu>
  );

  const renderAdminMenu = (
    <Menu
      anchorEl={adminAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isAdminMenuOpen}
      onClose={handleMenuClose}
    >
      <Link
        component={RouterLink}
        sx={{ textDecoration: "none" }}
        color="text.primary"
        to="/users/deactivated"
      >
        <MenuItem onClick={handleMenuClose}>Deactivated Users</MenuItem>
      </Link>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleAdminMenuOpen}>
        <Typography
          variant="h6"
          noWrap
          padding="0 1em"
          component="div"
          sx={{ display: { xs: "block", sm: "block" } }}
          onClick={handleAdminMenuOpen}
          aria-controls={menuId}
          aria-haspopup="true"
        >
          <p>Admin</p>
        </Typography>
      </MenuItem>
      <MenuItem onClick={handlePostMenuOpen}>
        <Typography
          variant="h6"
          noWrap
          padding="0 1em"
          component="div"
          sx={{ display: { xs: "block", sm: "block" } }}
          onClick={handlePostMenuOpen}
          aria-controls={menuId}
          aria-haspopup="true"
        >
          <p>Post</p>
        </Typography>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "block", sm: "block" } }}
          >
            <Link
              component={RouterLink}
              sx={{ textDecoration: "none" }}
              color="#FFF"
              to="/"
            >
              StoriesByUs
            </Link>
          </Typography>
          {isLoggedIn ? (
            <>
              <Typography
                variant="h6"
                noWrap
                component="div"
                paddingLeft="2em"
                sx={{ display: { xs: "block", sm: "block" } }}
              >
                <Link
                  component={RouterLink}
                  sx={{ textDecoration: "none" }}
                  color="#FFF"
                  to="/browse"
                >
                  Browse
                </Link>
              </Typography>
              <Box sx={{ flexGrow: 1 }} />
              {/* <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                />
              </Search> */}
              <Box sx={{ flexGrow: 1 }} />
              <Box
                sx={{
                  display: { xs: "none", md: "flex" },
                }}
              >
                {currentUserType === 1 ? (
                  <MenuItem onClick={handleAdminMenuOpen}>
                    <Typography
                      variant="h6"
                      noWrap
                      padding="0 1em"
                      component="div"
                      sx={{ display: "block" }}
                      aria-controls={menuId}
                      aria-haspopup="true"
                      color="#FFF"
                    >
                      Admin
                    </Typography>
                  </MenuItem>
                ) : (
                  ""
                )}
                <MenuItem onClick={handlePostMenuOpen}>
                  <Typography
                    variant="h6"
                    noWrap
                    padding="0 1em"
                    component="div"
                    sx={{ display: "block" }}
                    aria-controls={menuId}
                    aria-haspopup="true"
                    color="#FFF"
                  >
                    Post
                  </Typography>
                </MenuItem>
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
              </Box>
              <Box sx={{ display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="show more"
                  aria-controls={mobileMenuId}
                  aria-haspopup="true"
                  onClick={handleMobileMenuOpen}
                  color="inherit"
                >
                  <MoreIcon />
                </IconButton>
              </Box>
            </>
          ) : (
            <>
              <Box sx={{ flexGrow: 1 }} />
              <Box sx={{ flexGrow: 1 }} />
              <Box sx={{ display: "flex" }}>
                <Typography
                  variant="h6"
                  noWrap
                  padding="0 1em"
                  component="div"
                  sx={{ display: "block" }}
                >
                  <Link
                    component={RouterLink}
                    sx={{ textDecoration: "none" }}
                    color="#FFF"
                    to="/login"
                  >
                    Login
                  </Link>
                </Typography>
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{ display: "block" }}
                >
                  <Link
                    component={RouterLink}
                    sx={{ textDecoration: "none" }}
                    color="#FFF"
                    to="/register"
                  >
                    Register
                  </Link>
                </Typography>
              </Box>
            </>
          )}
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderProfileMenu}
      {renderPostMenu}
      {currentUserType === 1 ? renderAdminMenu : ""}
    </Box>
  );
}
