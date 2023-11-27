import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

export const ErrorComponent = () => {
  return (
    <Container
      maxWidth="xl"
      sx={{
        p: 4,
        pt: 12,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h5" sx={{ mt: 3 }}>
        There was a problem while listing the products. Please, try again later.
      </Typography>
    </Container>
  );
};
