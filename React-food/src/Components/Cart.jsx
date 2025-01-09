import React, { useContext } from 'react';
import Modal from './Modal';
import CartContext from '../store/CartContext';
import UserProgressContext from '../store/UserProgressContext';
import Button from './Button';
import { currencyFormatter } from '../util/formatter';
import CartItem from './CartItem';


const Cart = () => {
    const cartCtxt= useContext(CartContext);
    const userProgressCtxt = useContext(UserProgressContext);
    const totalCartPrice = cartCtxt.items.reduce((totalPrice, item) =>totalPrice + (item.price * item.quantity), 0);

    const handleIncreaseQuantity = (item) =>{
        cartCtxt.addItem(item);
    }
    const handleDecreaseQuantity = (id) =>{
        cartCtxt.removeItem(id);
    }

    const handleCloseModal = () =>{
        userProgressCtxt.hideModal();
    }
    
    const handleCheckout = () =>{
        userProgressCtxt.showCheckout();
    }
  return (
    <Modal
     className="cart"
     open={userProgressCtxt.progress === "cart"} 
     onClose={userProgressCtxt.progress === "cart" ? handleCloseModal : null}
    >
        {
            cartCtxt.items.map(item =>(
                <CartItem
                  key={item.id}
                  name={item.name} 
                  price={item.price} 
                  quantity={item.quantity} 
                  onIncrease={() => handleIncreaseQuantity(item)}
                  onDecrease={() => handleDecreaseQuantity(item.id)}
                />
            ))
        }
        <p>{currencyFormatter.format(totalCartPrice)}</p>
        <p className='modal-actions'>
            <Button textOnly onClick={handleCloseModal}>Close</Button>
            {
                cartCtxt.items.length > 0 &&
                 <Button onClick={handleCheckout}>Go To Checkout</Button>
            }
        </p>
    </Modal>
  )
}

export default Cart
