import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { NavBar } from "./common/components/navbar/NavBar";
import { ProductListProvider } from "./common/context/ProductListProvider";

import { Cart } from "./pages/cart/Cart";
import { ProductList } from "./pages/products/ProductList";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <NavBar>
        <ProductListProvider>
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="products" element={<ProductList />} />
            <Route path="cart" element={<Cart />} />
          </Routes>
        </ProductListProvider>
      </NavBar>
    </QueryClientProvider>
  );
};

export default App;
