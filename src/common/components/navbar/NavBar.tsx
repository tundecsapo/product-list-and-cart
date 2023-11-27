import { useContext, useState, MouseEvent, ReactNode } from "react";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Drawer from "@mui/material/Drawer";
import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

import assets from "../../../assets";
import { ProductStoreContext } from "../../stores/productsStore";
import { CartDialog } from "../cartDialog/CartDialog";

const pages = [{ name: "Products", url: "/products?page=1&size=10" }];
const settings = ["Profile", "Setting", "Logout"];

const menuButtonStyle = {
  border: "2px solid #0d3a93",
  borderRadius: "50%",
  color: "#0d3a93",
  width: "40px",
  height: "40px",
};

export const NavBar = observer(({ children }: { children: ReactNode }) => {
  const productStore = useContext(ProductStoreContext);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [anchorElCart, setAnchorElCart] = useState<null | HTMLElement>(null);

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleOpenCartPreview = (event: MouseEvent<HTMLElement>) => {
    setAnchorElCart(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleCloseCartPreview = () => {
    setAnchorElCart(null);
  };
  const drawerWidth = 240;

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <List>
        {pages.map((item) => (
          <ListItem
            component={Link}
            key={item.name}
            disablePadding
            to={item.url}
          >
            <ListItemButton
              sx={{
                textAlign: "center",
                color: "#0d3a93",
                backgroundColor: "rgba(13, 58, 147, 0.2)",
              }}
            >
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window.document.body : undefined;

  return (
    <>
      <AppBar position="fixed" style={{ background: "white" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box
              component={Link}
              to="/"
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                color: "#0d3a93",
              }}
            >
              <Icon component="img" src={assets.storeImage} sx={{ mr: 1 }} />
              <Typography
                variant="h6"
                noWrap
                sx={{
                  mr: 2,
                  fontFamily: "Arial",
                  fontWeight: 700,
                  color: "inherit",
                  textTransform: "uppercase",
                }}
              >
                Store
              </Typography>
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="Main menu"
                aria-controls="menu-navbar"
                onClick={handleDrawerToggle}
              >
                <MenuIcon />
              </IconButton>
            </Box>
            <Box
              component={Link}
              to="/"
              sx={{
                display: { xs: "flex", md: "none" },
                alignItems: "center",
                color: "#0d3a93",
              }}
            >
              <Icon component="img" src={assets.storeImage} sx={{ mr: 1 }} />
              <Typography
                variant="h5"
                noWrap
                sx={{
                  mr: 2,
                  flexGrow: 1,
                  fontFamily: "Arial",
                  fontWeight: 700,
                  color: "inherit",
                  textTransform: "uppercase",
                }}
              >
                Store
              </Typography>
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  component={Link}
                  key={page.name}
                  sx={{ my: 2, color: "#0d3a93", display: "block" }}
                  to={page.url}
                >
                  {page.name}
                </Button>
              ))}
            </Box>

            <Box
              sx={{ display: "flex", flexGrow: 1, justifyContent: "flex-end" }}
            >
              <Tooltip title="My Accont">
                <IconButton
                  onClick={handleOpenUserMenu}
                  sx={{
                    p: 0,
                    ...menuButtonStyle,
                    marginRight: "8px",
                  }}
                >
                  <PersonOutlineIcon />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="user-account-menu"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} sx={{ cursor: "not-allowed" }}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>

              <Tooltip title="View Cart">
                <Badge badgeContent={productStore.totalAmount} color="primary">
                  <IconButton
                    sx={{ p: 0, ...menuButtonStyle }}
                    onClick={handleOpenCartPreview}
                  >
                    <ShoppingCartOutlinedIcon />
                  </IconButton>
                </Badge>
              </Tooltip>
              <CartDialog
                handleCloseCartPreview={handleCloseCartPreview}
                anchorElCart={anchorElCart}
              />
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>
      {children}
    </>
  );
});
