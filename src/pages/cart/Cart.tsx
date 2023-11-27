import { useContext } from "react";
import { observer } from "mobx-react-lite";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { ProductStoreContext } from "../../common/stores/productsStore";
import { priceFormatter } from "../../common/utils/priceFormatter";
import { CartCard } from "./CartCard";

export const Cart = observer(() => {
  const productStore = useContext(ProductStoreContext);

  return (
    <Container maxWidth="xl" sx={{ p: 4, pt: 12 }}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 1, md: 2 }}>
        <Grid item xs={1}>
          <Typography
            variant="h6"
            sx={{
              mb: 3,
              fontFamily: "Arial",
              fontWeight: 700,
              color: "inherit",
              textTransform: "uppercase",
            }}
          >
            {`Your Cart (${
              productStore.selectedProducts?.length ?? 0
            } products)`}
          </Typography>
          <Stack spacing={0}>
            {(productStore.selectedProducts ?? []).map((item) => (
              <CartCard item={item} key={item.id} />
            ))}
          </Stack>
        </Grid>
        <Grid item xs={1}>
          <Stack sx={{ pt: { xs: 0, md: 7 } }}>
            <Card sx={{ p: 2 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: "Arial",
                    fontWeight: 700,
                    color: "#00005f",
                    textTransform: "uppercase",
                  }}
                >
                  TOTAL
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: "Arial",
                    fontWeight: 700,
                    color: "#00005f",
                    textTransform: "uppercase",
                  }}
                >
                  {priceFormatter.format(productStore.totalPrice)}
                </Typography>
              </Box>
            </Card>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
});
