import React, { useContext } from 'react';
import logo from "../assets/logo.jpg";
import Button from './Button';
import CartContext from '../store/CartContext';
import UserProgressContext from '../store/UserProgressContext';

const Header = () => {
  const cartCtxt = useContext(CartContext);
  const userProgressCtxt = useContext(UserProgressContext);

    const handleOpenModal = () =>{
        userProgressCtxt.showModal();
    }
  const totalCartItems = cartCtxt.items.reduce((totalItemsInCart, item) => {
    return totalItemsInCart + item.quantity
  }, 0);
  return (
    <header id='main-header'>
        <div id='title'>
            <img src={logo} alt='food restaurant logo'/>
            <h1>React Food</h1>
        </div>
        
        <nav>
          <Button textOnly onClick={handleOpenModal}>Cart ({totalCartItems})</Button>
        </nav>
      
    </header>
  )
}

export default Header
