import { createContext, useReducer } from "react";

const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (ID) => {},
});

function cartReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    const productIndex = state.items.findIndex(
      (item) => item.ID === action.item.ID
    );

    const updatedItems = [...state.items];

    if (productIndex > -1) {
      const existingItem = state.items[productIndex];

      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };
      updatedItems[productIndex] = updatedItem;
    } else {
      updatedItems.push({ ...action.item, quantity: 1 });
    }

    return { ...state, items: updatedItems };
  }

  if (action.type === "REMOVE_ITEM") {
    const productIndex = state.items.findIndex(
      (item) => item.ID === action.ID
    );
    const updatedItems = [...state.items];

    const existingProduct = state.items[productIndex];

    if(existingProduct.quantity === 1){
        

        updatedItems.splice(productIndex, 1);
    } else {
       
        const updatedItem = {...existingProduct,
            quantity: existingProduct.quantity - 1,
        };

        updatedItems[productIndex] = updatedItem;
    }

    return { ...state, items: updatedItems};
  }

  return state;
}

export function CartContextProvider({ children }) {
  const [cart, dispatchCartAction ] = useReducer(cartReducer, { items: [] });

  function addItem(item) {
    dispatchCartAction({type: 'ADD_ITEM', item});
  }

  function removeItem(ID) {
    dispatchCartAction({type: 'REMOVE_ITEM', ID})
  }

  const cartContext = {
    items: cart.items,
    addItem,
    removeItem
  };

  console.log(cartContext);

  return (<CartContext.Provider value={cartContext}>{children}</CartContext.Provider>);
}

export default CartContext;
