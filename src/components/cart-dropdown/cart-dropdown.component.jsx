import Button from '../button/button.component';

import './cart-dropdown.style.scss'

const CartDropdown = () => {
  return (
    <div className="cart-dropdown-container">
      <div className="cart-items" />
      <Button children='GO TO CHECKOUT'/>
    </div>
  );
}

export default CartDropdown;