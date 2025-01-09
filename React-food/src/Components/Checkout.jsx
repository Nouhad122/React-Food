import React, { useContext } from 'react';
import Button from './Button';
import { currencyFormatter } from '../util/formatter';
import CartContext from '../store/CartContext';
import UserProgressContext from '../store/UserProgressContext';
import Modal from './Modal';
import Input from './Input';
import useHttp from '../Hooks/useHttp';
import { useActionState } from 'react';

const requestConfig = {
    method: "POST",
            headers:{
                "Content-Type": "application/json"
            }
}


const Checkout = () => {
    const cartCtxt= useContext(CartContext);
    const userProgressCtxt = useContext(UserProgressContext);

    const {data, error, sendRequest, clearData} = useHttp("http://localhost:3000/orders", requestConfig);

    const totalCartPrice = cartCtxt.items.reduce((totalPrice, item) =>totalPrice + (item.price * item.quantity), 0);

    const handleCloseModal = () =>{
        userProgressCtxt.hideModal();
    }

    const handleFinishSubmisson = () =>{
        userProgressCtxt.hideModal();
        cartCtxt.clearItems();
        clearData();
    }

    const checkoutAction = async (prevState, fd) =>{
        const customerData = Object.fromEntries(fd.entries());

        await sendRequest(JSON.stringify({
            order:{
                items: cartCtxt.items,
                customer: customerData
            }
        }));   
    }

    const [formState, formAction, pending] = useActionState(checkoutAction, null)

    if(data && !error){
        return (
        <Modal
          open={userProgressCtxt.progress === "checkout"}
          onClose={handleFinishSubmisson}>
            <h2>Success!</h2>
            <p>Your order was submitted successfully</p>
            <p>We will get back to you with more details via email within the next few minutes.</p>
            <p className='modal-actions'><Button onClick={handleCloseModal}>Okay</Button></p>
        </Modal>
        )
    }

  return (
    <Modal
     className="checkout"
     open={userProgressCtxt.progress === "checkout"}
     onClose={handleCloseModal}
     >
        <form action={formAction}>
            <h2>Checkout</h2>
            <p>Total Amount: {currencyFormatter.format(totalCartPrice)}</p>

            <Input label="Full Name" type="text" id="name"/>
            <Input label="E-Mail Adress" type="email" id="email"/>
            <Input label="Street" type="text" id="street"/>
            <div className='control-row'>
                <Input label="Postal code" type="text" id="postal-code"/>
                <Input label="City" type="text" id="city"/>
            </div>

            <p className='modal-actions'>
                {
                    !pending && !error &&
                    <>
                      <Button type="button" textOnly onClick={handleCloseModal}>Close</Button>
                      <Button>Submit Order</Button>
                    </>
                }
                    { pending && <>Submitting the form...</> }
                    { error && <>{error}</>} 
                </p>
            
        </form>
    </Modal>
  )
}

export default Checkout
