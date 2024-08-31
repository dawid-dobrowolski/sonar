import { useContext } from 'react'
import './Product.css'
import CartContext from '../../store/CartContext';

export default function Product({product}) {
  const cartContext = useContext(CartContext);

  function handleAddProductToCart() {
    cartContext.addItem(product)
  }

  return (
    <>
    <li>
      <div>
        <img src = {product.Url}/>
        <div>
          <h3>{product.Name}</h3>
          <p id="productDescription">{product.Description}</p>
        </div>
        <p id="productPrice">{product.Price} zł</p>
        <button onClick={handleAddProductToCart}>Dodaj do Koszyka</button>
      </div>
    </li>
    </>
  )
}