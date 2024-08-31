import { useContext } from "react";
import CartContext from "../../store/CartContext";
import ProgressContext from "../../store/ProgressContext";
import Modal from "../Modal/Modal";

export default function Payment() {
  const cartContext = useContext(CartContext);
  const progressContext = useContext(ProgressContext);

  const cartTotal = cartContext.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.Price,
    0
  );

  function handleClose(){
    progressContext.hidePayment();
  }

  function handleSubmit(event){
    event.preventDefault();
  }

  return (
    <Modal className='payment' open={progressContext.progress === 'payment'}>
      <form onSubmit={handleSubmit}>
        <h2>Płatność</h2>
        <p>Kwota końcowa: {cartTotal} zł</p>

        <input label="Wprowadź 5-cyfrowy kod BLIK" type="text" id="blik" />

        <button className="paymentCancel" onClick={handleClose}>Anuluj</button>
        <button className="pay">Zapłać</button>
      </form>
    </Modal>
  );
}
