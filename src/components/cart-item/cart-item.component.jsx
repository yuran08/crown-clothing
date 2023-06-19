import { CartItemContainer, ItemDetails} from './cart-item.style';

const CartItem = ({cartItem}) => {
  const { imageUrl, price, name, quantity } = cartItem;
  return (
    <CartItemContainer>
      <img src={imageUrl} alt="Product photo" />
      <ItemDetails>
        <span>{name}</span>
        <span>{quantity} x ${price}</span>

      </ItemDetails>
    </CartItemContainer>
  )
}

export default CartItem;