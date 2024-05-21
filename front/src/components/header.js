import React from "react";
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Container,
  Box,
  Typography,
} from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";
import logo from "./../assets/img/Ujdp_Logo.svg";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const Header = () => {
  const location = useLocation();

  const isShopPage = location.pathname === "/shop";

  const navLinks = [
    { label: "Accueil", path: "/home" },
    { label: "Articles", path: "/blog" },
    { label: "Boutique", path: "/shop" },
    { label: "Dons", path: "/donation" },
  ];

  return (
    <AppBar
      position="static"
      sx={{
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "transparent",
        padding: "0 20px"
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box
        component="img"
        src={logo}
        alt="Un jour de paix logo"
        sx={{
          width: 100,
          objectFit: "cover",
          bgcolor:"#4CAF50"
        }}
      />
      <Typography variant="h6" sx={{ color: "#4CAF50", ml: 4}}>
        UnJourDePaix
      </Typography>
    </Box>
      <Toolbar sx={{ width:500, flexDirection:"row",justifyContent: "space-between"}}>
        {navLinks.map((link, index) => (
          <Button key={index} color="info" component={NavLink} to={link.path}>
            {link.label}
          </Button>
        ))}
      </Toolbar>
      {isShopPage && (
        <Container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: 0,
            width: 100
          }}
        >
          <IconButton size="large" aria-label="search" color="info">
            <SearchIcon />
          </IconButton>
          <IconButton size="large" aria-label="shoppingBag" color="info">
            <ShoppingCartIcon />
          </IconButton>
        </Container>
      )}
    </AppBar>
  );
};

export default Header;
