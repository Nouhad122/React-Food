import React from 'react';
import { currencyFormatter } from '../util/formatter';

const CartItem = ({name, price, quantity, onIncrease, onDecrease}) => {
  return (
    <>
    <li className='cart-item'>
      <p>{name} - {quantity} x {currencyFormatter.format(price)}</p>
    
      <p className='cart-item-actions'>
        <button onClick={onDecrease}>-</button>
        <span>{quantity}</span>
        <button onClick={onIncrease}>+</button>
      </p>
    </li>
    </>
  )
}

export default CartItem
