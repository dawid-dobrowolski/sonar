import { useEffect, useState } from "react";
import Product from "../Product/Product.jsx";

import './Products.css'

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchMeals() {
      const response = await fetch("http://localhost:1323/product/getAll");

      const productList = await response.json();
      console.log(productList);
      setProducts(productList);
    }

    fetchMeals();
  }, []);

  return (
    <ul className="productDetailsList">
      {products.map((product) => (
        <Product key={product.ID} product = {product} />
      ))}
    </ul>
  );
}

export default Products;
