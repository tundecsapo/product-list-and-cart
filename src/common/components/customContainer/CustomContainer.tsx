import { ReactNode } from "react";
import Container from "@mui/material/Container";

export const CustomContainer = ({ children }: { children: ReactNode }) => (
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
    {children}
  </Container>
);
