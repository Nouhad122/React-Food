import React, { createContext, useReducer } from 'react';

const CartContext = createContext({
    items: [],
    addItem: (item) => {},
    removeItem: (id) => {}
})

const cartReducer = (state, action) =>{
    if(action.type === "ADD_ITEM"){
       const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id);

       const updatedItems = [...state.items];
       if(existingCartItemIndex > -1){
        const existingCartItem = state.items[existingCartItemIndex];
        const updatedItem = {
            ...existingCartItem,
            quantity: existingCartItem.quantity + 1
        }
        updatedItems[existingCartItemIndex] = updatedItem;
       }
       else{
        updatedItems.push({...action.item, quantity: 1});
       }
       return {state, items: updatedItems };
    }

    if(action.type === "REMOVE_ITEM"){
       const existingCartItemIndex = state.items.findIndex(item => item.id === action.id);
       const existingCartItem = state.items[existingCartItemIndex];
       const updatedItems = [...state.items];
        if(existingCartItem.quantity === 1){
            updatedItems.splice(existingCartItemIndex, 1);
        }
        else{
            const updatedItem ={
                ...existingCartItem,
                quantity: existingCartItem.quantity - 1
            }
            updatedItems[existingCartItemIndex] = updatedItem;
        }
        return {...state, items: updatedItems};
    }

    return state;
}

export const CartContextProvider = ({ children }) => {
   const [cart, dispatchCartAction] = useReducer(cartReducer, {items: []});

   const addItem = (item) =>{
        dispatchCartAction({type: "ADD_ITEM", item});
   }
   const removeItem = (id) =>{
        dispatchCartAction({type: "REMOVE_ITEM", id});
   }

   const cartCtxtValue = {
    items: cart.items,
    addItem,
    removeItem
   };

  return (
    <CartContext.Provider value={cartCtxtValue}>
      {children}
    </CartContext.Provider>
  )
}

export default CartContext;
