import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { SelectedProduct } from "../../types";
import { priceFormatter } from "../../utils/priceFormatter";

export const CartDialogCard = ({ item }: { item: SelectedProduct }) => {
  return (
    <Card
      sx={{
        display: "flex",
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
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="body1">
            {item.name}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            {`${item.selectedAmount} x ${priceFormatter.format(item.price)}`}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
};
