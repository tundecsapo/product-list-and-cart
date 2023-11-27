import { useContext } from "react";
import { observer } from "mobx-react-lite";

import TablePagination from "@mui/material/TablePagination";

import { ProductListContext } from "../../context/ProductListProvider";

export const Pagination = observer(() => {
  const { page, size, setPage, setSize, data } = useContext(ProductListContext);

  return (
    <TablePagination
      component="div"
      rowsPerPageOptions={[5, 10, 25, 50, 100]}
      showFirstButton
      showLastButton
      count={(data ?? []).length}
      labelRowsPerPage="Products per page:"
      page={page}
      onPageChange={(e, newPage) => setPage(newPage)}
      rowsPerPage={size}
      onRowsPerPageChange={(e) => setSize(parseInt(e.target.value, 10))}
    />
  );
});
