import { createContext, useReducer } from "react";

import { createAction } from "../utils/reducer/reducer.utils";

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

const CART_ACTION_TYPES = {
  SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
  SET_CART_ITEMS: 'SET_CART_ITEMS',
  SET_CART_COUNT: 'SET_CART_COUNT',
  SET_CART_TOTAL: 'SET_CART_TOTAL',
};

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartItemCount: 0,
  totalPrice: 0,
};

const cartReducer = (state, action) => {
  const { type , payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload,
      };
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload,
      };
    default:
      throw new Error(`Unhandled type ${type} in cartReducer`);
  }
}

export const CartProvider = ({children}) => {
  // const [ isCartOpen, setIsCartOpen ] = useState(false);
  // const [ cartItems, setCartItems ] = useState([]);
  // const [ cartItemCount, setCartItemCount ] = useState(0);
  // const [ totalPrice, setTotalPrice] = useState(0);

  const [{ cartItemCount, totalPrice, cartItems, isCartOpen}, dispatch ]  = useReducer(cartReducer, INITIAL_STATE);

  // useEffect(() => {
  //   const newCount = cartItems.reduce((count, curCartItem) => count + curCartItem.quantity ,0)
  //   setCartItemCount(newCount);
  // },[cartItems])
  
  // useEffect(() => {
  //   const newTotal = cartItems.reduce((total, curCartItem) => total + curCartItem.price * curCartItem.quantity ,0);
  //   setTotalPrice(newTotal);
  // },[cartItems])

  const updateCartItemsReducer = (cartItems) => {
    const newCount = cartItems.reduce((count, curCartItem) => count + curCartItem.quantity ,0)
    const newTotal = cartItems.reduce((total, curCartItem) => total + curCartItem.price * curCartItem.quantity ,0);

    const payload = {
      cartItems,
      cartItemCount: newCount,
      totalPrice: newTotal,
    }

    dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS, payload));
  };

  const addItemToCart = (productToAdd) => {
    const newCartItems = (addProductToCardItems(cartItems, productToAdd));
    updateCartItemsReducer(newCartItems);
  };
  const removeItemFromCart = (productToRemove) => {
    const newCartItems = (removeProductFromCardItems(cartItems, productToRemove));
    updateCartItemsReducer(newCartItems);
  };
  const clearItemFromCart = (productToClear) => {
    const newCartItems = (clearCartItem(cartItems, productToClear));
    updateCartItemsReducer(newCartItems);
  };
  const setIsCartOpen = (bool) => {
    

    dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool))
  }

  const value = { isCartOpen, setIsCartOpen, cartItems, addItemToCart, removeItemFromCart, clearItemFromCart, cartItemCount, totalPrice };

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  )
}

