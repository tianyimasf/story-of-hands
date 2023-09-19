import * as React from "react";
import "./fonts.css";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { IconButton } from "@mui/material";
import MoreIcon from "@mui/icons-material/MoreVert";

export default function NavigationBar() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = "primary-game-mode-menu";
  const renderMenu = (
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
      sx={{
        "& .MuiMenu-paper": {
          backgroundColor: "#F1F0E8",
        },
      }}
    >
      <MenuItem onClick={handleMenuClose}>
        <Typography
          component="div"
          sx={{
            fontFamily: "Gloria Hallelujah",
          }}
        >
          <a
            href="/createdrawingseries"
            style={{ textDecoration: "none", color: "#96B6C5" }}
          >
            Create Hand Series
          </a>
        </Typography>
      </MenuItem>
      <MenuItem
        onClick={handleMenuClose}
        sx={{
          color: "#96B6C5",
          fontFamily: "Gloria Hallelujah",
        }}
      >
        Write a Story
      </MenuItem>
      <MenuItem
        onClick={handleMenuClose}
        sx={{
          color: "#96B6C5",
          fontFamily: "Gloria Hallelujah",
        }}
      >
        My Hand Series
      </MenuItem>
    </Menu>
  );

  return (
    <Box>
      <AppBar
        position="static"
        style={{ background: "transparent", boxShadow: "none" }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              fontFamily: "Tangerine",
              fontSize: "38px",
              paddingLeft: "5vh",
              paddingTop: "2.5vh",
            }}
          >
            <a href="/" style={{ color: "#96B6C5", textDecoration: "none" }}>
              Story of Hands
            </a>
          </Typography>
          <Box
            sx={{
              display: {
                xs: "none",
                sm: "block",
                paddingTop: "1vh",
                paddingRight: "5vh",
              },
            }}
          >
            <Button
              href="/login"
              sx={{
                color: "#96B6C5",
                fontFamily: "Gloria Hallelujah",
                fontSize: "18px",
                paddingRight: "2vh",
              }}
            >
              Login
            </Button>
            <Button
              href="/about"
              sx={{
                color: "#96B6C5",
                fontFamily: "Gloria Hallelujah",
                fontSize: "18px",
                paddingRight: "2vh",
              }}
            >
              About
            </Button>
            <IconButton
              size="large"
              edge="end"
              aria-label="display game modes"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
            >
              <MoreIcon
                sx={{
                  color: "#96B6C5",
                }}
              />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </Box>
  );
}
