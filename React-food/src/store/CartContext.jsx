import React, { Children, createContext, useReducer } from 'react';

 const CartContext = createContext({
    items: [],
    addItem: (item) => {},
    removeItem: (id) =>{}
});

 const cartReducer = (state, action) =>{
    if(action.type === "ADD_ITEM"){
        const existingItemIndex = state.items.findIndex(item => item.id === action.item.id);
        const updatedItems = [...state.items];
        if(existingItemIndex > -1){
            const existingItem = state.items[existingItemIndex];
            const updatedItem = {
                ...existingItem,
                quantity: existingItem.quantity + 1
            };
            updatedItems[existingItem] = updatedItem;
        }
        else{
            updatedItems(...action.items, {quantity: 1})
        }
        return {...state, items: updatedItems};
    }

    if(action.type === "REMOVE_ITEM"){
        //remove item
    }
    return state;
 }

export const CartContextProvider = ({ children }) => {
    useReducer(cartReducer, {items:[]});
  return <CartContext.Provider>{children}</CartContext.Provider>
}

export default CartContext
