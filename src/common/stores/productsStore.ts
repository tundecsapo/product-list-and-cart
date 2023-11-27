import { createContext, useMemo } from "react";
import { action, autorun, computed, makeObservable, observable } from "mobx";
import { SelectedProduct } from "../types";

export class ProductStore {
  selectedProducts: SelectedProduct[] = [];

  constructor() {
    makeObservable<ProductStore>(this, {
      selectedProducts: observable,
      totalAmount: computed,
      totalPrice: computed,
      setSelectedProduct: action,
      removeProductFromCart: action,
      cleanCart: action,
    });

    this.initStore();
  }

  setSelectedProduct(item: SelectedProduct) {
    const matchingProduct = (elem: SelectedProduct) => elem.id === item.id;
    const selectedItemIndex = this.selectedProducts.findIndex(matchingProduct);

    if (selectedItemIndex > -1) {
      this.selectedProducts[selectedItemIndex] = item;
    } else {
      this.selectedProducts.push(item);
    }
  }

  removeProductFromCart(itemId: string) {
    const filteredList = this.selectedProducts.filter(
      (elem) => elem.id !== itemId
    );
    this.selectedProducts = filteredList;
  }

  cleanCart() {
    this.selectedProducts = [];
  }

  initStore() {
    const savedCart =
      JSON.parse(localStorage.getItem("dummyStoreCart") ?? "[]") || [];
    this.selectedProducts = savedCart;

    autorun(() => {
      localStorage.setItem(
        "dummyStoreCart",
        JSON.stringify(this.selectedProducts)
      );
    });
  }

  get totalAmount(): number {
    return this.selectedProducts
      .map((product) => product.selectedAmount)
      .reduce((a, b) => a + b, 0);
  }

  get totalPrice(): number {
    return this.selectedProducts
      .map((product) =>
        product.price ? product.price * product.selectedAmount : 0
      )
      .reduce((a, b) => a + b, 0);
  }
}

export const ProductStoreContext = createContext(new ProductStore());

export const useProductStore = () => {
  const productStore = useMemo(() => new ProductStore(), []);
  return productStore;
};
