import { useContext } from 'react';
import Modal from '../Modal/Modal.jsx';
import CartContext from '../../store/CartContext';
import ProgressContext from '../../store/ProgressContext.jsx';
import CartItem from '../CartItem/CartItem.jsx';

export default function Cart(){
    const cartContext = useContext(CartContext);
    const progressContext = useContext(ProgressContext);

    function handleCloseOfCart(){
        progressContext.hideCart();
    }

    function handleGoToPayment(){
        progressContext.showPayment();
    }

    const cartTotal = cartContext.items.reduce((totalPrice, item) => totalPrice + item.quantity * item.Price, 0)
    return <Modal className='cart' open={progressContext.progress === 'cart'}>
        <h2>Koszyk</h2>
        <ul>
        {cartContext.items.map((item) => <CartItem 
        key = {item.ID} 
        name = {item.Name}
        quantity={item.quantity}
        price = {item.Price}
        onDecrease = {() => cartContext.removeItem(item.ID)} 
        onIncrease = { () => cartContext.addItem(item)}
        />)}
        </ul>
        <p className='cart-total'>{cartTotal} zł</p>
        <button className='closeButton' onClick={handleCloseOfCart}>Zamknij</button>
        {cartContext.items.length > 0 && <button className='paymentGoButton' onClick={handleGoToPayment}>Przejdź do płatności</button>}
    </Modal>
}