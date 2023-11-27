import { useContext } from "react";
import { Link } from "react-router-dom";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import Typography from "@mui/material/Typography";
import RemoveShoppingCartOutlinedIcon from "@mui/icons-material/RemoveShoppingCartOutlined";

import { ProductStoreContext } from "../../stores/productsStore";
import { priceFormatter } from "../../utils/priceFormatter";
import { CartDialogCard } from "./CartDialogCard";

export const CartDialog = ({
  handleCloseCartPreview,
  anchorElCart,
}: {
  handleCloseCartPreview: () => void;
  anchorElCart: null | HTMLElement;
}) => {
  const productStore = useContext(ProductStoreContext);

  return (
    <Menu
      sx={{ mt: "45px", pb: 0 }}
      id="cart-preview"
      anchorEl={anchorElCart}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(anchorElCart)}
      onClose={handleCloseCartPreview}
    >
      {productStore.selectedProducts.length ? (
        <Typography
          variant="body1"
          sx={{ p: 2, borderBottom: "1px solid rgba(0,0,0,0.2)" }}
        >
          Your cart:
        </Typography>
      ) : null}
      {productStore.selectedProducts.slice(0, 3).map((item) => (
        <CartDialogCard key={item.id} item={item} />
      ))}
      {productStore.selectedProducts.length > 3 && (
        <Typography
          variant="caption"
          sx={{
            display: "block",
            width: "calc(100% - 16px)",
            m: 2,
            ml: 0,
            textAlign: "right",
          }}
        >{`and ${productStore.selectedProducts.length - 3} more product${
          productStore.selectedProducts.length - 3 > 1 ? "s" : ""
        }`}</Typography>
      )}
      {productStore.selectedProducts.length ? (
        <div>
          <Button
            component={Link}
            to="/cart"
            variant="contained"
            sx={{ width: "100%", color: "white" }}
            onClick={handleCloseCartPreview}
          >
            View Cart
          </Button>
          <Button
            color="error"
            sx={{ width: "100%" }}
            onClick={() => productStore.cleanCart()}
          >
            <RemoveShoppingCartOutlinedIcon />
            Clean Cart
          </Button>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              p: 2,
              pb: 1,
            }}
          >
            <Typography variant="body1">Total:</Typography>
            <Typography
              variant="h6"
              sx={{ textAlign: "right", color: "#00005f", fontWeight: 700 }}
            >
              {priceFormatter.format(productStore.totalPrice)}
            </Typography>
          </Box>
        </div>
      ) : (
        <Typography variant="body1" sx={{ p: 2 }}>
          Your cart is empty
        </Typography>
      )}
    </Menu>
  );
};
