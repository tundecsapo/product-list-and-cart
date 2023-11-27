/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, createContext, useEffect, ReactNode } from "react";
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
  const [page, setPage] = useState(
    parseInt(urlParams.get("page") ?? "1", 10) - 1
  );
  const [size, setSize] = useState(parseInt(urlParams.get("size") ?? "10", 10));

  const { status, data, isFetching, isLoading, isError, isSuccess } =
    useProducts(page, size);

  useEffect(() => {
    if (
      window.location.pathname === "/products" &&
      (!urlParams.get("page") || !urlParams.get("size"))
    ) {
      history.pushState(
        {},
        "",
        `${window.location.pathname}?page=${page + 1}&size=${size}`
      );
    }
  }, []);

  const handlePageChange = (p: number) => {
    setPage(p);
    history.pushState(
      {},
      "",
      `${window.location.pathname}?page=${p + 1}&size=${size}`
    );
  };

  const handleSizeChange = (s: number) => {
    setSize(s);
    setPage(0);
    history.pushState(
      {},
      "",
      `${window.location.pathname}?page=${1}&size=${s}`
    );
  };

  return (
    <ProductListContext.Provider
      value={{
        page,
        setPage: handlePageChange,
        size,
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
