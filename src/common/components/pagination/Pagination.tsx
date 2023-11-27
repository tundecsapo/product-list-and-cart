import { useContext, ChangeEvent, MouseEvent } from "react";
import { observer } from "mobx-react-lite";

import TablePagination from "@mui/material/TablePagination";

import { ProductListContext } from "../../context/ProductListProvider";

export const Pagination = observer(() => {
  const { page, size, setPage, setSize, data } = useContext(ProductListContext);

  const handlePageChange = (
    event: MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleSizeChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSize(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TablePagination
      component="div"
      rowsPerPageOptions={[5, 10, 25, 50, 100]}
      showFirstButton
      showLastButton
      count={(data ?? []).length}
      labelRowsPerPage="Products per page:"
      page={page}
      onPageChange={handlePageChange}
      rowsPerPage={size}
      onRowsPerPageChange={handleSizeChange}
    />
  );
});
