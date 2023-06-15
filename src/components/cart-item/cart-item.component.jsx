import './cart-item.style.scss';

const CartItem = ({cartItem}) => {
  const { name } = cartItem;
  return (
    <div className="">
      <h2>{name}</h2>
      
    </div>
  )
}

export default CartItem;