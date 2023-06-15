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
};

const removeProductFromCardItems = (cartItems, product) => {
  // reduce quantity, and remove quantity === 0
  return cartItems.map((cartItem) => cartItem.id === product.id
    ? { ...cartItem, quantity: cartItem.quantity - 1 }
    : cartItem
    ).filter((cartItem) => cartItem.quantity !== 0);
};

const clearCartItem = (cartItems, product) => {
  return cartItems.filter((cartItem) => cartItem.id !== product.id);
}

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  cartItemCount: 0,
  totalPrice: 0,
});

export const CartProvider = ({children}) => {
  const [ isCartOpen, setIsCartOpen ] = useState(false);
  const [ cartItems, setCartItems ] = useState([]);
  const [ cartItemCount, setCartItemCount ] = useState(0);
  const [ totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const newCount = cartItems.reduce((count, curCartItem) => count += curCartItem.quantity ,0)
    setCartItemCount(newCount);
  },[cartItems])
  
  useEffect(() => {
    const newTotal = cartItems.reduce((total, curCartItem) => total += curCartItem.price * curCartItem.quantity ,0);
    setTotalPrice(newTotal);
  },[cartItems])

  const addItemToCart = (productToAdd) => setCartItems(addProductToCardItems(cartItems, productToAdd));
  const removeItemFromCart = (productToRemove) => setCartItems(removeProductFromCardItems(cartItems, productToRemove));
  const clearItemFromCart = (productToClear) => setCartItems(clearCartItem(cartItems, productToClear));

  const value = { isCartOpen, setIsCartOpen, cartItems, addItemToCart, removeItemFromCart, clearItemFromCart, cartItemCount, totalPrice };

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  )
}

