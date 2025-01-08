import React, { useContext } from 'react';
import Modal from './Modal';
import CartContext from '../store/CartContext';
import UserProgressContext from '../store/UserProgressContext';
import Button from './Button';
import { currencyFormatter } from '../util/formatter';
import CartItems from './CartItem';


const Cart = () => {
    const cartCtxt= useContext(CartContext);
    const userProgressCtxt = useContext(UserProgressContext);
    const totalCartPrice = cartCtxt.items.reduce((totalPrice, item) =>totalPrice + (item.price * item.quantity), 0);

    const handleCloseModal = () =>{
        userProgressCtxt.hideModal();
    }
  return (
    <Modal className="cart" open={userProgressCtxt.progress === "cart"}>
        <CartItems name={cartCtxt.items.name}/>
        <p>{currencyFormatter.format(totalCartPrice)}</p>
        <Button textOnly onClick={handleCloseModal}>Close</Button>
        <Button>Checkout</Button>
    </Modal>
  )
}

export default Cart
