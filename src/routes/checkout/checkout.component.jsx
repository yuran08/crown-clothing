import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

import { CheckoutContainer, CheckoutHeader, HeaderBlock, Total } from './checkout.style';

import CheckoutItem from '../../components/checkout-item/checkout-item.component';

const Checkout = () => {
  const { cartItems, totalPrice } = useContext(CartContext);

  return (
    <CheckoutContainer>
      <CheckoutHeader>
        <HeaderBlock>
          <span>Product</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Description</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Quantity</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Price</span>
        </HeaderBlock>
        <HeaderBlock>
          <span >Remove</span>
        </HeaderBlock>
      </CheckoutHeader>
      {cartItems.map((cartItem) => (
        <CheckoutItem key={cartItem.id} cartItem={cartItem} />
      ))}
      <Total>{ totalPrice ? `Total: ${totalPrice}` : ''}</Total>
    </CheckoutContainer>
  );
}

export default Checkout;