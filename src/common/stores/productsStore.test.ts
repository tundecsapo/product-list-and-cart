/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { ProductStore } from "./productsStore";
import { baseProduct } from "../utils/testUtil";

describe("ProductsStore", () => {
  const productsStore = new ProductStore();
  const storeWithoutProducts = new ProductStore();

  describe("initStore", () => {
    test("should run when initializing", () => {
      expect(localStorage.getItem).toHaveBeenLastCalledWith("dummyStoreCart");
      expect(localStorage.setItem).toHaveBeenLastCalledWith(
        "dummyStoreCart",
        "[]"
      );
    });
  });
  describe("setSelectedProducts", () => {
    test("should set the product at selectedProduct if it is newly selected", () => {
      expect(
        productsStore.selectedProducts.find(
          (prod) => prod.id === baseProduct.id
        )
      ).toBeFalsy();
      productsStore.setSelectedProduct(baseProduct);
      expect(
        productsStore.selectedProducts.find(
          (prod) => prod.id === baseProduct.id
        )
      ).toBeTruthy();
    });

    test("should set new amount to the product if the product was already selected", () => {
      const product = {
        ...baseProduct,
        selectedAmount: 30,
      };
      productsStore.setSelectedProduct(product);
      expect(productsStore.selectedProducts.length).toBe(1);
      expect(
        productsStore.selectedProducts.find((prod) => prod.id === product.id)
          ?.selectedAmount
      ).toBe(30);
      productsStore.setSelectedProduct({
        ...product,
        id: "testId",
        selectedAmount: 40,
      });
    });
  });

  describe("removeProductFromCart", () => {
    test("should remove the product with the right testId from the selected products", () => {
      expect(productsStore.selectedProducts.length).toBe(2);
      expect(
        productsStore.selectedProducts.find((prod) => prod.id === "testId")
      ).toBeTruthy();

      productsStore.removeProductFromCart("testId");
      expect(productsStore.selectedProducts.length).toBe(1);
      expect(
        productsStore.selectedProducts.find((prod) => prod.id === "testId")
      ).toBeFalsy();

      productsStore.setSelectedProduct({
        ...baseProduct,
        id: "dummyProduct",
        price: 2,
        selectedAmount: 50,
      });
    });
  });

  describe("when there are selected products with valid prices", () => {
    test("totalAmount should return the total number of all selected products", () => {
      expect(productsStore.totalAmount).toBe(80);
    });

    test("totalPrice should return the total price of all selected products", () => {
      expect(productsStore.totalPrice).toBe(130);
    });
  });

  describe("when there is no selected product", () => {
    test("totalAmount should return zero if there is no selected product", () => {
      expect(storeWithoutProducts.totalAmount).toBe(0);
    });

    test("totalPrice should return zero if there is no selected product", () => {
      expect(storeWithoutProducts.totalPrice).toBe(0);
    });
  });

  describe("totalPrice if a price is undefined", () => {
    test("gets calculated without the invalid price", () => {
      localStorage.setItem("dummyStoreCart", "[]");
      const storeWithPricelessProduct = new ProductStore();
      const priceLessProduct = {
        ...baseProduct,
        price: undefined,
        selectedAmount: 50,
      };

      storeWithPricelessProduct.setSelectedProduct(priceLessProduct);
      storeWithPricelessProduct.setSelectedProduct({
        ...priceLessProduct,
        id: "67891",
        price: 2,
        selectedAmount: 50,
      });

      expect(storeWithPricelessProduct.totalPrice).toBe(100);
    });
  });

  describe("cleanCart", () => {
    test("should delete all the products from the selected products", () => {
      expect(productsStore.selectedProducts.length).toBe(2);

      productsStore.cleanCart();
      expect(productsStore.selectedProducts.length).toBe(0);
    });
  });
});
