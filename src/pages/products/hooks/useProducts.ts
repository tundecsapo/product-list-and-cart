/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import { useQuery } from "react-query";
import { Product } from "../../../common/types";

const getProducts = async (page: number, size: number) => {
  const baseUrl =
    "https://cas5-0-urlprotect.trendmicro.com/wis/clicktime/v1/query?url=https%3a%2f%2f63c10327716562671870f959.mockapi.io%2fproducts&umid=f77e5fcb-c814-496d-abb3-aae9dc553466&auth=3bd1ed0ea25e030aebac2180cda48b2d7a1ccc30-7da0a56c2af3db6857400ce6b9dbe5df1b55d2fd";

  const { data } = await axios.get<Product[]>(baseUrl);

  // If the endpoint accepted parameters, the request would look something like this:
  // const { data } = await axios.get(`${baseUrl}?page=${page}&size=${size}`);

  return data;
};

export function useProducts(page: number, size: number) {
  return useQuery("products", () => getProducts(page, size), {
    staleTime: Infinity,
  });
}
