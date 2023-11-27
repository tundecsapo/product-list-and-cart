import { useContext, useRef } from "react";
import { observer } from "mobx-react-lite";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined";

import { QuantityInput } from "../../common/components/quantityInput/QuantityInput";
import { ProductStoreContext } from "../../common/stores/productsStore";
import { priceFormatter } from "../../common/utils/priceFormatter";
import { SelectedProduct } from "../../common/types";

export const CartCard = observer(({ item }: { item: SelectedProduct }) => {
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
        display: "flex",
        alignItems: "center",
        boxShadow: "none",
        borderBottom: "1px solid rgba(0,0,0,0.2)",
      }}
    >
      <CardMedia
        component="img"
        sx={{ width: 100, maxHeight: 92 }}
        image={item.img}
        alt={`Image of ${item.name}`}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <CardContent sx={{ width: "100%", boxSizing: "border-box" }}>
          <Typography component="div" variant="h6">
            {item.name}
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <span>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                {`${priceFormatter.format(item.price)} each`}
              </Typography>
            </span>
            <Box sx={{ textAlign: "center" }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <div>
                  <QuantityInput
                    item={item}
                    cardRef={quantityRef}
                    isCartInput
                    defaultValue={item.selectedAmount}
                  />
                  <Typography
                    variant="subtitle1"
                    color="error"
                    onClick={removeSelectedProduct}
                    sx={{
                      textDecoration: "underline",
                      cursor: "pointer",
                      px: 2,
                    }}
                  >
                    Remove
                  </Typography>
                </div>
                <Button
                  size="small"
                  color="success"
                  variant="contained"
                  onClick={setSelectedProduct}
                  sx={{
                    p: 0,
                    ml: 2,
                    height: "40px",
                    minWidth: "40px",
                    borderRadius: "50%",
                  }}
                >
                  <RefreshOutlinedIcon />
                </Button>
              </Box>
            </Box>
            <Typography component="div" variant="h6" color="#00005f">
              {priceFormatter.format(item.selectedAmount * item.price)}
            </Typography>
          </Box>
        </CardContent>
      </Box>
    </Card>
  );
});
