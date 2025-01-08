import React from 'react'

const CartItems = ({}) => {
  return (
    <div>
       {
            cartCtxt.items.map(item =>{
                <p>{item.name} - {currencyFormatter.format(item.price)}</p>
            })
        }
    </div>
  )
}

export default CartItems
