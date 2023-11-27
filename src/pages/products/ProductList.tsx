import { useContext } from "react";
import { observer } from "mobx-react-lite";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { ErrorComponent } from "../../common/components/errorComponent/ErrorComponent";
import { Loader } from "../../common/components/loader/Loader";
import { Pagination } from "../../common/components/pagination/Pagination";
import { ProductListContext } from "../../common/context/ProductListProvider";
import { ProductCard } from "./ProductCard";

export const ProductList = observer(() => {
  const { data, isFetching, isLoading, isError, page, size } =
    useContext(ProductListContext);

  if (isLoading || isFetching) return <Loader text="Products are loading" />;

  if (isError) return <ErrorComponent />;

  return (
    <Container maxWidth="xl" sx={{ p: 4, pt: 12 }}>
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
        {`All Products (${data?.length ?? 0})`}
      </Typography>
      {data?.length ? (
        <>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 2, sm: 3, md: 4, lg: 5 }}
          >
            {(data.slice(page * size, (page + 1) * size) || []).map((item) => (
              <Grid item xs={1} key={item.id}>
                <ProductCard item={item} />
              </Grid>
            ))}
          </Grid>
          <Pagination />
        </>
      ) : (
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
          There is no product to show.
        </Typography>
      )}
    </Container>
  );
});
