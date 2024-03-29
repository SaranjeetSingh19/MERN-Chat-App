import {
  AppBar,
  Backdrop,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { Suspense, lazy, useState } from "react";
import { seaGreenColor } from "../constants/color";
import {
  Add as AddIcon,
  Menu as MenuIcon,
  Search as SearchIcon,
  Group as GroupIcon,
  Logout as LogoutIcon,
  Notifications as NotificationsIcon,
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";

const SearchDialog = lazy(() => import("../specific/Search"))
const NotificationsDialog = lazy(() => import("../specific/Notifications"))
const NewGroupDialog = lazy(() => import("../specific/NewGroup"))


const Header = () => {
  const navigate = useNavigate();

  const [isMobile, setIsMobile] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [isNewGroup, setIsNewGroup] = useState(false);
  const [isNotification, setIsNotification] = useState(false);

  const handleMobile = () => {
    setIsMobile((prev) => !prev);
  };
  const openSearch = () => {
    setIsSearch((prev) => !prev);
  };
  const openNewGroup = () => {
    setIsNewGroup((prev) => !prev);
  };
  const navigateToGroup = () => navigate("/groups");

  const openNotification = () => p[setIsNotification((prev) => !prev)];

  const handleLogout = () => {
    console.log("Logout button");
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }} height={"4rem"}>
        <AppBar
          position="static"
          sx={{
            bgcolor: seaGreenColor,
          }}
        >
          <Toolbar>
            <Typography
              variant="h6"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              bonKsteR
            </Typography>

            <Box sx={{ display: { xs: "block", sm: "none" } }}>
              <IconButton color="inherit" onClick={handleMobile}>
                <MenuIcon />
              </IconButton>
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            <Box>
              <Tooltip title="Search">
                <IconButton color="inherit" size="large" onClick={openSearch}>
                  <SearchIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title="New Group">
                <IconButton color="inherit" size="large" onClick={openNewGroup}>
                  <AddIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title="Manage Groups">
                <IconButton
                  color="inherit"
                  size="large"
                  onClick={navigateToGroup}
                >
                  <GroupIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title="Notifications">
                <IconButton
                  color="inherit"
                  size="large"
                  onClick={openNotification}
                >
                  <NotificationsIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title="Logout">
                <IconButton color="inherit" size="large" onClick={handleLogout}>
                  <LogoutIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>

      {isSearch && (
        <Suspense fallback={<Backdrop open />}>
          <SearchDialog />
        </Suspense>
      )}


      {isNotification && (
              <Suspense fallback={<Backdrop open />}>

          <NotificationsDialog />
        </Suspense>
      )}


      {isNewGroup && (
             <Suspense fallback={<Backdrop open />}>

          <NewGroupDialog />
        </Suspense>
      )}
    </>
  );
};

export default Header;
