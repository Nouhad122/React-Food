import React, { useContext } from 'react';
import Button from './Button';
import { currencyFormatter } from '../util/formatter';
import CartContext from '../store/CartContext';
import UserProgressContext from '../store/UserProgressContext';
import Modal from './Modal';
import Input from './Input';


const Checkout = () => {
    const cartCtxt= useContext(CartContext);
    const userProgressCtxt = useContext(UserProgressContext);
    const totalCartPrice = cartCtxt.items.reduce((totalPrice, item) =>totalPrice + (item.price * item.quantity), 0);

    const handleCloseModal = () =>{
        userProgressCtxt.hideModal();
    }
  return (
    <Modal className="checkout" open={userProgressCtxt.progress === "checkout"} onClose={handleCloseModal}>
        <form>
            <h2>Checkout</h2>
            <p>Total Amount: {currencyFormatter.format(totalCartPrice)}</p>

            <Input label="Full Name" type="text" id="full-name"/>
            <Input label="E-Mail Adress" type="email" id="email"/>
            <Input label="Street" type="text" id="street"/>
            <div className='control-row'>
                <Input label="Postal code" type="text" id="postal-code"/>
                <Input label="City" type="text" id="city"/>
            </div>
            <p className='modal-actions'>
                <Button type="button" textOnly onClick={handleCloseModal}>Close</Button>
                <Button>Submit Order</Button>
            </p>
        </form>
    </Modal>
  )
}

export default Checkout
