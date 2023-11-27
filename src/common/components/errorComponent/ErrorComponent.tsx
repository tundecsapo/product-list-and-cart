import { CustomContainer } from "../customContainer/CustomContainer";
import Typography from "@mui/material/Typography";

export const ErrorComponent = () => {
  return (
    <CustomContainer>
      <Typography variant="h5" sx={{ mt: 3 }}>
        There was a problem while listing the products. Please, try again later.
      </Typography>
    </CustomContainer>
  );
};
