import './App.css'
import Header from '../Header/Header.jsx'
import Products from '../Products/Products.jsx'
import Cart from '../Cart/Cart.jsx';
import Payment from '../Payment/Payment.jsx';

import { CartContextProvider } from '../../store/CartContext.jsx'
import { ProgressContextProvider } from '../../store/ProgressContext.jsx'


function App() {
  return (
    <ProgressContextProvider>
    <CartContextProvider>
      <Header />
      <Products />
      <Cart />
      <Payment />
    </CartContextProvider>
    </ProgressContextProvider>
  )
}

export default App
