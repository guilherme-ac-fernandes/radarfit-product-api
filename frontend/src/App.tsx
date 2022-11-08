import Header from "./components/Header";
import DisplayProducts from "./components/DisplayProducts";
import ProductProvider from "./context/ProductProvider";

export default function App() {
  return (
    <ProductProvider>
      <Header />
      <DisplayProducts />
    </ProductProvider>
  );
}
