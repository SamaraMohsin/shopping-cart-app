import "./App.css";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import ProductList from "./Pages/ProductList";
import ProductDetails from "./Pages/ProductDetails";
import { useEffect, useState } from "react";
import Header from "./Components/Header";
import Cart from "./Pages/Cart";
import Thanks from "./Pages/Thanks";

function App() {
  const [productList, setproductList] = useState([]);

  // const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/products/all");
        const data = await response.json();
        // console.log(data)
        setproductList(data);
      } catch (e) {
        console.log("I caughgt this bug");
        console.log(e);
      }
    };
    fetchData();
  }, []);

  function handleAddToCart(item, quantity) {
    if (quantity > 0) {
      const totalPrice = item.prodPrice * quantity;

      fetch("http://localhost:8081/api/carts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prodName: item.prodName,
          prodImg: item.prodImg,
          prodQuantity: quantity,
          unitPrice: item.prodPrice,
          totalPrice: totalPrice,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.log("There was a problem with the fetch operation:", error);
        });
    }
    // navigate('/cart')
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route
              index
              element={
                <ProductList
                  productLists={productList}
                  handleAddToCart={handleAddToCart}
                />
              }
            ></Route>
            <Route
              element={<ProductDetails />}
              path="/ProductDetail"
            ></Route>
            <Route element={<Cart />} path="/Cart"></Route>
            <Route element= {<Thanks />} path = "/thanks"></Route>
          </Route>
        </Routes>
      </BrowserRouter>

      {/* <ProductList /> */}
    </>
  );
}

export default App;
