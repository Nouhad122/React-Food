import React, { useContext } from 'react';
import { currencyFormatter } from '../util/formatter';
import Button from './Button';
import CartContext from '../store/CartContext';

const MealItem = ({ meal }) => {
  const cartCtxt = useContext(CartContext);

  const addMealItem = () =>{
    cartCtxt.addItem(meal);
  }
  return (
    <li className='meal-item'>
        <article>
            <img src={`http://localhost:3000/${meal.image}`}/>
            <div>
                <h3>{meal.name}</h3>
                <p className='meal-item-price'>{currencyFormatter.format(meal.price)}</p>
                <p className='meal-item-description'>{meal.description}</p>
            </div>
            <p className='meal-item-actions'>
              <Button onClick={addMealItem}>Add To Cart</Button>
            </p>
        </article>
    </li>
  )
}

export default MealItem
