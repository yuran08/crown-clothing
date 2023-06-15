import { createContext, useState } from "react";

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
});

export const CartProvider = ({children}) => {
  const [ isCartOpen, setIsCartOpen ] = useState(false);
  const [ cartItems, setCartItems ] = useState([])
  const value = { isCartOpen, setIsCartOpen};

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  )
}

