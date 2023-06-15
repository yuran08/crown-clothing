import { createContext, useState, useEffect } from "react";

const addProductToCardItems = (cartItems, product) => {
  const existingCartItem = cartItems.find((cartItem) => cartItem.id === product.id);

  if (existingCartItem) {
    return cartItems.map(
      (cartItem) => cartItem.id === product.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    )
  }

  return [...cartItems, { ...product, quantity: 1 }];
}

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartItemCount: 0,
});

export const CartProvider = ({children}) => {
  const [ isCartOpen, setIsCartOpen ] = useState(false);
  const [ cartItems, setCartItems ] = useState([]);
  const [ cartItemCount, setCartItemCount ] = useState(0);

  useEffect(() => {
    const newCount = cartItems.reduce((acc, cur) => acc += cur.quantity ,0)
    setCartItemCount(newCount);
  },[cartItems])

  const addItemToCart = (product) => setCartItems(addProductToCardItems(cartItems, product));

  const value = { isCartOpen, setIsCartOpen, cartItems, addItemToCart, cartItemCount };

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  )
}

