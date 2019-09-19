import React, { useContext, useState } from "react";
import { CartContext } from "../contexts/CartContext";

// Components
import Item from "./ShoppingCartItem";

const ShoppingCart = () => {
  const { cart, setCart } = useContext(CartContext);
  let [refresh, setRefresh] = useState(0);

  const getCartTotal = () => {
    return cart
      .reduce((acc, value) => {
        return acc + value.price;
      }, 0)
      .toFixed(2);
  };

  function removeItem(itemId) {
    let itemToRemove = 0;

    for (let i = 0; i < cart.length; i++) {
      if (itemId === cart[i].id) {
        itemToRemove = cart.indexOf(cart[i]);
      }
    }
    cart.splice(itemToRemove, 1);
    let newCart = cart;
    setCart(newCart);
    setRefresh((refresh += 1));
  }

  return (
    <div className="shopping-cart">
      {cart.map(item => (
        <Item key={item.id} {...item} removeItem={removeItem} />
      ))}

      <div className="shopping-cart__checkout">
        <p>Total: ${getCartTotal()}</p>
        <button>Checkout</button>
      </div>
    </div>
  );
};

export default ShoppingCart;
