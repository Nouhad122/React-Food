import React from 'react';
import logo from "../assets/logo.jpg";
import Button from './Button';

const Header = () => {
  return (
    <header id='main-header'>
        <div id='title'>
            <img src={logo} alt='food restaurant logo'/>
            <h1>React Food</h1>
        </div>
        
        <nav>
          <Button textOnly>Cart (0)</Button>
        </nav>
      
    </header>
  )
}

export default Header
