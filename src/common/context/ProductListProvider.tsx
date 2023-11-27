/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, createContext, ReactNode } from "react";
import { useProducts } from "../../pages/products/hooks/useProducts";
import { Product } from "../types";

export const ProductListContext = createContext({
  page: 1,
  size: 10,
  setPage: (page: number) => {},
  setSize: (size: number) => {},
  status: "idle",
  data: [] as Product[] | null | undefined,
  isFetching: false,
  isLoading: false,
  isError: false,
  isSuccess: false,
});

export const ProductListProvider = ({ children }: { children: ReactNode }) => {
  const urlParams = new URLSearchParams(window.location.search);
  const [params, setParams] = useState({
    page: parseInt(urlParams.get("page") ?? "1", 10) - 1,
    size: parseInt(urlParams.get("size") ?? "10", 10),
  });

  const { status, data, isFetching, isLoading, isError, isSuccess } =
    useProducts(params.page, params.size);

  if (
    window.location.pathname === "/products" &&
    (!urlParams.get("page") || !urlParams.get("size"))
  ) {
    history.pushState(
      {},
      "",
      `${window.location.pathname}?page=${params.page + 1}&size=${params.size}`
    );
  }

  const handlePageChange = (p: number) => {
    setParams({ page: p, size: params.size });
    history.pushState(
      {},
      "",
      `${window.location.pathname}?page=${p + 1}&size=${params.size}`
    );
  };

  const handleSizeChange = (s: number) => {
    setParams({ page: 0, size: s });
    history.pushState(
      {},
      "",
      `${window.location.pathname}?page=${1}&size=${s}`
    );
  };

  return (
    <ProductListContext.Provider
      value={{
        page: params.page,
        setPage: handlePageChange,
        size: params.size,
        setSize: handleSizeChange,
        status,
        data,
        isFetching,
        isLoading,
        isError,
        isSuccess,
      }}
    >
      {children}
    </ProductListContext.Provider>
  );
};
