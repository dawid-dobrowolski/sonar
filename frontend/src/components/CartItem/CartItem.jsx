export default function CartItem({name, price, quantity, onDecrease, onIncrease}){
    return (
        <li>
            <p>{name} - {quantity} sztuk</p>
            <div className="cartModify">
                <button className="decreaseButton" onClick={onDecrease}>-</button>
                <span>{quantity}</span>
                <button className="increaseButton" onClick={onIncrease}>+</button>
            </div>
            </li>
    );
}