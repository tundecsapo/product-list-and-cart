import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

export const Loader = ({ text }: { text: string }) => {
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
      <CircularProgress size={140} />
      <Typography variant="h5" sx={{ mt: 3 }}>
        {text}
      </Typography>
    </Container>
  );
};
