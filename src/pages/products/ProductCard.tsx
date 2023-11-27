import { useRef, useContext } from "react";
import { observer } from "mobx-react-lite";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";

import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined";
import RemoveShoppingCartOutlinedIcon from "@mui/icons-material/RemoveShoppingCartOutlined";

import { QuantityInput } from "../../common/components/quantityInput/QuantityInput";
import { ProductStoreContext } from "../../common/stores/productsStore";
import { Product } from "../../common/types";
import { priceFormatter } from "../../common/utils/priceFormatter";

export const ProductCard = observer(({ item }: { item: Product }) => {
  const productStore = useContext(ProductStoreContext);

  const quantityRef = useRef<HTMLDivElement>(null);

  const setSelectedProduct = () => {
    productStore.setSelectedProduct({
      ...item,
      selectedAmount: parseInt(
        (quantityRef?.current?.lastChild as HTMLInputElement)?.value,
        10
      ),
    });
  };

  const removeSelectedProduct = () =>
    productStore.removeProductFromCart(item.id);

  return (
    <Card
      sx={{
        maxWidth: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div>
        <CardMedia
          sx={{ height: { xs: 140, sm: 200 } }}
          image={item.img}
          title={`Image of ${item.name}`}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {item.name}
          </Typography>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={{ color: "#00005f", fontWeight: 700 }}
          >
            {priceFormatter.format(item.price)}
          </Typography>
          <QuantityInput item={item} cardRef={quantityRef} />
        </CardContent>
      </div>
      <CardActions>
        {productStore.selectedProducts.find(
          (product) => product.id === item.id
        ) ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Button
              color="error"
              size="small"
              sx={{ width: "100%" }}
              onClick={removeSelectedProduct}
            >
              <RemoveShoppingCartOutlinedIcon fontSize="small" />
              <Typography variant="caption">Remove</Typography>
            </Button>
            <Button
              size="small"
              variant="contained"
              sx={{ width: "100%" }}
              onClick={setSelectedProduct}
            >
              Update
              <RefreshOutlinedIcon />
            </Button>
          </Box>
        ) : (
          <Button
            size="medium"
            sx={{ width: "100%" }}
            onClick={setSelectedProduct}
          >
            <AddShoppingCartOutlinedIcon />
            Add to cart
          </Button>
        )}
      </CardActions>
    </Card>
  );
});
