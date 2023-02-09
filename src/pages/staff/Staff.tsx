import { Menu as MenuIcon } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import Appointments from "../../components/Appointments";
import Bookings from "./Bookings";
const pages = ["Appointments", "Bookings"];
const Staff = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [Component, setComponent] = React.useState<null | React.ReactNode>(
    <Appointments />
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = (index: number) => {
    if (!index || index === 0) {
      setComponent(<Appointments />);
    } else setComponent(<Bookings />);
    setAnchorElNav(null);
  };

  return (
    <div style={{ height: "100vh", width: "100%", margin: 10 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page, index) => (
                <MenuItem key={page} onClick={() => handleCloseNavMenu(index)}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box
            width={"100%"}
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
            }}
          >
            {pages.map((page, index) => (
              <Button
                variant="outlined"
                key={page}
                onClick={() => handleCloseNavMenu(index)}
                sx={{ my: 2, color: "black", display: "block", marginLeft: 5 }}
              >
                {page}
              </Button>
            ))}
          </Box>
        </Toolbar>
        {Component}
      </Container>
    </div>
  );
};

export default Staff;
