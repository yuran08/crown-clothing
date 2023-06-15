import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';

import './cart-dropdown.style.scss'

const CartDropdown = () => {
  return (
    <div className="cart-dropdown-container">
      <div className="cart-items" >
        {
          [].map(({cartItem}) => (
            <CartItem cartItem={cartItem} />
          ))
        }
      </div>
      <Button children='GO TO CHECKOUT'/>
    </div>
  );
}

export default CartDropdown;